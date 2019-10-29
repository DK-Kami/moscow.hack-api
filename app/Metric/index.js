const router = require('express').Router();
const http = require('http');

router.get('/money_by_year', (req, res) => {
  const { inclusive_end, start_key, end_key } = req.query;

  var request = http.get(`http://admin:vbyjvtn@tseluyko.ru:5984/mim/_design/daclarator/_view/by_income?inclusive_end=${inclusive_end}&start_key=${start_key}&end_key=${end_key}&reduce=false`, response => {
    var body = ""
    response.on('data', function(data) {
      body += data;
    });
    response.on('end', function() {
      res.send(JSON.parse(body));
    });
  });
  request.on('error', function(e) {
    console.log('Problem with request: ' + e.message);
  });
  request.end();
});

router.get('/cars', (req, res) => {
  var request = http.get('http://admin:vbyjvtn@tseluyko.ru:5984/mim/_design/daclarator/_view/by_possessions?keys=%5B%22vehicles%22%5D', response => {
    var body = ""
    response.on('data', function(data) {
      body += data;
    });
    response.on('end', function() {
      res.send(JSON.parse(body));
    });
  });
  request.on('error', function(e) {
    console.log('Problem with request: ' + e.message);
  });
  request.end();
});

router.get('/possessions', (req, res) => {
  var request = http.get('http://admin:vbyjvtn@tseluyko.ru:5984/mim/_design/daclarator/_view/by_possessions?keys=["real_estates"]', response => {
    var body = ""
    response.on('data', function(data) {
      body += data;
    });
    response.on('end', function() {
      res.send(JSON.parse(body));
    });
  });
  request.on('error', function(e) {
    console.log('Problem with request: ' + e.message);
  });
  request.end();
});

module.exports = router;