require('dotenv').config();
const express = require('express');
const router = express.Router();

router.get('/artigos', (req, res, next) => {
  res.send('Rota de artigos');
});

module.exports = router;
