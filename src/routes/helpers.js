

//checks for a user in users database with the  provided email and if found returns the user

const getUserByEmail = function(email,users) {
  for (const user in users) {
    if (users[user].email === email) {
      return users[user];
    }
  }
  return null;
};


// authenticates and returns a valid  user

const authenticateUser = function(email,password,users) {
  const user = getUserByEmail(email,users);
  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      return user;
    }
  }
  return null;
};
module.exports =  { getUserByEmail,  authenticateUser };