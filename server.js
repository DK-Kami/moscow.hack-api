const app = require('./app');

app.init();
app.listen(config.PORT, (err) => {
  if (err) throw err;
});
