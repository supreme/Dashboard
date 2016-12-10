let cheerio = require('cheerio');
let request = require('ajax-request');
let http = require('http');


request({
  url: 'https://orgsync.com/412/community/calendar?view=upcoming',
  method: 'GET',
}, function(err, res, body) {
    console.log(res);
});

// let url = 'https://orgsync.com/412/community/calendar?view=upcoming';
// req = request.defaults({
//   jar: true,                 // save cookies to jar
//   rejectUnauthorized: false, 
//   followAllRedirects: true   // allow redirections
// });

// let ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) ' +
//     'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.57 Safari/537.36';

// req.get({
//   url: 'https://orgsync.com/412/community/calendar?view=upcoming',
// }, (error, response, html) => {
//     if (!error) {
//       var $ = cheerio.load(html);
//       console.log($);
//     } else {
//       console.log(error);
//     }
// });