require('dotenv').config();
const express = require('express');
const slugify = require('slugify');
const router = express.Router();

const CategoryModel = require('./Category');

router.get('/admin/categorias', (req, res, next) => {
  CategoryModel.findAll().then(categories => {
    res.render('admin/categories/index', {
      categories: categories
    });
  });
});

router.get('/admin/categorias/novo', (req, res, next) => {
  res.render('admin/categories/new');
});

router.get('/admin/categorias/editar/:categoryId', (req, res, next) => {
  let categoryId = req.params.categoryId;

  if(isNaN(categoryId)) {
    res.redirect('/admin/categorias');
  } else {
    CategoryModel.findByPk(categoryId).then(category => {
      try {
        res.render('admin/categories/edit', {
          category: category
        });
      } catch (e) {
        console.log(`An error occurred during load edition view of a category. Log: ${e}`);
        res.redirect('/admin/categorias');
      };
    })
      .catch(e => {
        console.log(`An error occurred during load edition view of a category. Log: ${e}`);
        res.redirect('/admin/categorias');
      });
  }
});

router.post('/admin/categorias/salvar', (req, res, next) => {
  let newCategory = req.body.categoryNameRegister;

  if (!newCategory || newCategory == undefined) {
    res.redirect('/admin/categorias/novo');
  } else {
    CategoryModel.create({
      title: newCategory,
      slug: slugify(newCategory)
    }).then(_ => res.redirect('/admin/categorias'))
      .catch(e => {
        console.log(`An error occurred during register a new category. Log: ${e}`);
        res.redirect('/admin/categorias/novo');
      });
  };
});

router.post('/admin/categorias/deletar', (req, res, next) => {
  let categoryId = req.body.categoryId;

  if (categoryId != undefined) {
    if (!isNaN(categoryId)) {
      CategoryModel.destroy({
        where: {
          id: categoryId
        }
      }).then(_ => {
        res.redirect('/admin/categorias');
      })
        .catch(e => {
          console.log(`An error occurred during delete a category. Log: ${e}`);
          res.redirect('/admin/categorias');
        });
    } else {
      res.redirect('/admin/categorias');
    };
  } else {
    res.redirect('/admin/categorias');
  };
});

router.post('/admin/categorias/atualizar', (req, res, next) => {
  let categoryId = req.body.categoryId;
  let categoryUpdatedName = req.body.categoryUpdatedName;

  CategoryModel.update({ 
    title: categoryUpdatedName,
    slug: slugify(categoryUpdatedName)
   },{
    where: {
      id: categoryId
    }
  }).then(_ => res.redirect('/admin/categorias'))
    .catch(e => {
      console.log(`An error occurred during update a category. Log: ${e}`);
      res.redirect('/admin/categorias');
    });
});

module.exports = router;
