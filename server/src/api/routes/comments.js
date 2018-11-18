const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const CommentDao = require("../dao/commentDao");

var pool = mysql.createPool({
    connectionLimit: 2,
    host: "mysql.stud.iie.ntnu.no",
    user: "simenten",
    password: "TOFcRtVk",
    database: "simenten",
    debug: false
});

let commentDao = new CommentDao(pool);

router.get('/:article_fk', (req,res)=> {
    commentDao.getOneByArticle(req.params.article_fk, (status,data) => {
        res.status(status).json(data);
    });
});

router.post('/', (req,res) => {
    commentDao.createOne(req.body, (status,data) => {
        res.status(status);
        res.json(data);
    });
});

router.delete('/:article_fk', (req,res) => {
    commentDao.deleteOne(req.params.article_fk, (status,data) => {
        res.status(status).json(data);
    });
});

module.exports = router;