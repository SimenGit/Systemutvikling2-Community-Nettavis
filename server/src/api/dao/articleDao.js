// @flow

const Dao = require('./dao.js');

module.exports = class ArticleDao extends Dao {
  getAll(callback) {
    super.query('select * from article', [], callback);
  }

  getOne(id: number, callback) {
    super.query('select * from article where id=?', [id], callback);
  }

  getImportant(callback) {
    super.query('select * from article where importance = 1 order by date_made desc limit 20', [], callback);
  }

  getNewsFeed(callback) {
    super.query('select * from article order by date_made desc limit 3', [], callback);
  }

  createOne(json, file, callback) {
    const val = [
      json.header,
      json.description,
      json.content,
      json.date_made,
      file.originalname,
      json.importance,
      json.category_fk,
      json.user_fk
    ];
    super.query(
      'insert into article (header, description, content, date_made, img, importance, category_fk, user_fk) values (?,?,?,?,?,?,?,?)',
      val,
      callback
    );
  }

  deleteOne(header: string, callback) {
    super.query('delete from article where header = ?', [header], callback);
  }

  getByHeader(header: string, callback) {
    super.query('select * from article where header = ?', [header], callback);
  }

  patchOne(artHeader: string, json, callback) {
    const val = [json.header, json.description, json.content, json.importance, artHeader];

    super.query(
      'update article set header = ?, description = ?, content = ?, importance = ? where header = ?',
      val,
      callback
    );
  }

  getArticleByCategory(category: string, callback) {
    super.query('select * from article where category_fk = ? order by date_made desc', [category], callback);
  }
};
