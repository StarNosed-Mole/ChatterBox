const sessionController = {};
const db = require('../models/models.js');

// Find the appropriate session for this request in the database,
// Then verify whether or not the session is still valid.
sessionController.isLoggedIn = (req, res, next) => {
  const SSID_COOKIE = req.cookies.ssid;
  // If the request did not contain a secure session id cookie, then the user is not logged in
  if (!SSID_COOKIE) {
    res.locals.isLoggedIn = false;
    res.locals.username = '';
    return next();
  }
  // Get the username associated with the session ID
  db.query('SELECT users.user_name FROM users INNER JOIN sessions ON sessions.user_id = users.id WHERE sessions.ssid = $1;', [SSID_COOKIE]).then((data) => {
    res.locals.isLoggedIn = true;
    res.locals.username = data.rows[0].user_name;
    return next();
  }).catch((err) => {
    // Pass any errors along to the global error handler
    const errorMsg = 'ERROR: Session ID not found in session database';
    return next(errorMsg);
  });
};

// Store the SSID in the sessions database
sessionController.createSession = (req, res, next) => {
  const { userID } = res.locals;
  res.locals.ssid = userID;
  const { ssid } = res.locals;
  res.cookie('ssid', userID, { httpOnly: true });
  // Attempt to store the session in the database
  db.query('INSERT INTO sessions (ssid, user_id) VALUES ($1, $2)', [ssid, userID])
    .then(() => next())
    .catch((err) => {
      // Pass any errors along to the global error handler
      const errorMsg = 'ERROR: Failed to store new session in database';
      return next(errorMsg);
    });
};

module.exports = sessionController;
