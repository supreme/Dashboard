/**
 * Contains various utility methods.
 * @author Stephen Andrews
 * @since 12.11.16
 */
'use strict';

var request = require('request');
var cheerio = require('cheerio');
var fs      = require ('fs');

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

let writeFile = (dest, content) => {
  fs.writeFile(dest, content, (err) => {
    if (err) {
      return console.log(err);
    }

    console.log(`Wrote ${dest}`);
  });
}

module.exports = {
    fetchCampusEvents: (res, spawn) => {
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
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response));
        });
    },
    fetchDailyHerd: (callback) => {
      console.log("Starting scrape");
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
              parsed.push({title, link, date, image});
            });

            writeFile('json/daily_herd.json', JSON.stringify(parsed, null, '\t'));
            callback();
          } else {
            console.log(error);
          }
      });
    },
    getTestData: () => {
        let cards = [
        {
            'type': 'default',
            'title': 'F',
            'content': 'I got twoooooooo versions',
            'updated-at': '7 mins ago'
        },
            {
            'type': 'default',
            'title': 'F',
            'content': 'I got twoooooooo versions',
            'updated-at': '7 mins ago'
        },
            {
            'type': 'default',
            'title': 'F',
            'content': 'I got versions',
            'updated-at': '7 mins ago'
        }];
        return cards;
    }
}
