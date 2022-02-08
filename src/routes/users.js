const router = require('express').Router();

module.exports = (db) => {
  router.get('/users', (req, res) => {
    db.query(`SELECT * FROM users`)
      .then(({ rows: users }) => {
        response.json(users);
      })
      .catch((error) => console.log(error));
  });

  router.post("/register", (req, res) => {
    const { email, password } = req.body;
    if (email === "" || password === "") {
      return res.status(400).send("Enter all fields");
    }
  
    if (getUserByEmail(email, users)) {
      return res.status(400).send("Email already exists");
    }
    const newUser = createNewUser(email,password);
    users[newUser.id] = newUser;
    req.session['user_id'] = newUser.id;
    res.redirect("/urls");
  });
  


  // router.get('/users', (request, response) => {
  //   db.query(`SELECT * FROM users`)
  //     .then(({ rows: users }) => {
  //       response.json(users);
  //     })
  //     .catch((error) => console.log(error));
  // });







  return router;
};


