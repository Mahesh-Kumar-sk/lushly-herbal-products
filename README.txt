Lushly — Simple Single Page Store (HTML) — Package
=================================================

What you have
- index.html — single-page store (2 products)
- styles.css — styles for a rich but simple UI
- app.js — client cart and checkout code (sends orders to server)
- admin.html — simple password-protected admin page (not linked from the main site)
- server/server.js — minimal Express backend that saves orders to server/data/orders.json
- package.json — to run the server
- assets/ — product images and logo
- server/data/orders.json — stores orders

How to run (VS Code)
1. Unzip this project and open the folder in VS Code.
2. Create server/.env if you want to change admin password (optional):
   ADMIN_PASSWORD=yourpassword
   PORT=3000
3. Open integrated terminal and run:
   npm install
   npm start
4. Open the site in your browser:
   http://localhost:3000/index.html

Admin panel (view orders)
- Open http://localhost:3000/admin.html
- Enter admin password (default: admin123) and click Load orders
- You can Export CSV of orders from the admin page

Notes
- This is intentionally simple. Orders are stored in a JSON file (server/data/orders.json).
- For UPI payments, replace PAYEE_UPI_ID_HERE in app.js with your UPI ID; the UPI flow opens the mobile UPI app and is not automatically verified here.
- If you want me to host this or add email receipts, tell me and I will implement it.