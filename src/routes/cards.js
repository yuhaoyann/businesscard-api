const res = require('express/lib/response');

const router = require('express').Router();

module.exports = (db) => {
  // Get all cards

  router.get('/cards', (request, response) => {
    const queryString = `SELECT * FROM cards`;
    db.query(queryString)
      .then(({ rows: cards }) => response.json(cards))
      .catch((error) => console.log(error));
  });

  // create a card

  router.post('/cards', (request, response) => {
    const { photo, email, phone, facebook, github, linkedin, instagram, bio } =
      request.body;
    const queryString = `INSERT INTO cards (photo,email,phone,facebook,github,linkedin,instagram,bio) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) returning *`;
    const queryparams = [
      photo,
      email,
      phone,
      facebook,
      github,
      linkedin,
      instagram,
      bio,
    ];
    return db
      .query(queryString, queryparams)
      .then((result) =>
        // return result.rows[0];
        response.status(200).send('Card successefully created')
      )
      .catch((error) => console.log(error));
  });

  // update a card

  router.put('/cards/:id', (request, response) => {
    const { photo, email, phone, facebook, github, linkedin, instagram, bio } =
      request.body;
    const { id } = request.params;
    const queryString = `update cards SET (photo,email,phone,facebook,github,linkedin,instagram,bio) = $1,$2,$3,$4,$5,$6,$7,$8  WHERE card_id = $9`;
    const queryparams = [
      photo,
      email,
      phone,
      facebook,
      github,
      linkedin,
      instagram,
      bio,
      id,
    ];
    return db
      .query(queryString, queryparams)
      .then((result) => result.rows[0])
      .catch((error) => console.log(error));
  });

  // delete a card

  router.delete('/cards/:id', (request, response) => {
    const queryString = `DELETE FROM cards WHERE card_id = $1 returning *`;
    const queryparams = [request.params.id];
    db.query(queryString, queryparams)
      .then(() => response.rows[0])
      .catch((error) => console.log(error));
  });

  // show cards owned by a user

  router.get('/mycards/:id', (request, response) => {
    const queryparams = [request.params.id];
    const queryString = `SELECT * FROM users JOIN user_cards ON users.id = user_id JOIN cards ON cards.id = card_id WHERE user_id = $1 AND isSelfCard = true;`;
    db.query(queryString, queryparams)
      .then(({ rows: cards }) => response.json(cards))
      .catch((error) => console.log(error));
  });
  // show cards not owned by a user

  router.get('/savedcards/:id', (request, response) => {
    const queryparams = [request.params.id];
    const queryString = `SELECT * FROM users JOIN user_cards ON users.id = user_id JOIN cards ON cards.id = card_id WHERE user_id = $1 AND isSelfCard = false;`;
    db.query(queryString, queryparams)
      .then(({ rows: cards }) => response.json(cards))
      .catch((error) => console.log(error));
  });

  return router;
};
