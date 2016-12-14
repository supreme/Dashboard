/**
 * Represents a news article from the Daily Herd.
 * @author Stephen Andrews
 * @since 12.14.16
 */
'use strict';

let Bookshelf = require('./database');

let HerdArticle = Bookshelf.Model.extend({
  tableName: 'dailyherd',
  hasTimestamps: true,
});

module.exports = Bookshelf.model('HerdArticle', HerdArticle);
