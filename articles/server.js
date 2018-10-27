var express = require("express");
var app = express();
app.get("/hello", (req, res) => {
    res.send("Hello World");
});
var server = app.listen(7000);

app.get("/hello2", (req, res) => {
    res.json({ message: "Hallo du!" });
});
