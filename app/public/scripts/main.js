let cheerio = require('cheerio');
let request = require('request');

let url = 'http://www.google.com';
request(url, (error, response, html) => {
  if(!error){
            var $ = cheerio.load(html);
            console.log($);
        }
});