const { DataTypes, Model } = require('sequelize');

// Assuming you have a Sequelize instance set up and exported from another file
const sequelize = require('../config/database');

class SampleTable extends Model {}

SampleTable.init({
  name: DataTypes.STRING,
  value: DataTypes.STRING,
}, { sequelize, modelName: 'sampleTable' });

module.exports = SampleTable;
