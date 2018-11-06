const express = require("express");
const router = express.Router();
var mysql = require("mysql");

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
        "select id, header, description, content, date_made, img, importance from article",
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

// get metode for å få artikkel med overskrift som nøkkel
router.get("/:header", (req, res) => {
  console.log("Fikk GET-request fra klient");
  pool.getConnection((err, connection) => {
    console.log("Connected to database");
    if (err) {
      console.log("Feil ved kobling til databasen");
      res.json({ error: "feil ved ved oppkobling" });
    } else {
      connection.query(
        "select id, header, description, content, date_made, img, importance from article where header=?",
        [req.params.articleOverskrift],
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

router.post("/", (req, res) => {
  console.log("Fikk POST-request fra klienten");
  pool.getConnection((err, connection) => {
    if (err) {
      console.log("Feil ved oppkobling");
      res.json({ error: "feil ved oppkobling" });
    } else {
      console.log("Fikk databasekobling");
      const article = {
        header: req.body.header,
        description: req.body.description,
        content: req.body.content,
        date_made: req.body.date_made,
        img: req.body.img,
        importance: req.body.importance,
        catagory_fk: req.body.catagory_fk,
        user_fk: req.body.user_fk
      };
      connection.query(
        "insert into article (header, description, content, date_made, img, importance, catagory_fk, user_fk) values (" +
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
          article.catagory_fk +
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
