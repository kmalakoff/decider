const path = require('path');
const express = require('express');
const app = express();
app.use(require('cors')());
app.use(require('body-parser').json());

Object.values(require('require-directory')(module, './routes')).forEach((m) => m(app));

const PORT = +process.env.PORT;
app.listen(PORT, (err) => {
  if (err) return console.error(`Server failed to start on port: ${PORT}`, err);
  console.log(`Server started on port: ${PORT}`);
});
