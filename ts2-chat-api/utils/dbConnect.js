const mongoose = require('mongoose');

class DbConnection {
  constructor() {
    this.host = process.env.DB_HOST;
    this.port = process.env.DB_PORT;
    this.name = process.env.DB_NAME;
    this.user = process.env.DB_USER;
    this.pass = process.env.DB_PASS;
  }
  
  connect() {
    console.log(this.user);
    return mongoose.connect(
      `mongodb://${this.user}:${this.pass}@${this.host}:${this.port}/${this.name}`,
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