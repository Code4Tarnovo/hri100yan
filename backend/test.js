var scraper = require ('./scrape');
var urlencode = require ('urlencode');



//console.log (encodeURIComponent('������'));
console.log(scraper.scrape(urlencode('������')));
//console.log(s);