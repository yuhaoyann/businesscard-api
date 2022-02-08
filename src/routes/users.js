const router = require("express").Router();
const { getUserByEmail, authenticateUser } = require("./helpers");
const bcrypt = require("bcrypt");
// const hashedPassword = bcrypt.hashSync("123456", 10);
// console.log(hashedPassword)
module.exports = (db) => {
  router.get("/users", (req, res) => {
    db.query(`SELECT * FROM users`)
      .then(({ rows: users }) => {
        response.json(users);
      })
      .catch((error) => console.log(error));
  });

  router.post("/register", (req, res) => {
    const { first_name, last_name, email, password } = request.body;
    if (email === "" || password === "") {
      return res.status(400).send("Enter all fields");
    }

    db.query(`SELECT * FROM users`)
      .then(({ rows: users }) => {
        // response.json(users);
      
    if (getUserByEmail(email, users)) {
      return res.status(400).send("Email already exists");
      // console.log("++",users)
    }

    
    const hashedPassword = bcrypt.hashSync(password, 10);
    console.log(hashedPassword)
    const queryString = `INSERT INTO users (first_name,last_name,email,hashedPassword) VALUES ($1,$2,$3,$4) returning *`;
    const queryparams = [first_name, last_name, email, hashedPassword];
    return db
      .query(queryString, queryparams)
      .then((result) =>
        // return result.rows[0];
        response.status(200).send("User successefully created")
      )
      .catch((error) => console.log(error));
    })
  });

  router.post("/login", (req, res) => {
    const { email, password } = req.body;
    const user = authenticateUser(email, password, users);
    if (!user) {
      return res.status(403).send("User not found");
    }
    // req.session["user_id"] = user.id;
    // res.redirect("");
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("");
  });

  return router;
};
