/**
 * Contains various utility methods.
 * @author Stephen Andrews
 * @since 12.11.16
 */
'use strict';

var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

/**
 * Extract the image url from an inline background-image attribute.
 * @param  {String} style background-image CSS attribute.
 * @return {String}       The image url.
 */
let extractImageURL = (style) => {
  let start = style.indexOf("'") + 1;
  let end = style.length - 2;
  return style.substring(start, end);
}

let writeFile = (dest, content, callback) => {
  fs.writeFile(dest, content, (err) => {
    if (err) {
      callback(err);
    }

    callback(`Wrote ${dest}`);
  });
}

module.exports = {
  fetchCampusEvents: (spawn, callback) => {
    const script = spawn('sh', ['../python/update.sh']);
    var response = {}

    script.stderr.on('data', (data) => {
      response['status'] = 'Error';
      response['message'] = data.toString('utf8');
      res.end(JSON.stringify(response));
    });

    script.on('close', (code) => {
      response['status'] = 'Success';
      response['message'] = 'Visit /api/events to view data';
      callback(response);
    });
  },
  fetchDailyHerd: (callback) => {
    let url = 'https://www.wpi.edu/news/daily-herd';
    let urlPrefix = 'https://www.wpi.edu';
    request(url, (error, response, html) => {
      if (!error) {
        let parsed = [];
        let $ = cheerio.load(html);
        let news = $('div .pane-news-daily-herd-grid');
        let articles = news.find('article').each((i, element) => {
          let article = $(element);
          let image = extractImageURL(article.attr('style'));
          let title = article.find('a').text();
          let link = urlPrefix + article.find('a').attr('href');
          let date = article.find('span').text();
          parsed.push({
            title,
            link,
            date,
            image
          });
        });
        let out = JSON.stringify(parsed, null, '\t');
        writeFile('json/daily_herd.json', out, (d) => {
          callback(d);
        });
      } else {
        console.log(error);
        callback(error);
      }
    });
  },
  getTestData: () => {
    let cards = [{
      'title': 'Qualtrics Survey',
      'content': '<iframe src="http://wpi.ut1.qualtrics.com/jfe/form/SV_5on8K9X0SwQwztz" name="Qualtrics" scrolling="auto" frameborder="no" align="center" height="280px" width="100%"></iframe>',
      'updated-at': '7 mins ago'
    }];
    return cards;
  }
}
