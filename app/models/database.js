// Database
// ========
// Connect to the relational database
'use strict';

var knex      = require('knex')(require('../knexfile')['development']),
    bookshelf = require('bookshelf')(knex),
    fs        = require('fs');

bookshelf.plugin('registry');
module.exports = bookshelf;

//Data
//====
//Add data to database
let ImageCard = require('./imagecard');
let CampusEvent = require('./campusevent');
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
        for (let day of json) {
            let parsed = new Date(Date.parse(day.day));
            for (let event of day.events) {
                let myEvent = new CampusEvent();
                myEvent.set('date', parsed);
                myEvent.set('image', event.img);
                myEvent.set('name', event.name);
                myEvent.set('org', event.org);
                myEvent.set('time', event.time);
                myEvent.save().then((e) => {
                    console.log("Saved: " + e);
                })
            }
        }
        res.send("Sucessfully persisted events");
    },
    getEvents: (res) => {
        CampusEvent.collection().fetch().then((events) => {
            res.json(events.toJSON());
        });
    }
};
