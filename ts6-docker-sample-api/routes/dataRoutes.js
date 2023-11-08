const express = require('express');
const { insertData, listAllData } = require('../controllers/dataController');

const router = express.Router();

router.route('/api/data')
  .post(insertData)
  .get(listAllData);

module.exports = router;
