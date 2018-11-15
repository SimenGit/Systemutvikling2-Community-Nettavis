const Dao = require("./dao.js");

module.exports = class CategoriesDao extends Dao {

    getAll(callback) {
        super.query("select * from categories", [], callback);
    }

};