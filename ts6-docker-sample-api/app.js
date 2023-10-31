const express = require('express');
const mysql = require('mysql2/promise');
const { MongoClient } = require('mongodb');

const app = express();
app.use(express.json());

// MySQL connection setup
let mysqlConnection;
async function connectMySQL() {
  mysqlConnection = await mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'testDB'
  });
}
connectMySQL();

// MongoDB connection setup
let mongodbConnection;
async function connectMongoDB() {
  const client = new MongoClient('mongodb://root:password@localhost:27017');
  await client.connect();
  mongodbConnection = client.db('testDB');
}
connectMongoDB();

app.post('/api/data', async (req, res) => {
  const data = req.body;

  // Insert data into MySQL
  const [mysqlResult] = await mysqlConnection.execute(
    'INSERT INTO sampleTable (name, value) VALUES (?, ?)',
    [data.name, data.value]
  );

  // Insert data into MongoDB
  const collection = mongodbConnection.collection('sampleCollection');
  const mongoResult = await collection.insertOne(data);

  res.json({
    mysqlResult: mysqlResult.insertId,
    mongoResult: mongoResult.insertedId
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
