'use strict';

let db = require('./models/database');
let events = require('../python/campus_events.json');
let tools = require('./tools');

//Used to start python script for web scraping
const spawn = require('child_process').spawn;

//Configure express
let express = require('express');
let app = express();
app.use(express.static(__dirname + '/public'));

//Configure handlebars
let exphbs = require('express-handlebars');
let hbs = exphbs.create({
    defaultLayout: 'main',
    layoutsDir: 'views/layouts',
    partialsDir: [
        'views/partials/'
    ]
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//Setup routes
app.get('/', (req, res) => {
    res.render('home', {
    'cards': tools.getTestData(),
    });
});

//Runs the python scraper for campus events and updates the database records
app.get('/scrapers/events', (req, res) => {
    tools.fetchCampusEvents(spawn, (data) => {
      db.persistEvents();
      res.json(data);
    });
});

//Runs the daily herd scraper and updates the database records
app.get('/scrapers/dailyherd', (req, res) => {
    tools.fetchDailyHerd((data) => {
      db.persistDailyHerd(() => {
        res.end(data);
      });
    });
});

//API endpoint for a JSON response of campus events
app.get('/api/events', (req, res) => {
    db.getEvents((data) => {
      res.json(data);
    });
});

//API endpoint for a JSON response of Daily Herd articles
app.get('/api/dailyherd', (req, res) => {
  db.getDailyHerd((data) => {
    res.json(data);
  });
});

//Start server
app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on port 3000...');
});
