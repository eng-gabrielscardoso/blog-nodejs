require('dotenv').config();
const express = require('express');
const slugify = require('slugify');
const router = express.Router();

const CathegoryModel = require('./Cathegory');

router.get('/admin/categorias', (req, res, next) => {
  CathegoryModel.findAll().then(cathegories => {
    res.render('admin/cathegories/index', {
      cathegories: cathegories
    });
  });
});

router.get('/admin/categorias/novo', (req, res, next) => {
  res.render('admin/cathegories/new');
});

router.post('/categorias/salvar', (req, res, next) => {
  let newCathegory = req.body.cathegoryNameRegister;

  if (!newCathegory || newCathegory == undefined) {
    res.redirect('/admin/categorias/novo');
  } else {
    CathegoryModel.create({
      title: newCathegory,
      slug: slugify(newCathegory)
    }).then(_ => res.redirect('/admin/categorias'))
      .catch(e => {
        console.log(`An error occurred during register a new cathegory. Log: ${e}`);
        res.redirect('/admin/categorias/novo');
      });
  };
});

router.post('/admin/categorias/deletar', (req, res, next) => {
  let cathegoryId = req.body.cathegoryId;

  if (cathegoryId != undefined) {
    if (!isNaN(cathegoryId)) {
      CathegoryModel.destroy({
        where: {
          id: cathegoryId
        }
      }).then(_ => {
        res.redirect('/admin/categorias');
      })
        .catch(e => {
          console.log(`An error occurred during delete a cathegory. Log: ${e}`);
          res.redirect('/admin/categorias');
        });
    } else {
      res.redirect('/admin/categorias');
    };
  } else {
    res.redirect('/admin/categorias');
  };
});

module.exports = router;
