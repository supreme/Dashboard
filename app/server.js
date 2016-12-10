'use strict';

let express = require('express');

//Configure express
let app = express();
app.set('views',__dirname + '/views')

let exphbs = require('express-handlebars');
let hbs = exphbs.create({
    defaultLayout: 'main',
    layoutsDir: 'app/views/layouts',
    partialsDir: [
        'app/views/partials/'
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

let cards = [
    {
        'type': 'image',
        'src': '../img/canvas_logo.svg'
    },
    {
        'type': 'image',
        'src': '../img/canvas_logo.svg'
    },
    {
        'type': 'default',
        'title': 'F',
        'content': 'I got twoooooooo versions',
        'updated-at': '7 mins ago'
    },
        {
        'type': 'default',
        'title': 'F',
        'content': 'I got twoooooooo versions',
        'updated-at': '7 mins ago'
    },
        {
        'type': 'default',
        'title': 'F',
        'content': 'I got versions',
        'updated-at': '7 mins ago'
    }
];
//Setup routes
app.get('/', (req, res) => {
  res.render('home', {
    'cards': cards
  });
});

//Start server
app.listen(3000, () => {
  console.log('Listening on port 3000...');
});