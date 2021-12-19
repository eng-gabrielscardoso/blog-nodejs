require('dotenv').config();
const express = require('express');
const router = express.Router();

router.get('/categorias', (req, res, next) => {
  res.send('Rota de categorias');
});

module.exports = router;
