// src/app.js - Asosiy Express ilovasi
const express = require('express');
const app = express();
app.use(express.json());

// Sog'liqni tekshirish endpoint'i
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    version: process.env.APP_VERSION || '1.0.0'
  });
});

// Kalkulyator endpoint'lari
app.post('/calculate/add', (req, res) => {
  const { a, b } = req.body;
  if (typeof a !== 'number' || typeof b !== 'number') {
    return res.status(400).json({ error: 'a va b raqam bo\'lishi kerak' });
  }
  res.json({ result: a + b, operation: 'add' });
});

app.post('/calculate/multiply', (req, res) => {
  const { a, b } = req.body;
  if (typeof a !== 'number' || typeof b !== 'number') {
    return res.status(400).json({ error: 'a va b raqam bo\'lishi kerak' });
  }
  res.json({ result: a * b, operation: 'multiply' });
});

// Faqat test bo'lmagan muhitda serverni ishga tushirish
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server ${PORT} portda ishlamoqda`);
  });
}

module.exports = app; // Test uchun eksport
