require('dotenv').config({ silent: true });

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const basicAuth = require('basic-auth');

const env = process.env.NODE_ENV || 'development';
const envPath = path.join(__dirname, 'environments', env);
const rootPath = path.join(process.cwd());

const app = express();

function auth(username, password) {
  return function authMiddleware(req, res, next) {
    const user = basicAuth(req);
    if (!user || user.name !== username || user.pass !== password) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      return res.sendStatus(401);
    }
    return next();
  };
}

if (process.env.NODE_ENV === 'production') {
  app.use(auth(process.env.USERNAME, process.env.PASSWORD));
}

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// Serving assets from public folder
app.use(express.static(path.join(rootPath, 'public')));

// Load environment config
require(envPath)(app);

module.exports = app;
