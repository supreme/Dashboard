// Campus Event Model
// ==========
// Create a campus event model class

'use strict';

let Bookshelf = require('./database');

let CampusEvent = Bookshelf.Model.extend({
  tableName: 'events',
  hasTimestamps: true
});

module.exports = Bookshelf.model('CampusEvent', CampusEvent);
