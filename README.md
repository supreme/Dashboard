# Dashboard
A WPI dashboard that scrapes various school resources and presents them in a single place. The only developer was myself, Stephen Andrews.

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
