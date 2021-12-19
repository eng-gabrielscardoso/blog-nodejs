require('dotenv').config();
const connection = require('../../private/database/connection');
const Sequelize = require('sequelize');
const Cathegory = require('../cathegories/Cathegory');

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

Cathegory.hasMany(Article);
Article.belongsTo(Cathegory);
Article.sync({ force: false });

module.exports = Article;
