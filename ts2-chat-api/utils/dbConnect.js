const mongoose = require('mongoose');

class DbConnection {
  constructor() {
    // uncomment the two lines below to use docker and provide appr. env variables
    // this.host = process.env.DB_HOST;
    // this.port = process.env.DB_PORT;

    this.name = process.env.DB_NAME;
    this.user = process.env.DB_USER;
    this.pass = process.env.DB_PASS;
  }
  
  connect() {
    return mongoose.connect(
      // uncomment the line below to use docker
      // `mongodb://${this.user}:${this.pass}@${this.host}:${this.port}/${this.name}`,

      // comment out the entire line below if you want to connect with docker
      `mongodb+srv://${this.user}:${this.pass}@cluster0.ijtgnu3.mongodb.net/${this.name}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        authSource: `${this.user}` // specify the database to authenticate against
      }
    )
  }
}

const dbConnection = new DbConnection();
module.exports = dbConnection;