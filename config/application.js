require('dotenv').config({ silent: true });

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const env = process.env.NODE_ENV || 'development';
const envPath = path.join(__dirname, 'environments', env);
const rootPath = path.join(process.cwd());

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// Serving assets from public folder
app.use(express.static(path.join(rootPath, 'public')));

// Security
if (env === 'production') {
  app.use(helmet({ noSniff: false }));
  app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", 'https://naturebasedsolutions.org', 'nature-of-risk-reduction.vizzuality.com'],
      styleSrc: ["'self'", "'unsafe-inline'", 'fonts.googleapis.com', 'data:'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'data:', 'https://maps.googleapis.com'],
      imgSrc: ["'self'", 'data:', 'https://csi.gstatic.com', 'https://maps.googleapis.com', 'https://maps.gstatic.com', 'https://api.mapbox.com', 'https://s3.amazonaws.com']
    },
    browserSniff: false
  }));
}

// Load environment config
require(envPath)(app);

module.exports = app;
