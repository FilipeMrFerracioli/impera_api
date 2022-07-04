const { json, urlencoded } = require('express');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(
  json({
    limit: '5mb',
  }),
  urlencoded({ extended: false })
);

app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, x-access-token'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  next();
});

app.get('/teste', (req, res) => {
  // eslint-disable-next-line global-require
  const { version } = require('../package.json');

  res.send({
    API: {
      status: 'working',
      version,
    },
  });
});

const port = process.env.PORT || process.env.LOCAL_PORT;
app.listen(port, err => {
  if (err) return console.log(err);
  console.log(`App listening on port ${port}`);
});
