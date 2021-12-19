require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

const connection = require('./private/database/connection');

const ArticleModel = require('./routes/articles/Article');
const CathegoryModel = require('./routes/cathegories/Cathegory');

connection.authenticate()
  .then(_ => console.log(`Database connection established sucessfully`))
  .catch(e => console.log(`Database connection not established. Log: ${e}`))

const articlesController = require('./routes/articles/ArticlesController');
const categoriesController = require('./routes/cathegories/CathegoriesController');

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', articlesController);
app.use('/', categoriesController);

app.get('/', (req, res, next) => {
  res.render('index');
});

app.listen(port, () => {
  try{
    console.log(`Server running: https://localhost:${port}`);
  } catch(e) {
    console.log(`An error occurred. Log: ${e}`);
  };
});
