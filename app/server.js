'use strict';
const spawn = require('child_process').spawn;
let tools = require('./tools');
let events = require('../python/campus_events.json');
let db = require('./models/database');

//Configure express
let express = require('express');
let app = express();
let exphbs = require('express-handlebars');
let hbs = exphbs.create({
    defaultLayout: 'main',
    layoutsDir: 'views/layouts',
    partialsDir: [
        'views/partials/'
    ],
    helpers: {
        compare: function (lvalue, operator, rvalue, options) {

            var operators, result;

            if (arguments.length < 3) {
                throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
            }

            if (options === undefined) {
                options = rvalue;
                rvalue = operator;
                operator = "===";
            }

            operators = {
                '==': function (l, r) { return l == r; },
                '===': function (l, r) { return l === r; },
                '!=': function (l, r) { return l != r; },
                '!==': function (l, r) { return l !== r; },
                '<': function (l, r) { return l < r; },
                '>': function (l, r) { return l > r; },
                '<=': function (l, r) { return l <= r; },
                '>=': function (l, r) { return l >= r; },
                'typeof': function (l, r) { return typeof l == r; }
            };

            if (!operators[operator]) {
                throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
            }

            result = operators[operator](lvalue, rvalue);

            if (result) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        }
    }
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

//Setup routes
app.get('/', (req, res) => {
    res.render('home', {
    'cards': tools.getTestData(),
    });
});

//Runs the python scraper for campus events
app.get('/update', (req, res) => {
    tools.fetchCampusEvents(res, spawn);
});

//API endpoint for a JSON response of campus events
app.get('/api/events', (req, res) => {
    db.getEvents(res);
});

app.get('/test', (req, res) => {
    db.saveCard(res);
});

app.get('/test1', (req, res) => {
    db.getCards(res);
});

app.get('/events', (req, res) => {
    db.persistEvents(res, events.toString('utf8'));
});

//Start server
app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on port 3000...');
});