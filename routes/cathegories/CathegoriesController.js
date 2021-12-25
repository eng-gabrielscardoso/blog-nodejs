require('dotenv').config();
const express = require('express');
const router = express.Router();

router.get('/admin/categorias/novo', (req, res, next) => {
  res.render('admin/cathegories/new');
});

module.exports = router;
