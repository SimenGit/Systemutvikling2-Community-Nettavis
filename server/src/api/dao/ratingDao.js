const Dao = require("./dao.js");

module.exports = class RatingDao extends Dao {

    getOne(article_fk, callback) {
        super.query("select * from rating where article_fk = ?",
            [article_fk],
            callback
        );
    }

    getLikes(article_fk, callback) {
        super.query("select count(*) from rating where rating = 1 and article_fk = ?",
            [article_fk],
            callback
        );
    }

    getDislikes(article_fk, callback) {
        super.query("select count(*) from rating where rating = 0 and article_fk = ?",
            [article_fk],
            callback
        );
    }

    createOne(json, callback) {
        const val = [
            json.rating,
            json.article_fk,
            json.user_fk
        ];
        super.query("insert into rating(rating, article_fk, user_fk) values (?,?,?)",
            val,
            callback
        );
    }








};