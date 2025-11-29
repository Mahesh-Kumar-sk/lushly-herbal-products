const CART = [];
function qs(s){ return document.querySelector(s) }
function qsa(s){ return Array.from(document.querySelectorAll(s)) }

function updateCartUI(){
  const items = qs('#cartItems');
  if (!CART.length){ items.innerHTML = 'Cart is empty'; qs('#cartTotal').textContent=''; qs('#checkoutBtn').disabled=true; return; }
  items.innerHTML = '';
  let total = 0;
  CART.forEach((it, idx)=>{
    const div = document.createElement('div');
    div.className='cart-line';
    div.innerHTML = `<strong>${it.title}</strong> x ${it.qty} — ₹${it.price*it.qty} <button data-idx="${idx}" class="btn remove">Remove</button>`;
    items.appendChild(div);
    total += it.price*it.qty;
  });
  qs('#cartTotal').textContent = 'Total: ₹' + total;
  qs('#checkoutBtn').disabled = false;
  // MINI CART UPDATE
qs('#cartMiniCount').textContent = CART.length + " items";

}

document.addEventListener('click', (e)=>{
  if (e.target.matches('.add')){
    const card = e.target.closest('.product');
    const sku = card.dataset.sku;
    const price = Number(card.dataset.price);
    const title = card.querySelector('h3').textContent;
    const qty = Number(card.querySelector('.qty').value) || 1;
    const existing = CART.find(i=>i.sku===sku);
    if (existing) existing.qty += qty; else CART.push({ sku, price, title, qty });
    updateCartUI();
  }
  if (e.target.matches('.remove')){
    const idx = Number(e.target.dataset.idx);
    CART.splice(idx,1);
    updateCartUI();
  }
});

qs('#checkoutBtn').addEventListener('click', ()=>{
  qs('#checkout').classList.remove('hidden');
  window.scrollTo({top:document.body.scrollHeight,behavior:'smooth'});
});
qs('#cartMiniBtn').addEventListener('click', () => {
  qs('#checkoutBtn').click();   // This triggers your main checkout button
});

qs('#cancelCheckout').addEventListener('click', ()=>{
  qs('#checkout').classList.add('hidden');
});

qs('#checkoutForm').addEventListener('submit', async (ev)=>{
  ev.preventDefault();
  if (!CART.length) return alert('Cart empty');
  const form = new FormData(ev.target);
  const shipping = {
    name: form.get('name'),
    phone: form.get('phone'),
    address: form.get('address'),
    city: form.get('city'),
    pin: form.get('pin')
  };
  const payment_method = form.get('payment');
  const total = CART.reduce((s,i)=>s+i.qty*i.price,0);
  const order = { items: CART, shipping, payment_method, total };
  // if UPI selected, attempt to open UPI app (mobile) - placeholder
  if (payment_method === 'upi'){
    const UPI_ID = 'PAYEE_UPI_ID_HERE'; // replace with your UPI ID
    const upiLink = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent('Lushly')}&am=${encodeURIComponent(total)}&cu=INR`;
    window.location.href = upiLink;
    alert('If you completed UPI payment, return and click Place order again to submit the order record.');
  }
  try{
    const res = await fetch('/create-order', {
      method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(order)
    });
    const j = await res.json();
    if (j.success){
      qs('#orderResult').textContent = 'Order placed. Order id: ' + j.orderId + '. We will contact you.';
      CART.length = 0; updateCartUI();
      qs('#checkout').classList.add('hidden');
    } else {
      qs('#orderResult').textContent = 'Failed to place order.';
    }
  } catch(err){
    qs('#orderResult').textContent = 'Server error: could not place order.';
  }
});

document.querySelectorAll(".ba-slider").forEach((slider, index) => {
  slider.addEventListener("input", () => {
    const beforeImg = slider.parentElement.querySelector(".ba-before");
    beforeImg.style.width = slider.value + "%";
  });
});

document.querySelectorAll(".toggle-btn").forEach(btn => {
  btn.addEventListener("click", function(){

    const card = btn.closest(".toggle-ba-card");
    const beforeImg = card.querySelector(".ba-before");
    const afterImg  = card.querySelector(".ba-after");

    // Remove active from both buttons
    card.querySelectorAll(".toggle-btn").forEach(b => b.classList.remove("active"));

    // Highlight clicked button
    btn.classList.add("active");

    // Toggle visibility
    if(btn.dataset.target === "before"){
      beforeImg.classList.add("toggle-visible");
      afterImg.classList.remove("toggle-visible");
    } else {
      afterImg.classList.add("toggle-visible");
      beforeImg.classList.remove("toggle-visible");
    }

  });
});
// Toggle the "Real Customer Transformations" section
function toggleTransform() {
  const content = document.getElementById('transformContent');

  // If open → close
  if (content.style.maxHeight && content.style.maxHeight !== "0px") {
    content.style.maxHeight = "0px";
  }
  // If closed → expand
  else {
    content.style.maxHeight = content.scrollHeight + "px";
  }
}


// Handle BEFORE button click
function showBefore(id) {
  const beforeEl = document.getElementById(`${id}-before`);
  const afterEl  = document.getElementById(`${id}-after`);
  const beforeBtn = document.getElementById(`${id}-before-btn`);
  const afterBtn  = document.getElementById(`${id}-after-btn`);

  if (beforeEl && afterEl) {
    beforeEl.classList.add("active");
    afterEl.classList.remove("active");
  }
  if (beforeBtn && afterBtn) {
    beforeBtn.classList.add("active");
    afterBtn.classList.remove("active");
  }
}


// Handle AFTER button click
function showAfter(id) {
  const beforeEl = document.getElementById(`${id}-before`);
  const afterEl  = document.getElementById(`${id}-after`);
  const beforeBtn = document.getElementById(`${id}-before-btn`);
  const afterBtn  = document.getElementById(`${id}-after-btn`);

  if (beforeEl && afterEl) {
    afterEl.classList.add("active");
    beforeEl.classList.remove("active");
  }
  if (beforeBtn && afterBtn) {
    afterBtn.classList.add("active");
    beforeBtn.classList.remove("active");
  }
}
