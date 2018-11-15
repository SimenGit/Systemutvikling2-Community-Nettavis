const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const multer = require("multer");

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

router.get("/", (req, res, next) => {
  console.log("Fikk request fra klient");
  pool.getConnection((err, connection) => {
    console.log("Connected to database");
    if (err) {
      console.log("Feil ved kobling til databasen");
      res.json({ error: "feil ved ved oppkobling" });
    } else {
      connection.query(
        "select id, header, description, content, date_made, img, importance, category_fk, user_fk from article",
        (err, rows) => {
          connection.release();
          if (err) {
            console.log(err);
            res.json({ error: "error querying" });
          } else {
            console.log(rows);
            res.json(rows);
          }
        }
      );
    }
  });
});


router.get("/id/:id", (req, res, next) => {
    console.log("Fikk request fra klient");
    pool.getConnection((err, connection) => {
        console.log("Connected to database");
        if (err) {
            console.log("Feil ved kobling til databasen");
            res.json({ error: "feil ved ved oppkobling" });
        } else {
            connection.query(
                "select id, header, description, content, date_made, img, importance, category_fk, user_fk from article where id = ?",
                [req.params.id],
                (err, rows) => {
                    connection.release();
                    if (err) {
                        console.log(err);
                        res.json({ error: "error querying" });
                    } else {
                        console.log(rows);
                        res.json(rows);
                    }
                }
            );
        }
    });
});


router.get("/important/", (req, res, next) => {
    console.log("Fikk request fra klient");
    pool.getConnection((err, connection) => {
        console.log("Connected to database");
        if (err) {
            console.log("Feil ved kobling til databasen");
            res.json({ error: "feil ved ved oppkobling" });
        } else {
            connection.query(
                "select id, header, description, content, date_made, img, importance, category_fk, user_fk from article where importance = 1",
                (err, rows) => {
                    connection.release();
                    if (err) {
                        console.log(err);
                        res.json({ error: "error querying" });
                    } else {
                        console.log(rows);
                        res.json(rows);
                    }
                }
            );
        }
    });
});



// POST
router.post("/", upload.single('file'),(req, res) => {
    console.log(req.file);
  console.log("Fikk POST-request fra klienten");
  pool.getConnection((err, connection) => {
    if (err) {
      console.log("Feil ved oppkobling");
      res.json({ error: "feil ved oppkobling" });
    } else {
      console.log("Fikk databasekobling");

      let file = req.file.originalname;

      const article = {
        header: req.body.header,
        description: req.body.description,
        content: req.body.content,
        date_made: req.body.date_made,
        img: file,
        importance: req.body.importance,
        category_fk: req.body.category_fk,
        user_fk: req.body.user_fk
      };
      connection.query(
        "insert into article (header, description, content, date_made, img, importance, category_fk, user_fk) values (" +
          "'" +
          article.header +
          "', '" +
          article.description +
          "', '" +
          article.content +
          "', '" +
          article.date_made +
          "', '" +
          article.img +
          "', " +
          article.importance +
          ", '" +
          article.category_fk +
          "', " +
          article.user_fk +
          ")",
        err => {
          if (err) {
            console.log(err);
            res.status(500);
            res.json({ error: "Feil ved insert" });
          } else {
            console.log("insert ok");
            res.send("");
          }
        }
      );
    }
  });
});

//sletter artikler basert på overskrift.
router.delete("/:header", (req, res) => {
  console.log("Fikk DELETE-request fra klienten");
  pool.getConnection((err, connection) => {
    if (err) {
      console.log("Feil ved oppkobling");
      res.json({ error: "feil ved oppkobling" });
    } else {
      console.log("Fikk databasekobling");
      connection.query(
        "delete from article  where header = ?",
        [req.params.overskriften],
        err => {
          if (err) {
            console.log(err);
            res.status(500);
            res.json({ error: "Feil ved insert" });
          } else {
            console.log("delete ok");
            res.send("");
          }
        }
      );
    }
  });
});

module.exports = router;
