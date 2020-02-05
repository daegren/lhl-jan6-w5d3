const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db');
const Project = require('./models/project')(db);

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.redirect('/projects');
});

app.get('/projects', (req, res) => {
  Project.all()
    .then(projects => {
      res.render('projects/index', { projects });
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.listen(8080, () => {
  console.log('App is listening on http://localhost:8080');
});

