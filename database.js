const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    "postgres://lpsibgqv:w6iHc94AolqhTnHw0TBGKRkI9y04M3la@satao.db.elephantsql.com/lpsibgqv",
});

pool
  .connect()
  .then(() => {
    console.log("✅ Successfully connect to PostgreSQL");
  })
  .catch((err) => {
    console.log("Connect to PostgreSQL failed: ", err);
  });

// Code của doc
// pool.query("SELECT NOW()", (err, res) => {
//   console.log(err, res);
//   pool.end();
// });

// custome cái hàm thực thi query để khỏi viết lại nhìu lần
exports.executeQuery = function (sqlQuery) {
  return new Promise((resolve) => {
    pool.query(sqlQuery, (err, res) => {
      if (!err) {
        console.log("Query successfully executed");
        resolve();
      } else {
        console.log(err);
      }
      // else reject(err);
    });
  });
};

// custome cái hàm lấy kết quả query để khỏi viết lại nhìu lần
exports.getMany = function (sqlQuery) {
  return new Promise((resolve) => {
    pool.query(sqlQuery, (err, res) => {
      //   res.rows kết quả từ DB, đọc doc pg
      if (!err) resolve(res.rows);
      else {
        console.log(err);
      }
      // else reject(err);
    });
  });
};

exports.getOne = function (sqlQuery) {
  return new Promise((resolve, reject) => {
    pool.query(sqlQuery, (err, res) => {
      if (!err) resolve(res.rows[0]);
      else {
        console.log(err);
      }
      // else reject(err);
    });
  });
};
