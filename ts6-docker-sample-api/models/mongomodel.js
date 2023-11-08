const mongoose = require('mongoose');

const sampleSchema = new mongoose.Schema({
  name: String,
  value: String,
});

const SampleCollection = mongoose.model('SampleCollection', sampleSchema);

module.exports = SampleCollection;
