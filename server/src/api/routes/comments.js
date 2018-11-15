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

//henter kommentar ved artikkel_id fremmednøkkel
router.get("/:id", (req, res) => {
    console.log("Fikk GET-request fra klient");
    pool.getConnection((err, connection) => {
        console.log("Connected to database");
        if (err) {
            console.log("Feil ved kobling til databasen");
            res.json({ error: "feil ved ved oppkobling" });
        } else {
            connection.query(
                "select comment, user_fk_comment, article_fk from comments where article_fk=?",
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

router.post("/", (req, res) => {
    console.log("Fikk POST-request fra klienten");
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Feil ved oppkobling");
            res.json({ error: "feil ved oppkobling" });
        } else {
            console.log("Fikk databasekobling");
            const comment = {
                comment: req.body.comment,
                user_fk_comment: req.body.user_fk_comment,
                article_fk: req.body.article_fk,
            };
            connection.query(
                "insert into comments (comment,user_fk_comment,article_fk) values (" + "'" + comment.comment + "', " + comment.user_fk_comment + ", " + comment.article_fk + ")",
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

module.exports = router;