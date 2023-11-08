const { Sequelize } = require('sequelize');

const postgresURI = process.env.POSTGRESURI
// connect to mysql
const sequelize = new Sequelize(postgresURI,{
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;