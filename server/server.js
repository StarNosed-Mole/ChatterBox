const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Controller imports
const userController = require('./controllers/userController');
const sessionController = require('./controllers/sessionController');
const webSockets = require('./routers/websockets');

const app = express();
// Allow body parsing
app.use(cookieParser());

app.use(express.json());

// Automatically parse urlencoded body content from incoming requests and place it in req.body
app.use(bodyParser.urlencoded({ extended: true }));

// Create a websocket server on port 4040
webSockets.createServer(4040);

// Serve the homepage when receiving a get request for '/'
// TO DO: Get all channels from the database and call createWebsocketServer for each one
app.get('/', (req, res) => res.status(200).sendFile(path.resolve(__dirname, '../client/index.html')));

// check if the user is logged in, and if so, send the username back to the client
app.get('/api/isloggedin', sessionController.isLoggedIn, (req, res) => {
  const { isLoggedIn, username } = res.locals;
  res.status(200).send({ isLoggedIn, username });
});

// ! TO DO - check response format!!!!!
app.post('/api/signup', userController.hashPassword, userController.createUser, sessionController.createSession, (req, res) => {
  const { username, isLoggedIn } = res.locals;
  res.status(200).send({ isLoggedIn, username });
});

// Handle attempts to login by the client
app.post('/api/login', userController.verifyUser, sessionController.createSession, (req, res) => {
  const { isLoggedIn, username } = res.locals;
  res.status(200).send({ isLoggedIn, username });
});

// 404 handler for unknown routes
app.use('*', (req, res) => {
  // Re-route to index.html to avoid resetting the React app
  res.status(404).sendFile(path.resolve(__dirname, '../client/index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
  const isLoggedIn = false;
  const username = '';
  const errorMsg = err;
  console.log(errorMsg);
  res.status(500).send({ isLoggedIn, username, errorMsg });
});

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});
