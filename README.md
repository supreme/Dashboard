# Dashboard
A WPI dashboard that scrapes various school resources and presents them in a single place. The only developer was myself, Stephen Andrews.

Overall the dashboard turned out pretty good. This was a considerably large project for a single person so I'm happy with the current state. Most of the code is documented well. 

Features - 
+ ES6!!!!
+ SASS styling
+ Handlebars templating
+ 2 web scrapers
+ Easy to extend design

Known 'bugs' -
+ Performance on mobile devices needs improvement. Most of the site responds to resizing browsers well, but when viewing on phones the navbar appears wrong. Ideally I would like to have a separate stylesheet entirely for mobile devices but I simply did not have enough time to do this.
+ The scraper written in JavaScript will work fine if you visit the endpoint for it, but the Python one will not when deployed. This script would normally be run on as a cron job but I didn't have enough time to look into it for heroku.
+ Didn't finish adding the links to the search but they are configured in mappings.json

## Getting started
Pre-reqs
+ knex
+ sqlite3

1. `npm install --save`
1. `knex init`
1. `knex migrate:latest`
1. `cd app`
1. `node server.js`

## Routes
 + `/` - Main dashboard view 

  All cards, with the exception of the weather, qualtrics survey, and twitter timeline, have dynamically generated content.   All content is pulled from an sqlite3 database using bookshelf.js model structure.

+ `/scrapers/events` - Fetches campus events from OrgSync

  The scraper for the OrgSync events was actually written as a Python script. OrgSync generates their webpages with JavaScript which makes traditional web scraping methods fail. As a result I had to use Selenium to mimic a client sided connection so the JavaScript would load. Supposedly you can accomplish the same task in Node, but all the packages I tried didn't work. 
  
  The Python script is invoked by running a bash script from node which then executes the python script in its own virtual environment. The script outputs a json file to the json directory in the node application. This was by far the most difficult part of the assignment. **The Python script will not run on the heroku hosted site but will on your localhost if you setup the virutalenv correctly**.
  
+ `/scrapers/dailyherd` - Fetches articles from the Daily Herd

  This scraper is written in JavaScript using the Cheerio package. This site is not dynamically generated so I didn't have the same issue. Like the Python script, the data is exported to json.

+ `/api/events` - API endpoint for campus events **Only GET**
+ `/api/dailyherd` - API endpoint for Daily Herd articles **Only GET**
+ `/api/mappings` - API endpoint for search bar mappings`

## Stack
  + bookshelf.js
  + cheerio
  + express
  + express-handlebars
  + gulp
  + gulp-sass
  + knex
  + request
  + sqlite3
  
## History
Last year SGA senator Santiago Sada De La Paz created a program known as sDev (Student Developer Program) in an attempt to improve the quality of WPI's software. The program was intended to allow WPI students less prone to an SGA position to participate in the WPI community. As part of the pilot program myself and 3 other students were selected to develop a student portal as proof of concept. This final project serves as the first (mostly complete version of the dashboard).
