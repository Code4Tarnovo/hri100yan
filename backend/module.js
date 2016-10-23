var request = require('request');
var cheerio = require('cheerio');
var urlencode = require ('urlencode');
var _ = require("underscore");
_.str = require('underscore.string');
var fs = require("fs");
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var dburl = 'mongodb://localhost:27017/test';
var events= require ('./events.json');

var obj=[
    "а", "автентичен", "аз", "ако", "ала", "бе", "без", "беше", "би", "бивш", "бивша", "бившо", "бил", "била", "били", "било", "благодаря", "близо", "бъдат", "бъде", "бяха", "в", "вас", "ваш", "ваша", "вероятно", "вече", "взема", "ви", "вие", "винаги", "внимава", "време", "все", "всеки", "всички", "всичко", "всяка", "във", "въпреки", "върху", "г", "ги", "главен", "главна", "главно", "глас", "го", "година", "години", "годишен", "д", "да", "дали", "два", "двама", "двамата", "две", "двете", "ден", "днес", "дни", "до", "добра", "добре", "добро", "добър", "докато", "докога", "дори", "досега", "доста", "друг", "друга", "други", "е", "евтин", "едва", "един", "една", "еднаква", "еднакви", "еднакъв", "едно", "екип", "ето", "живот", "за", "забавям", "зад", "заедно", "заради", "засега", "заспал", "затова", "защо", "защото", "и", "из", "или", "им", "има", "имат", "иска", "й", "каза", "как", "каква", "какво", "както", "какъв", "като", "кога", "когато", "което", "които", "кой", "който", "колко", "която", "къде", "където", "към", "лесен", "лесно", "ли", "лош", "м", "май", "малко", "ме", "между", "мек", "мен", "месец", "ми", "много", "мнозина", "мога", "могат", "може", "мокър", "моля", "момента", "му", "н", "на", "над", "назад", "най", "направи", "напред", "например", "нас", "не", "него", "нещо", "нея", "ни", "ние", "никой", "нито", "нищо", "но", "нов", "нова", "нови", "новина", "някои", "някой", "няколко", "няма", "обаче", "около", "освен", "особено", "от", "отгоре", "отново", "още", "пак", "по", "повече", "повечето", "под", "поне", "поради", "после", "почти", "прави", "пред", "преди", "през", "при", "пък", "първата", "първи", "първо", "пъти", "равен", "равна", "с", "са", "сам", "само", "се", "сега", "си", "син", "скоро", "след", "следващ", "сме", "смях", "според", "сред", "срещу", "сте", "съм", "със", "също", "т", "тази", "така", "такива", "такъв", "там", "твой", "те", "тези", "ти", "т.н.", "то", "това", "тогава", "този", "той", "толкова", "точно", "три", "трябва", "тук", "тъй", "тя", "тях", "у", "утре", "харесва", "хиляди", "ч", "часа", "че", "често", "чрез", "ще", "щом", "юмрук", "я", "як"

    ];


	function synonyms (word) {
	var res=[];

	
	
  var url = "https://rechnik.chitanka.info/w/" + urlencode(word);


    request(url, function (error, response, body) {
  if (!error) {

    var $ = cheerio.load(body);

  var  temperature = $('.synonyms li a').each(function(i, elm) {
   res.push($(this).text());
  
});
if (res.length==0) {
	
	 var  newUrl = $('.meaning a').first().attr('href');
	 console.log (newUrl);
	 url = "https://rechnik.chitanka.info" + newUrl;
	 
	 request(url, function (errornew, responsenew, bodynew) {
  if (!errornew) {

    $ = cheerio.load(bodynew);

  var  syno = $('.synonyms li a').each(function(i, elm) {
   res.push($(this).text());

  
});

//console.log (res);
 var insertDocument = function(db, callback) {



for (var i=0; i<events.length; i++){
	
	
	
  db.collection('keywords').insertOne( 
     {
		 	"keyword": _extract(events[i].name).concat(_extract(events[i].description)),
			"id": events[i].id

			
		
      
   } 
   , function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into 'events' collection.");
    callback();
   
  }); 
	 }};

MongoClient.connect(dburl, function(err, db) {
  assert.equal(null, err);
  insertDocument(db, function() {
      db.close();
  });
}); 


return res;  
 }
	 
});   }
	
	 var insertDocument = function(db, callback) {



for (var i=0; i<events.length; i++){
	
	
	
  db.collection('keywords').insertOne( 
     {
		 	"keyword":_extract(events[i].name).concat(_extract(events[i].description)),
			"id": events[i].id
			
		
      
   } 
   , function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into 'events' collection.");
    callback();
   
  }); 
	 }};

MongoClient.connect(dburl, function(err, db) {
  assert.equal(null, err);
  insertDocument(db, function() {
      db.close();
  });
}); 
	
	  return res;
  
  } else {
    console.log("We’ve encountered an error: " + error);
  }
});

	
	  
	  }


console.log(synonyms ('работа'));

  console.log(events[1].name);
  
  /*var insertDocument = function(db, callback) {



for (var i=0; i<1; i++){
	
	
	
  db.collection('keywords').insertOne( 
     {
		 	"keyword": _extract(events[1].name).concat(_extract(events[1].description)),
			"synonym": synonyms('работа')
      
   } 
   , function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into 'events' collection.");
    callback();
   
  }); 
	 }};

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  insertDocument(db, function() {
      db.close();
  });
}); 
	*/
  
 
function _extract(str, options){
    if(_.isEmpty(str)){
        return [];
    }
    if(_.isEmpty(options)){
        options = {
            remove_digits: true,
            return_changed_case: true
        };
    }
    var return_changed_case = options.return_changed_case;
    var return_chained_words = options.return_chained_words;
    var remove_digits = options.remove_digits;
    var _language = options.language || "english";
    var _remove_duplicates = options.remove_duplicates || false;

  

    //  strip any HTML and trim whitespace
    var text = _.str.trim(_.str.stripTags(str));
    if(_.isEmpty(text)){
        return [];
    }else{
        var words = text.split(/\s/);
        var unchanged_words = [];
        var low_words = [];
        //  change the case of all the words
        for(var x = 0;x < words.length; x++){
            var w = words[x].match(/https?:\/\/.*[\r\n]*/g) ? words[x] : words[x].replace(/\.|,|;|!|\?|\(|\)|:|"|^'|'$/g,'');
            //  remove periods, question marks, exclamation points, commas, and semi-colons
            //  if this is a short result, make sure it's not a single character or something 'odd'
            if(w.length === 1){
                w = w.replace(/-|_|@|&|#/g,'');
            }
            //  if it's a number, remove it
            var digits_match = w.match(/\d/g);
            if(remove_digits && digits_match && digits_match.length === w.length){
                w = "";
            }
            if(w.length > 0){
                low_words.push(w.toLowerCase());
                unchanged_words.push(w);
            }
        }
		//console.log (low_words);
var options = {language:"russian"};

//var obj = JSON.parse(fs.readFileSync('stopwords/bg.json', 'utf8'));
//console.log(words);
//console.log(obj[0].words);
var len1=low_words.length;
var len2=obj.length;
for (var m=0; m<len1; m++) {
	var br=false;
	for (var r=0; r<len2; r++){
		
		if (low_words[m]==obj[r]) {br=true;}
		
	}
	
	if (!br) {console.log(low_words[m]);}
}



        return low_words;
    }
}



module.exports = {
    extract:_extract,
  //  getStopwords: _getStopwords
};
