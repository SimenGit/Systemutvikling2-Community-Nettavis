// @flow

const Dao = require('./dao.js');

module.exports = class RatingDao extends Dao {
  getOne(article_fk: number, callback) {
    super.query('select * from rating where article_fk = ?', [article_fk], callback);
  }

  getLikes(article_fk: number, callback) {
    super.query('select count(*) AS likes from rating where rating = 1 and article_fk = ?', [article_fk], callback);
  }

  getDislikes(article_fk: number, callback) {
    super.query('select count(*) AS dislikes from rating where rating = 0 and article_fk = ?', [article_fk], callback);
  }

  createOne(json, callback) {
    const val = [json.rating, json.article_fk, json.user_fk];
    super.query('insert into rating(rating, article_fk, user_fk) values (?,?,?)', val, callback);
  }

  checkUser(json, callback) {
    const val = [json.user_fk, json.article_fk];
    super.query('select * from rating where user_fk = ? and article_fk = ?', val, callback);
  }

  deleteOne(article_fk: number, callback) {
    super.query('delete from rating where article_fk = ?', [article_fk], callback);
  }

  updateOne(json, callback) {
    const val = [json.rating];
    super.query('update rating set rating = ?', val, callback);
  }
};
