const path = require('path');
const express = require('express');

module.exports = async function(options) {
  const app = express();
  app.use(require('cors')());
  app.use(require('body-parser').json());
  app.use('/', express.static(path.join(__dirname, '..', '..', 'public')));

  await app.listen(options.webPort);
}
