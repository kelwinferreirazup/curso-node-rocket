const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

app.set('view engine', 'njk');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('main');
});

app.post('/check', (req, res) => {
  const { name, age } = req.body;
  if (age >= 18) {
    res.redirect(`/major?name=${name}`);
  } else {
    res.redirect(`/minor?name=${name}`);
  }
});

app.get('/major', (req, res) => {
  res.render('major', { name: res.req.query.name });
});

app.get('/minor', (req, res) => {
  res.render('minor', { name: res.req.query.name });
});

app.listen(3000);
