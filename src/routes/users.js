const router = require("express").Router();
const { getUserByEmail, authenticateUser } = require("./helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const hashedPassword = bcrypt.hashSync("123456", 10);
// console.log(hashedPassword)
console.log("+++++++++++", process.env.JWT_SECRET);
module.exports = (db) => {
  router.get("/", (req, res) => {
    res.status(200).send({
      status: "ok",
      message: "Welcome to ApI developed for digital business card",
      about: "Business card app",
      team: ["Fatuma", "Hayoan", "Stephen"],
      today: new Date(),
    });
  });

  router.get("/users", (req, res) => {
    db.query(`SELECT * FROM users`)
      .then(({ rows: users }) => {
        res.json(users);
      })
      .catch((error) => console.log(error));
  });

  router.post("/register", (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .send({ status: "error", message: "Enter all fields" });
    }

    console.log("++++++", req.body);

    db.query(`SELECT * FROM users WHERE email = $1`, [email]).then((result) => {
      // response.json(users);

      // if (getUserByEmail(email, users)) {
      //   return res.status(400).send("Email already exists");
      //   // console.log("++",users)
      // }
      if (result.rows.length > 0) {
        return res.status(400).send("Email already exists");
      }

      const hashedPassword = bcrypt.hashSync(password, 10);
      console.log(hashedPassword);
      const queryString = `INSERT INTO users (first_name, last_name, email, password) VALUES ($1,$2,$3,$4) returning *`;
      const queryparams = [first_name, last_name, email, hashedPassword];
      return db
        .query(queryString, queryparams)
        .then((result) => {
          // return result.rows[0];
          const user = result.rows[0];
          delete user.password;
          console.log("userrrrr", user);
          const token = jwt.sign(user, process.env.JWT_SECRET, {
            expiresIn: "500h",
          });
          console.log("***********jwt", token);
          // res.status(200).send("User successefully created")
          res.status(200).send({
            status: "ok",
            message: "User successefully created",
            user,
            token,
          });
        })
        .catch((error) => console.log(error));
    });
  });

  router.post("/login", (req, res) => {
    const { email, password } = req.body;
    db.query(`SELECT * FROM users WHERE email = $1`, [email]).then((result) => {
      // response.json(users);

      // if (getUserByEmail(email, users)) {
      //   return res.status(400).send("Email already exists");
      //   // console.log("++",users)
      // }
      if (result.rows.length != 1) {
        return res.status(400).send("User not found");
      }
      // response.json(users);
      
      if (bcrypt.compareSync(password, result.rows[0].password)) {
        console.log("passss",result.rows[0].password)
        res.status(200).send("Successful login")
      }
    
    return null;
      
    });
  });

  router.get("/profile", (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    // console.log("token++++++", token);

    console.log("\n authHeader+++", authHeader);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded); // bar
    res.send({ token, decoded });
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("");
  });
  return router;
};
