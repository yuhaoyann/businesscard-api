const router = require('express').Router();

const { validateToken } = require('./helpers');

module.exports = (db) => {
  // Get all cards

  router.get('/cards', (req, res) => {
    const queryString = `SELECT * FROM cards`;
    db.query(queryString)
      .then(({ rows: cards }) => res.json(cards))
      .catch((error) => console.log(error));
  });

  // Get specific card

  router.get('/cards/:cardId', (req, res) => {
    const queryString = `
    SELECT *
    FROM cards
    WHERE cards.id = $1
    `;
    const queryparams = [req.params.cardId];
    db.query(queryString, queryparams)
      .then(({ rows: cards }) => {
        console.log(cards);
        res.json(cards);
      })
      .catch((error) => console.log(error));
  });

  // create a card

  router.post('/cards', validateToken, (req, res) => {
    const { user } = req;
    const {
      fullname,
      email,
      photo,
      title,
      company,
      phone,
      github,
      linkedin,
      facebook,
      instagram,
      bio,
    } = req.body.card;
    const queryString = `
    INSERT INTO 
    cards (
      user_id,
      fullname,
      email,
      photo,
      title,
      company,
      phone,
      github,
      linkedin,
      facebook,
      instagram,
      bio)
      VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      returning *;`;
    const queryparams = [
      user.id,
      fullname,
      email,
      photo,
      title,
      company,
      phone,
      github,
      linkedin,
      facebook,
      instagram,
      bio,
    ];
    return db
      .query(queryString, queryparams)
      .then((result) => {
        const queryString1 = `
          INSERT INTO
          user_cards (user_id, card_id, isSelfCard)
          VALUES ($1, $2, $3)
          returning *;
          `;
        const queryparams1 = [user.id, result.rows[0].id, true];
        db.query(queryString1, queryparams1).then((r) => {
          res.send({
            id: result.rows[0].id,
            message: `Card ID ${result.rows[0].id} successfully created`,
          });
        });
      })
      .catch((error) => console.log(error));
  });

  // update a card

  router.put('/cards/:cardId', validateToken, (req, res) => {
    const { user } = req;
    const {
      fullname,
      email,
      photo,
      title,
      company,
      phone,
      github,
      linkedin,
      facebook,
      instagram,
      bio,
    } = req.body.card;
    const queryString = `
    UPDATE
    cards SET (
      fullname,
      email,
      photo,
      title,
      company,
      phone,
      github,
      linkedin,
      facebook,
      instagram,
      bio)
      =
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      WHERE id = $12
      AND user_id = $13
      returning *;`;
    const queryparams = [
      fullname,
      email,
      photo,
      title,
      company,
      phone,
      github,
      linkedin,
      facebook,
      instagram,
      bio,
      req.params.cardId,
      user.id,
    ];
    return db
      .query(queryString, queryparams)
      .then((result) => {
        res.send({
          id: result.rows[0].id,
          message: `Card ID ${result.rows[0].id} successfully edited`,
        });
      })
      .catch((error) => console.log(error));
  });

  // delete a card

  router.delete('/cards/:cardId', validateToken, (req, res) => {
    const { user } = req;
    const queryString = `
    DELETE FROM cards
    WHERE id = $1
    AND user_id = $2
    returning *;
    `;
    const queryparams = [req.params.cardId, user.id];
    db.query(queryString, queryparams)
      .then((r) => {
        res.send(`Card ID ${req.params.cardId} successfully deleted`);
      })
      .catch((error) => console.log(error));
  });

  // show cards owned by a user

  // router.get('/mycards/:id', validateToken, (req, response) => {
  router.get('/mycards', validateToken, (req, res) => {
    const { user } = req;
    // const queryparams = [req.params.id];
    const queryparams = [user.id];
    const queryString = `
    SELECT *
    FROM user_cards
    JOIN cards ON cards.id = card_id
    WHERE user_cards.user_id = $1
    AND isSelfCard = true;
    `;
    db.query(queryString, queryparams)
      .then(({ rows: cards }) => res.json(cards))
      .catch((error) => console.log(error));
  });
  // show cards not owned by a user

  router.get('/savedcards', validateToken, (req, res) => {
    const { user } = req;
    const queryparams = [user.id];
    const queryString = `
    SELECT *
    FROM user_cards
    JOIN cards ON cards.id = card_id
    WHERE user_cards.user_id = $1
    AND isSelfCard = false;
    `;
    db.query(queryString, queryparams)
      .then(({ rows: cards }) => res.json(cards))
      .catch((error) => console.log(error));
  });

  return router;
};
