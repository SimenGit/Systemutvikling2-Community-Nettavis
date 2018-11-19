// @flow

const express = require('express');
const router = express.Router();
var mysql = require('mysql');
const UserDao = require('../dao/userDao');

var pool = mysql.createPool({
  connectionLimit: 2,
  host: 'mysql.stud.iie.ntnu.no',
  user: 'simenten',
  password: 'TOFcRtVk',
  database: 'simenten',
  debug: false
});

let userDao = new UserDao(pool);

router.get('/', (req, res) => {
  userDao.getAll((status, data) => {
    res.status(status).json(data);
  });
});

router.get('/id/:id', (req, res) => {
  userDao.getOneById(req.params.id, (status, data) => {
    res.status(status).json(data);
  });
});

router.get('/:email', (req, res) => {
  userDao.getOneByEmail(req.params.email, (status, data) => {
    res.status(status).json(data);
  });
});

router.post('/', (req, res) => {
  userDao.createOne(req.body, (status, data) => {
    res.status(status);
    res.json(data);
  });
});

module.exports = router;
