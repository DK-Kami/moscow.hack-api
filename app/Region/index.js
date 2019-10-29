const router = require('express').Router();
const http = require('http');

router.get('/', (req, res) => {
  var request = http.get('http://admin:vbyjvtn@tseluyko.ru:5984/mim/_design/daclarator/_view/by_regions?inclusive_end=true&include_docs=false&reduce=true&group=true', response => {
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

router.get('/:region', (req, res) => {
  const { region } = req.params;

  var request = http.get(`http://admin:vbyjvtn@tseluyko.ru:5984/mim/_design/daclarator/_view/by_regions?inclusive_end=true&start_key=["${region}"]&end_key=["${region}",{}]&reduce=false`, response => {
    var body = ""
    response.on('data', function(data) {
      body += data;
    });
    response.on('end', async () => {
      const regions = JSON.parse(body).rows;

      const incomes = await Promise.all(regions
        .filter(r => r.key[1] === 'incomes')
        .sort((x, y) => x.value < y.value ? 1 : -1)
        .splice(0, 50)
        .map(async value => {
          const deputat = await getCurrentDeputat(value.id);
          const { name, gender } = deputat.main.person;
          const office = deputat.main.office.name;
          return {
            gender,
            office,
            name,
            ...value
          }
        }));

      const real_estates = await Promise.all(regions
        .filter(r => r.key[1] === 'real_estates')
        .sort((x, y) => x.value < y.value ? 1 : -1)
        .splice(0, 50)
        .map(async value => {
          const deputat = await getCurrentDeputat(value.id);
          const { name, gender } = deputat.main.person;
          const office = deputat.main.office.name;
          return {
            gender,
            office,
            name,
            ...value
          }
        })
      );

      const vehicles = await Promise.all(regions
        .filter(r => r.key[1] === 'vehicles')
        .sort((x, y) => x.value < y.value ? 1 : -1)
        .splice(0, 50)
        .map(async value => {
          const deputat = await getCurrentDeputat(value.id);
          const { name, gender } = deputat.main.person;
          const office = deputat.main.office.name;
          return {
            gender,
            office,
            name,
            ...value
          }
        })
      );

      console.log(incomes);
      res.send({
        incomes,
        real_estates,
        vehicles,
      });
    });
  });
  request.on('error', function(e) {
    console.log('Problem with request: ' + e.message);
  });
  request.end();
});

function getCurrentDeputat(id) {
  return new Promise(res => {
    var request = http.get(`http://admin:vbyjvtn@tseluyko.ru:5984/mim/` + id, response => {
      var body = ""
      response.on('data', function(data) {
        body += data;
      });
      response.on('end', function() {
        res(JSON.parse(body));
      });
    });
    request.on('error', function(e) {
      console.log('Problem with request: ' + e.message);
    });
    request.end();
  })
}

module.exports = router;
