const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initial Menu Data (Indian Currency & Items)
let menuData = [
  { id: 1, name: "Hot Masala Tea", category: "Beverages", price: 15.00, isAvailable: true, prepTime: "3 mins", image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80" },
  { id: 2, name: "South Indian Filter Coffee", category: "Beverages", price: 20.00, isAvailable: true, prepTime: "3 mins", image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=400&q=80" },
  { id: 3, name: "Indori Poha", category: "Snacks", price: 25.00, isAvailable: true, prepTime: "5 mins", image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=400&q=80" },
  { id: 4, name: "Vegetable Upma", category: "Snacks", price: 30.00, isAvailable: true, prepTime: "6 mins", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=400&q=80" },
  { id: 5, name: "Crispy Vegetable Samosa", category: "Snacks", price: 15.00, isAvailable: true, prepTime: "4 mins", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80" },
  { id: 6, name: "Paneer Butter Masala Bowl", category: "Meals", price: 120.00, isAvailable: true, prepTime: "12 mins", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=400&q=80" }
]
  app.get('/api/menu', (req, res) => {
    res.json(menuData);
});;

let orders = [
  {
    id: "101",
    studentName: "Aarav Sharma",
    items: [{ id: 1, name: "Hot Masala Tea", quantity: 2, price: 15.00 }],
    total: 30.00,
    status: "PREPARING", 
    slot: "1:00 PM - 1:15 PM",
    time: "12:42 PM"
  }
];

// API Endpoints
app.get('/api/menu', (req, res) => {
  res.json({ success: true, data: menuData });
});

app.get('/api/orders', (req, res) => {
  res.json({ success: true, data: orders });
});

app.post('/api/orders', (req, res) => {
  const { studentName, items, total, slot } = req.body;
  const newOrder = {
    id: Math.floor(100 + Math.random() * 900).toString(),
    studentName: studentName || "Student User",
    items,
    total,
    status: "PENDING",
    slot,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
  orders.unshift(newOrder);
  res.status(201).json({ success: true, order: newOrder });
});

app.patch('/api/orders/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = orders.find(o => o.id === id);
  if (order) {
    order.status = status;
    return res.json({ success: true, order });
  }
  res.status(404).json({ success: false, message: "Order not found" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
