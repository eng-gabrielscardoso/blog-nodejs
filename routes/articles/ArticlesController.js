require('dotenv').config();
const express = require('express');
const router = express.Router();

router.get('/admin/artigos/novo', (req, res, next) => {
  res.render('admin/articles/new')
});

module.exports = router;
