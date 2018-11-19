const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const RatingDao = require("../dao/ratingDao");

var pool = mysql.createPool({
    connectionLimit: 2,
    host: "mysql.stud.iie.ntnu.no",
    user: "simenten",
    password: "TOFcRtVk",
    database: "simenten",
    debug: false
});

let ratingDao = new RatingDao(pool);

router.get('/:article_fk', (req,res)=> {
    ratingDao.getOne(req.params.article_fk, (status, data) => {
        res.status(status).json(data);
    });
});

router.get('/likes/:article_fk', (req,res) => {
    ratingDao.getLikes(req.params.article_fk, (status, data) => {
        res.status(status).json(data);
    });
});

router.get('/dislikes/:article_fk', (req,res) => {
    ratingDao.getDislikes(req.params.article_fk, (status, data) => {
        res.status(status).json(data);
    });
});

router.post('/', (req,res) => {
    ratingDao.createOne(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

router.get("/checkUsers/check", (req,res) => {
    ratingDao.checkUser(req.body, (status, data) => {
        res.status(status).json(data);
    });
});


module.exports = router;