const express = require('express');
const bodyParser = require('body-parser');


// DATABASE SETUP
const db = require('./db');

// MODELS
const Project = require('./models/project')(db);
const Task = require('./models/task')(db);

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

// GET /
app.get('/', (req, res) => {
  res.redirect('/projects');
});

// GET /projects - List all projects
app.get('/projects', (req, res) => {
  Project.all()
    .then(projects => {
      res.render('projects/index', { projects });
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// POST /projects - Create Project
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

// GET /projects/new - Show new form
app.get('/projects/new', (req, res) => {
  res.render('projects/new');
});

// GET /projects/:id - Show individual project w/ Tasks
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

// GET /projects/:id/edit - Show edit form
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

// POST /projects/:id - Update project
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

// POST /projects/:id/delete - Delete project
app.post('/projects/:id/delete', (req, res) => {
  const { id } = req.params;

  Project.remove(id)
    .then(() => {
      res.redirect('/projects');
    })
    .catch(err => {
      res.status(500).send(err);
    });
});


// Boot server
app.listen(8080, () => {
  console.log('App is listening on http://localhost:8080');
});

