'use strict';

let express = require('express');
let exphbs = require('express-handlebars');

//Configure express
let app = express();
let hbs = exphbs.create({
    defaultLayout: 'main',
    partialsDir: [
        'views/partials/'
    ]
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static('public'));

//Setup routes
app.get('/', (req, res) => {
  res.render('home', {
    title: 'Test',
    content: 'I am some content...'
  });
});

//Start server
app.listen(3000, () => {
  console.log('Listening on port 3000...');
});