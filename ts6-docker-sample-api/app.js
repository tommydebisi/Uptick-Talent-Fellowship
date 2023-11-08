require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const sequelize = require('./config/database');
const dataRoutes = require('./routes/dataRoutes');


const app = express();
app.use(express.json());
app.use(dataRoutes);

const port = process.env.PORT || 3000;

async function startUp(){
  try{
    await mongoose.connect(process.env.MONGOURI);
    console.log("mongodb connected");

    sequelize.sync()
    .then(() => {
      console.log('postgres connected');

      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    })
    .catch((e) => {
      console.log(e);
    })
  } catch (e) {
    console.log(e);
  }
}

startUp()

module.exports = app;