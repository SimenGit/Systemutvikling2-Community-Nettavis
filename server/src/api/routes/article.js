const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const multer = require("multer");
const ArticleDao = require("../dao/articleDao");


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../client/public/images/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({storage: storage});

var pool = mysql.createPool({
  connectionLimit: 2,
  host: "mysql.stud.iie.ntnu.no",
  user: "simenten",
  password: "TOFcRtVk",
  database: "simenten",
  debug: false
});


let articleDao = new ArticleDao(pool);

router.get('/',(req,res)=> {
    articleDao.getAll((status, data) => {
        res.status(status).json(data);
    });
});

router.get('/header/:header', (req,res) => {
    articleDao.getByHeader(req.params.header, (status,data) => {
        res.status(status).json(data);
    });
});

router.get("/id/:id",(req,res)=> {
    articleDao.getOne(req.params.id,(status, data) => {
        res.status(status).json(data);
    });
});

router.get("/important",(req, res) => {
    articleDao.getImportant((status, data) => {
        res.status(status).json(data);
    });
});

router.get("/newsfeed", (req, res) => {
    articleDao.getNewsFeed((status, data) => {
        res.status(status).json(data);
    });
});

router.delete("/:header", (req, res) => {
    articleDao.deleteOne(req.params.header, (status, data) => {
        res.status(status).json(data);
    });
});

router.post("/", upload.single('file'), (req, res) => {
    articleDao.createOne(req.body, req.file, (status, data) => {
      res.status(status);
      res.json(data);
    });
});

router.patch("/:header", (req,res) => {
    let header = req.params.header;
    articleDao.patchOne(header, req.body, (status, data) => {
        res.status(status).json(data);
    });
});


module.exports = router;
