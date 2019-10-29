const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const config = require('../config');
const logging = require('../logs');

const app = express();
const router = express.Router();

app.init = () => global.config = config;

// app.use(cors());
// app.options('*', cors());

// app.use(cors({credentials: true, origin: 'https://vdooh.dev:8000'}));
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://vdooh.dev:8080');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
};
app.use(allowCrossDomain);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.use(logging);
app.use(router.use('/api', require('./router')));

app.use((req, res, next) => {
  res.status(500);

  res.json({
    error: 'not found current method',
  });
});

module.exports = app;
