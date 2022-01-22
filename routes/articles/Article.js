require('dotenv').config();
const connection = require('../../private/database/connection');
const Sequelize = require('sequelize');
const Category = require('../categories/Category');

const Article = connection.define('articles', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

Category.hasMany(Article);
Article.belongsTo(Category);
Article.sync({ force: false });

module.exports = Article;
