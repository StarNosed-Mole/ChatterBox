const bcrypt = require('bcrypt');
const db = require('../models/models.js');

const userController = {};
const saltRounds = 10;

// Use bcrypt to generate an ecrypted version of the user password
userController.hashPassword = (req, res, next) => {
  const { password } = req.body;
  // Attempt to generate the encrypted password
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      // If an error occurs, call the global error handler
      const errorMsg = 'ERROR: Failed to encrypt user password';
      return next(errorMsg);
    }
    // If successful, pass the encrypted password on to the next middleware function
    res.locals.hash = hash;
    return next();
  });
};

// Create a new user in the database with the username and encrypted password
userController.createUser = (req, res, next) => {
  const { hash } = res.locals;
  const { username } = req.body;
  // Attempt to create the new user in the database
  db.query('INSERT INTO users(user_name, hashed_pass) VALUES ($1, $2) RETURNING id;', [username, hash])
    .then((data) => {
      // Send the username back to the client in the response
      res.locals.username = username;
      res.locals.userID = data.rows[0].id;
      res.locals.isLoggedIn = true;
      return next();
    })
    .catch((err) => {
      const errorMsg = 'ERROR: Unable to create user';
      return next(errorMsg);
    });
};

// Obtain username and password from the request body, locate the appropriate user in the database
// and then authenticate the submitted password against the password stored in the database.
userController.verifyUser = (req, res, next) => {
  const USERNAME = req.body.username;
  const PASSWORD = req.body.password;
  // Find the stored encrypted password for the user
  db.query('SELECT hashed_pass FROM users WHERE user_name = $1', [USERNAME])
    .then((data) => {
      const HASHED_PASSWORD = data.rows[0];
      // Compare the stored password with the provided password
      bcrypt.compare(PASSWORD, HASHED_PASSWORD).then((result) => {
        if (!result) {
          // If the password was incorrect, pass on to the global error handler
          const errorMsg = 'ERROR: Password is incorrect';
          return next(errorMsg);
        }
      }).catch((err) => {
        const errorMsg = 'ERROR: Failure comparing hashed password';
        return next(errorMsg);
      });
      res.locals.username = USERNAME;
      res.locals.isLoggedIn = true;
      return next();
    })
    .catch((err) => {
      // If the username was incorrect, pass on to the global error handler
      const errorMsg = 'ERROR: User doesn\'t exist in the database';
      return next(errorMsg);
    });
};

module.exports = userController;
