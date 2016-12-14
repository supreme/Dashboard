// Database
// ========
// Connect to the relational database
'use strict';

var knex      = require('knex')(require('../knexfile')['development']),
    bookshelf = require('bookshelf')(knex),
    fs        = require('fs');

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
    saveCard: (res) => {
        let card = new ImageCard();
        card.set('text', 'Lol gotcha fag `121`21`');
        card.set('url', 'http://google.com');
        card.save().then((u) => {
            res.end("Successfully added image card!");
        });
    },
    getCards: (res) => {
        ImageCard.collection().fetch().then((cards) => {
            res.json(cards.toJSON());
        });
    },
    persistEvents: (res) => {
        let json = JSON.parse(fs.readFileSync(__dirname + '/campus_events.json', 'utf8'));
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
        res.send("Sucessfully persisted events");
    },
    getEvents: (res) => {
        CampusEvent.collection().fetch().then((events) => {
            res.json(events.toJSON());
        });
    },
    persistDailyHerd: (res) => {
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
      res.send("Successfully persisted daily herd articles");
    },
    getDailyHerd: (res) => {
      HerdArticle.collection().fetch().then((articles) => {
        res.json(articles.toJSON());
      });
    }
};
