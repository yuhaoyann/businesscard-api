const res = require("express/lib/response");

const router = require("express").Router();

const { validateToken } = require("./helpers");

module.exports = (db) => {
  // Get all cards

  router.get("/cards", (req, res) => {
    const queryString = `SELECT * FROM cards`;
    db.query(queryString)
      .then(({ rows: cards }) => res.json(cards))
      .catch((error) => console.log(error));
  });

  // create a card

  router.post("/cards", validateToken, (req, res) => {
    user = res.user;
    const { photo, email, phone, facebook, github, linkedin, instagram, bio } =
      req.body;
    const queryString = `INSERT INTO cards (photo, email, phone, facebook, github, linkedin, instagram, bio, user_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) returning *`;
    const queryparams = [
      photo,
      email,
      phone,
      facebook,
      github,
      linkedin,
      instagram,
      bio,
      user.id
    ];
    return db
      .query(queryString, queryparams)
      .then((result) =>
        // return result.rows[0];
        res.status(200).send("Card successefully created")
      )
      .catch((error) => console.log(error));
  });

  // update a card

 
  router.put("/cards/:cardId", validateToken, (req, res) => {
    const user = req.user
    const { photo, email, phone, facebook, github, linkedin, instagram, bio } =
      req.body;
    const { cardId } = req.params;
    const queryString = `update cards SET (photo,email,phone,facebook,github,linkedin,instagram,bio) = $1,$2,$3,$4,$5,$6,$7,$8  WHERE card_id = $9 AND user_id = $10`;
    const queryparams = [
      photo,
      email,
      phone,
      facebook,
      github,
      linkedin,
      instagram,
      bio,
      cardId,
      user.id
    ];
    return db
      .query(queryString, queryparams)
      .then((result) => result.rows[0])
      .catch((error) => console.log(error));
  });

  // delete a card

  router.delete("/cards/:cardId", validateToken, (req, res) => {
    const user  = req.user
    const queryString = `DELETE FROM cards WHERE card_id = $1 AND user_id = $2 returning *`;
    const queryparams = [req.params.id, user.id];
    db.query(queryString, queryparams)
      .then(() => res.rows[0])
      .catch((error) => console.log(error));
  });

  // show cards owned by a user

  // router.get('/mycards/:id', validateToken, (req, response) => {
  router.get("/mycards", validateToken, (req, res) => {
    const user = req.user;
    // const queryparams = [req.params.id];
    const queryparams = [user.id];
     const queryString = `SELECT * FROM users JOIN user_cards ON users.id = user_cards.user_id JOIN cards ON cards.id = card_id WHERE user_cards.user_id = $1 AND isSelfCard = true;`;
    
    db.query(queryString, queryparams)
      .then(({ rows: cards }) => res.json(cards))
      .catch((error) => console.log(error));
  });
  // show cards not owned by a user

  router.get("/savedcards", validateToken, (req, res) => {
    const user = req.user;
    const queryparams = [user.id];
    const queryString = `SELECT * FROM users JOIN user_cards ON users.id = user_cards.user_id JOIN cards ON cards.id = card_id WHERE user_cards.user_id = $1 AND isSelfCard = false;`;
    db.query(queryString, queryparams)
      .then(({ rows: cards }) => res.json(cards))
      .catch((error) => console.log(error));
  });

  return router;
};
