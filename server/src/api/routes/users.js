const express = require('express');
const router = express.Router();
var mysql = require("mysql");
const UserDao = require("../dao/userDao");

var pool = mysql.createPool({
    connectionLimit: 2,
    host: "mysql.stud.iie.ntnu.no",
    user: "simenten",
    password: "TOFcRtVk",
    database: "simenten",
    debug: false
});

let userDao = new UserDao(pool);

router.get('/', (req,res)=> {
    userDao.getAll((status, data) => {
        res.status(status).json(data);
    });
});

router.get('/id/:id', (req,res) => {
    userDao.getOneById(req.params.id, (status,data) => {
        res.status(status).json(data);
    });
});

router.get('/:email', (req,res) => {
    userDao.getOneByEmail(req.params.email, (status,data) => {
        res.status(status).json(data);
    });
});

router.post('/', (req,res) => {
    userDao.createOne(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});




/*
router.get('/', (req, res, next) => {
    console.log("Fikk request fra klient");
    pool.getConnection((err, connection) => {
        console.log("Connected to database");
        if (err) {
            console.log("Feil ved kobling til databasen");
            res.json({ error: "feil ved ved oppkobling" });
        } else {
            connection.query(
                "select id, name, age, email, password from users",
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


router.get("/id/:personId", (req, res) => {
    console.log("Fikk request fra klient");
    pool.getConnection((err, connection) => {
        console.log("Connected to database");
        if (err) {
            console.log("Feil ved kobling til databasen");
            res.json({ error: "feil ved ved oppkobling" });
        } else {
            connection.query(
                "select id, name, age, email, password from users where id=?",
                [req.params.personId],
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




//henter user ved email
router.get("/:email", (req, res) => {
    console.log("Fikk email request fra klienten");
    pool.getConnection((err, connection) => {
        console.log("Connected to database");
        if (err) {
            console.log("Feil ved kobling til databasen");
            res.json({ error: "feil ved ved oppkobling" });
        } else {
            connection.query(
                "select id, name, age, email, password from users where email=?",
                [req.params.email],
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


//insert til person.
router.post("/", (req, res) => {
    console.log("Fikk POST-request fra klienten");
    console.log("Navn: " + req.body.name);
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Feil ved oppkobling");
            res.json({ error: "feil ved oppkobling" });
        } else {
            console.log("Fikk databasekobling");
            const users = {
                name: req.body.name,
                age: req.body.age,
                email: req.body.email,
                password: req.body.password
            };
            connection.query(
                "insert into users (name,age,email,password) values (" + "'" + users.name + "', " + users.age + ", '" + users.email + "', '" + users.password + "')",
                //person,
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
*/

module.exports = router;