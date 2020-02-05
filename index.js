const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db');
const Project = require('./models/project')(db);
const Task = require('./models/task')(db);

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

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

app.post('/projects', (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(422).send("Name can't be blank");
    return;
  }

  Project.create(name)
    .then(project => {
      res.redirect(`/projects/${project.id}`);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.get('/projects/new', (req, res) => {
  res.render('projects/new');
});

app.get('/projects/:id', (req, res) => {
  const { id } = req.params;
  Project.find(id)
    .then(project => {
      Task.forProjectId(id)
        .then(tasks => {
          res.render('projects/show', { project, tasks });
        })
        .catch(err => {
          console.log(err);
          res.status(500).send(err);
        });
    })
    .catch(err => {
      console.log(err);
      res.status(404).send(`Project with id ${id} not found.`);
    });
});

app.get('/projects/:id/edit', (req, res) => {
  const { id } = req.params;

  Project.find(id)
    .then(project => {
      res.render('projects/edit', { project });
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.post('/projects/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    res.status(422).send("Name can't be blank");
    return;
  }

  Project.update(id, name)
    .then(() => {
      res.redirect(`/projects/${id}`);
    })
    .catch(err => {
      res.status(500).send(err);
    });

});

app.listen(8080, () => {
  console.log('App is listening on http://localhost:8080');
});

