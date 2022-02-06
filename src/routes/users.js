const router = require('express').Router();

module.exports = (db) => {
  router.get('/users', (request, response) => {
    db.query(`SELECT * FROM users`)
      .then(({ rows: users }) => {
        response.json(users);
      })
      .catch((error) => console.log(error));
  });

  return router;
};
