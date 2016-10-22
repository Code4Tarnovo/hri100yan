var scraper = require ('./scrape');
var urlencode = require ('urlencode');



//console.log (encodeURIComponent('работа'));
console.log(scraper.scrape(urlencode('работа')));
//console.log(s);