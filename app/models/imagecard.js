// Image Card Model
// ==========
// Create a image card model class

'use strict';

let Bookshelf = require('./database');

let ImageCard = Bookshelf.Model.extend({
  tableName: 'imagecards',
  hasTimestamps: true,
});

module.exports = Bookshelf.model('ImageCard', ImageCard);