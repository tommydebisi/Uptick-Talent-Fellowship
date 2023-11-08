const SampleTable = require('../models/postgresModel');
const SampleCollection = require('../models/mongomodel');

async function insertData(req, res) {
  const data = req.body;

  try {
    // Insert data into postgres
    const postgresResult = await SampleTable.create({
      name: data.name,
      value: data.value
    });
  
    // Insert data into MongoDB
    const mongoResult = await SampleCollection.create(data);
  
    res.status(201)
    .json({
      postgresResult: postgresResult.id, // Sequelize automatically returns the id
      mongoResult: mongoResult._id // Mongoose automatically returns the id
    });
  } catch (error) {
    res.status(500)
    .json({ message: 'Error creating data' });
  }
}

// endpoint to show all data
async function listAllData(req, res) {
  try {
    // Fetch all records from postgres
    const postgresData = await SampleTable.findAll();

    // Fetch all records from MongoDB
    const mongoData = await SampleCollection.find({});

    // Combine results
    const combinedData = {
      postgresData: postgresData,
      mongoData: mongoData
    };

    // Send combined data as response
    res.status(200).json(combinedData);
  } catch (error) {
    // Handle potential errors
    res.status(500).json({ message: 'Error fetching data from databases', error: error });
  }
}

module.exports = {
  insertData,
  listAllData
};
