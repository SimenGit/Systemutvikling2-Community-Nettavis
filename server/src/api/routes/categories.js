// @flow

const express = require('express');
const router = express.Router();
var mysql = require('mysql');
const CategoriesDao = require('../dao/categoriesDao');

var pool = mysql.createPool({
  connectionLimit: 2,
  host: 'mysql.stud.iie.ntnu.no',
  user: 'simenten',
  password: 'TOFcRtVk',
  database: 'simenten',
  debug: false
});

let categoriesDao = new CategoriesDao(pool);

router.get('/', (req, res) => {
  categoriesDao.getAll((status, data) => {
    res.status(status).json(data);
  });
});

module.exports = router;
