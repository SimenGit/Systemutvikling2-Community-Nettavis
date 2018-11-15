const Dao = require("./dao.js");

module.exports = class CommentDao extends Dao {

    getOneByArticle(article_fk, callback) {
        super.query("select * from comments where article_fk = ?",
            [article_fk],
            callback
        );
    }

    createOne(json, callback) {
        const val = [
            json.comment,
            json.user_fk_comment,
            json.article_fk
        ];
        super.query("insert into comments (comment,user_fk_comment,article_fk) values (?,?,?)",
            val,
            callback
        );
    }

};