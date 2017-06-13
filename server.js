/* eslint no-console: 0 */

require('dotenv').config({ silent: true });

const port = process.env.NODE_PORT || 3000;
const app = require('./config/application');

/**
 * Initializing server
 */
app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on http://0.0.0.0:%s/', port);
});
