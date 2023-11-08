require('dotenv').config();
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose'); // Mongoose connection
const dataRoutes = require('../routes/dataRoutes'); // Your data routes file path
const sequelize = require('../config/database'); // Sequelize connection

// Initialize express app
const app = express();
app.use(express.json());
app.use(dataRoutes); // Use the data routes

// Mock Sequelize model
const SampleTable = require('../models/postgresModel'); // Sequelize Model for postgres
SampleTable.findAll = jest.fn();

// Mock Mongoose model
const SampleCollection = require('../models/mongomodel'); // Mongoose Model for MongoDB
SampleCollection.find = jest.fn();

beforeAll(async () => {
  // Connect to Sequelize and Mongoose if needed
  await sequelize.authenticate();
  await mongoose.connect(process.env.MONGOURI);
});

afterAll(async () => {
  // Close the Sequelize and Mongoose connections
  await sequelize.close();
  await mongoose.disconnect();
});


describe('POST /api/data', () => {
  // Mock data to be inserted
  const mockData = {
    name: 'Tom',
    value: 'Ade'
  };

  // Mock responses from Sequelize and Mongoose
  const mockSequelizeResponse = { id: 123 };
  const mockMongooseResponse = { _id: 'abc123' };

  beforeAll(() => {
    // Mock the Sequelize 'create' method
    SampleTable.create = jest.fn().mockResolvedValue(mockSequelizeResponse);
    
    // Mock the Mongoose 'create' method
    SampleCollection.create = jest.fn().mockResolvedValue(mockMongooseResponse);
  });

  it('should insert data into postgres and MongoDB', async () => {
    const response = await request(app)
      .post('/api/data')
      .send(mockData);

    expect(response.statusCode).toBe(201);
    expect(response.body.postgresResult).toEqual(mockSequelizeResponse.id);
    expect(response.body.mongoResult).toEqual(mockMongooseResponse._id.toString());
    expect(SampleTable.create).toHaveBeenCalledWith(mockData);
    expect(SampleCollection.create).toHaveBeenCalledWith(mockData);
  });

  it('should respond with an error if postgres insert fails', async () => {
    // Mock Sequelize create method to simulate an error
    SampleTable.create = jest.fn().mockRejectedValue(new Error('postgres insert failed'));

    // Mock Mongoose create method to work normally
    SampleCollection.create = jest.fn().mockResolvedValue({ _id: 'abc123' });

    const mockData = { name: 'Test', value: 'Test' };

    const response = await request(app)
      .post('/api/data')
      .send(mockData);

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ message: 'Error creating data' });
  });

  it('should respond with an error if MongoDB insert fails', async () => {
    // Mock Sequelize create method to work normally
    SampleTable.create = jest.fn().mockResolvedValue({ id: 123 });

    // Mock Mongoose create method to simulate an error
    SampleCollection.create = jest.fn().mockRejectedValue(new Error('MongoDB insert failed'));

    const mockData = { name: 'Test', value: 'Test' };

    const response = await request(app)
      .post('/api/data')
      .send(mockData);

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ message: 'Error creating data' });
  });
});

describe('GET /api/data', () => {
  it('should fetch all data from postgres and MongoDB', async () => {
    // Mock Sequelize findAll method
    SampleTable.findAll.mockResolvedValue([
      { id: 1, name: 'Test postgres Data 1', value: 'Value1' },
      { id: 2, name: 'Test postgres Data 2', value: 'Value2' }
    ]);

    // Mock Mongoose find method
    SampleCollection.find.mockResolvedValue([
      { _id: 'mongoId1', name: 'Test MongoDB Data 1', value: 'Value1' },
      { _id: 'mongoId2', name: 'Test MongoDB Data 2', value: 'Value2' }
    ]);

    const response = await request(app).get('/api/data');
    
    expect(response.statusCode).toBe(200);
    expect(response.body.postgresData).toHaveLength(2);
    expect(response.body.mongoData).toHaveLength(2);
    expect(SampleTable.findAll).toHaveBeenCalled();
    expect(SampleCollection.find).toHaveBeenCalled();
    expect(response.body.postgresData[0].name).toBe('Test postgres Data 1');
    expect(response.body.mongoData[0].name).toBe('Test MongoDB Data 1');
  });
  
  it('should respond with an error if postgres data fetch fails', async () => {
    // Mock Sequelize findAll method to simulate an error
    SampleTable.findAll = jest.fn().mockRejectedValue(new Error('postgres fetch failed'));
  
    // Mock Mongoose find method to work normally
    SampleCollection.find = jest.fn().mockResolvedValue([]);
  
    const response = await request(app).get('/api/data');
  
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ message: 'Error fetching data from databases', error: expect.any(Object) });
  });
  
  it('should respond with an error if MongoDB data fetch fails', async () => {
    // Mock Sequelize findAll method to work normally
    SampleTable.findAll = jest.fn().mockResolvedValue([]);
  
    // Mock Mongoose find method to simulate an error
    SampleCollection.find = jest.fn().mockRejectedValue(new Error('MongoDB fetch failed'));
  
    const response = await request(app).get('/api/data');
  
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ message: 'Error fetching data from databases', error: expect.any(Object) });
  });
});
