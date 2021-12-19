require('dotenv').config();
const connection = require('../../private/database/connection');
const Sequelize = require('sequelize');

const Cathegory = connection.define('cathegories', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

Cathegory.sync({ force: false });

module.exports = Cathegory;
