const jwt = require('jsonwebtoken');

const validateToken = function (req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null)
    return res.status(401).send({ status: 'error', message: 'No token' });
  // console.log('token++++++', token);
  try {
    const dataStoredInToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = dataStoredInToken;
    next();
  } catch (error) {
    console.log('\n autherrorr+++', error);
    return res
      .status(401)
      .send({ status: 'error', message: 'Invalid Session' });
  }
  // console.log("\n authHeader+++", authHeader);
};

module.exports = { validateToken };
