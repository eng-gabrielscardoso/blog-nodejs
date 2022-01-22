require('dotenv').config();
const express = require('express');
const slugify = require('slugify');
const router = express.Router();

const ArticleModel = require('../articles/Article');
const CategoryModel = require('../categories/Category');

router.get('/admin/artigos', (req, res, next) => {
  ArticleModel.findAll({
    include: [{ model: CategoryModel, }],
  }).then(articles => {
    res.render('admin/articles/index',{
      articles: articles,
    });
  });
});

router.get('/admin/artigos/novo', (req, res, next) => {
  CategoryModel.findAll()
    .then(categories => {
      res.render('admin/articles/new', { categories: categories, });
    });
});

router.post('/admin/artigos/salvar', (req, res, next) => {
  let articleTitle = req.body.articleTitleRegister;
  let articleBody = req.body.articleBodyRegister;
  let articleCategory = req.body.articleCategoryRegister;

  ArticleModel.create({
    title: articleTitle,
    slug: slugify(articleTitle),
    body: articleBody,
    categoryId: articleCategory,
  }).then(_ => res.redirect('/admin/artigos'))
});

router.post('/admin/artigos/deletar', (req, res, next) => {
  let articleId = req.body.articleId;

  if (articleId != undefined) {
    if (!isNaN(articleId)) {
      ArticleModel.destroy({
        where: {
          id: articleId
        }
      }).then(_ => {
        res.redirect('/admin/artigos');
      })
        .catch(e => {
          console.log(`An error occurred during delete a article. Log: ${e}`);
          res.redirect('/admin/artigos');
        });
    } else {
      res.redirect('/admin/artigos');
    };
  } else {
    res.redirect('/admin/artigos');
  };
});

module.exports = router;
