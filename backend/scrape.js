
var request = require('request');
var cheerio = require('cheerio');
var urlencode = require ('urlencode');



module.exports = {
  scrape: function(word) {
 var res=[];
	//urlencode(word);
  var url = "https://rechnik.chitanka.info/w/" + urlencode('работа');


    request(url, function (error, response, body) {
  if (!error) {

    var $ = cheerio.load(body);
	//console.log (body);
  var  temperature = $('.synonyms li a').each(function(i, elm) {
   res.push($(this).text());
  
});
   
	//  console.log(res);
	  return res;
  
  } else {
    console.log("We’ve encountered an error: " + error);
  }
});

	
	  
	  } };

 
  


  
