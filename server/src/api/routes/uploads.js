const express = require("express");
const router = express.Router();

router.get("/:image", (req, res, next) => {
    res.status(200).json( {
        path: req.body.image
    });
});


module.exports = router;