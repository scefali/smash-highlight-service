const express = require('express');
const bodyParser = require('body-parser');

const highlightRoutes = require('./routes/highlightRoutes');

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/highlight', highlightRoutes.router);

app.use(function(err, req, res, next) {
  console.error(err);
  res.sendStatus(500);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
