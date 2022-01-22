require('dotenv').config();
const connection = require('../../private/database/connection');
const Sequelize = require('sequelize');

const Category = connection.define('categories', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

Category.sync({ force: false });

module.exports = Category;
