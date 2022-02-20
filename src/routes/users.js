const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// const hashedPassword = bcrypt.hashSync('pass', 10);
// console.log(hashedPassword);
// console.log("+++++++++++", process.env.JWT_SECRET);
module.exports = (db) => {
  router.get('/', (req, res) => {
    res.status(200).send({
      status: 'ok',
      message: 'Welcome to API developed for digital business card',
      about:
        'Digital Business card app that allows sharing of cards between users ',
      team: ['Fatuma', 'Hayoan', 'Stéphen'],
      today: new Date(),
    });
  });

  // unsafe to display user with password
  // router.get('/users', (req, res) => {
  //   db.query(`SELECT * FROM users`)
  //     .then(({ rows: users }) => {
  //       res.json(users);
  //     })
  //     .catch((error) => console.log(error));
  // });

  router.post('/register', (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    console.log('++++', req.body);
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).send('Please fill all fields');
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    // console.log(hashedPassword);
    const queryString = `
    INSERT INTO users (
    first_name,
    last_name,
    email,
    password)
    VALUES ($1,$2,$3,$4)
    returning *;
    `;
    const queryparams = [firstName, lastName, email, hashedPassword];
    return db
      .query(queryString, queryparams)
      .then((r) => {
        const user = r.rows[0];
        delete user.password;
        console.log('userrrrr', user);
        const token = jwt.sign(user, process.env.JWT_SECRET, {
          expiresIn: '500h',
        });
        user.token = token;
        console.log('***********jwt', token);
        // res.status(200).send("User successefully created")
        res.status(200).send({
          status: 'ok',
          message: 'User successefully created',
          user,
        });
      })
      .catch((error) =>
        error.code === '23505'
          ? res.status(400).send('Email already exists')
          : res.status(400).send(error.detail)
      );
  });

  router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send('Please fill all fields');
    }

    db.query(`SELECT * FROM users WHERE email = $1`, [email]).then((result) => {
      if (result.rows.length !== 1) {
        return res.status(400).send('Invalid username/password');
      }

      console.log('sucess +))))', result.rows);

      const user = result.rows[0];
      // const hashedPassword = bcrypt.hashSync("pass", 10);

      if (!bcrypt.compareSync(password, user.password)) {
        // console.log("failer+++++", password, "----", user.password);
        return res.status(400).send('Invalid username/password');
      }

      user.token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: '500h',
      });

      delete user.password;

      return res.status(200).send({
        status: 'ok',
        message: 'Successefull Login',
        user,
      });
    });
  });

  return router;
};
