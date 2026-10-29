const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const menuItems = [
  { id: 1, name: 'Samosa', price: 15, category: 'Snacks' },
  { id: 2, name: 'Poha', price: 20, category: 'Breakfast' },
  { id: 3, name: 'Tea', price: 10, category: 'Beverages' },
  { id: 4, name: 'Vada Pav', price: 20, category: 'Snacks' },
  { id: 5, name: 'Coffee', price: 20, category: 'Beverages' },
  { id: 6, name: 'Idli Vada', price: 40, category: 'Breakfast' },
  { id: 7, name: 'Veg Sandwich', price: 35, category: 'Snacks' },
  { id: 8, name: 'Cold Drink', price: 25, category: 'Beverages' }
];

app.get('/api/menu', (req, res) => {
  res.json(menuItems);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
