// @flow

const Dao = require('./dao.js');

module.exports = class UserDao extends Dao {
  getAll(callback) {
    super.query('select * from users', [], callback);
  }

  getOneById(id: number, callback) {
    super.query('select * from users where id = ?', [id], callback);
  }

  getOneByEmail(email: string, callback) {
    super.query('select * from users where email = ?', [email], callback);
  }

  createOne(json, callback) {
    const val = [json.name, json.age, json.email, json.password];
    super.query('insert into users (name,age,email,password) values (?,?,?,?)', val, callback);
  }
};
