const PORT = +process.env.PORT;

const path = require('path');
const express = require('express');
const app = express();
app.use(require('cors')());
app.use(require('body-parser').json());

require('./routes')(app);

app.listen(PORT, (err) => {
  if (err) return console.error(`Server failed to start on port: ${PORT}`, err);
  console.log(`Server started on port: ${PORT}`);
});
