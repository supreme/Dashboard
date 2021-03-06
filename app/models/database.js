// Database
// ========
// Connect to the relational database
'use strict';

var knex = require('knex')(require('../knexfile')['development']),
  bookshelf = require('bookshelf')(knex),
  fs = require('fs');

let appRoot = process.cwd();

bookshelf.plugin('registry');
module.exports = bookshelf;

//Data
//====
//Add data to database
let ImageCard = require('./imagecard');
let CampusEvent = require('./campusevent');
let HerdArticle = require('./herdarticle');

module.exports = {
  persistEvents: () => {
    let path = appRoot + '/json/campus_events.json';
    let json = JSON.parse(fs.readFileSync(path, 'utf8'));
    for (var day of json) {
      let parsed = new Date(Date.parse(day.day));
      for (var event of day.events) {
        var myEvent = new CampusEvent();
        myEvent.set('date', parsed);
        myEvent.set('image', event.img);
        myEvent.set('name', event.name);
        myEvent.set('org', event.org);
        myEvent.set('time', event.time);
        myEvent.save().then((e) => {
          console.log("Saved: " + e);
        });
      }
    }
  },
  getEvents: (callback) => {
    CampusEvent.collection().fetch().then((events) => {
      callback(events.toJSON());
    });
  },
  persistDailyHerd: (callback) => {
    let path = appRoot + '/json/daily_herd.json';
    let json = JSON.parse(fs.readFileSync(path), 'utf8');
    for (var item of json) {
      var article = new HerdArticle();
      article.set('title', item.title);
      article.set('link', item.link);
      article.set('date', new Date(Date.parse(item.date)));
      article.set('image', item.image);
      article.save().then((a) => {
        console.log(`Saved: ${a}`);
      });
    }

    callback();
  },
  getDailyHerd: (callback) => {
    HerdArticle.collection().fetch().then((articles) => {
      callback(articles.toJSON());
    });
  }
};
