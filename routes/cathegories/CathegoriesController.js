require('dotenv').config();
const express = require('express');
const slugify = require('slugify');
const router = express.Router();

const Cathegory  = require('./Cathegory');

router.get('/admin/categorias', (req, res, next) => {
  Cathegory.findAll().then(cathegories => {
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

  if(!newCathegory || newCathegory == undefined) {
    res.redirect('/admin/categorias/novo');
  } else {
    Cathegory.create({
      title: newCathegory,
      slug: slugify(newCathegory)
    }).then(_ => res.redirect('/'))
      .catch(e => {
        console.log(`An error occurred during register a new cathegory. Log: ${e}`)
        res.redirect('/admin/categorias/novo')
      });
  }
})

module.exports = router;
