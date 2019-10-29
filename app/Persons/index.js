const router = require('express').Router();
const https = require('https');
const http = require('http');

var options = {
  host : 'declarator.org',
  path : '/api/person/',
  method : 'GET'
};

router.get('/', (req, res) => {
  var request = https.request(options, function(response){
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

router.get('/:id', (req, res) => {
  const { id } = req.params;

  var request = http.get('http:///admin:vbyjvtn@tseluyko.ru:5984/mim/' + id, function(response){
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
