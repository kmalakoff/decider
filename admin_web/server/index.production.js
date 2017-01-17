const path = require('path');
const express = require('express');

const PORT = process.env.PORT;

const app = express();

app.use('/', express.static(path.join(__dirname, '..', 'public')));

app.listen(PORT, (err) => {
  if (err) return console.error(`Server failed to start on port: ${PORT}`, err);
  console.log(`Server started on port: ${PORT}`);
});
