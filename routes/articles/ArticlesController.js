require('dotenv').config();
const express = require('express');
const router = express.Router();

const CategoryModel = require('../categories/Category');

router.get('/admin/artigos/novo', (req, res, next) => {
  CategoryModel.findAll()
    .then(categories => {
      res.render('admin/articles/new', { categories: categories, });
    });
});

module.exports = router;
