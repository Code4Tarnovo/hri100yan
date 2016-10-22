var _ = require("underscore");
_.str = require('underscore.string');


var obj=[
    "а", "автентичен", "аз", "ако", "ала", "бе", "без", "беше", "би", "бивш", "бивша", "бившо", "бил", "била", "били", "било", "благодаря", "близо", "бъдат", "бъде", "бяха", "в", "вас", "ваш", "ваша", "вероятно", "вече", "взема", "ви", "вие", "винаги", "внимава", "време", "все", "всеки", "всички", "всичко", "всяка", "във", "въпреки", "върху", "г", "ги", "главен", "главна", "главно", "глас", "го", "година", "години", "годишен", "д", "да", "дали", "два", "двама", "двамата", "две", "двете", "ден", "днес", "дни", "до", "добра", "добре", "добро", "добър", "докато", "докога", "дори", "досега", "доста", "друг", "друга", "други", "е", "евтин", "едва", "един", "една", "еднаква", "еднакви", "еднакъв", "едно", "екип", "ето", "живот", "за", "забавям", "зад", "заедно", "заради", "засега", "заспал", "затова", "защо", "защото", "и", "из", "или", "им", "има", "имат", "иска", "й", "каза", "как", "каква", "какво", "както", "какъв", "като", "кога", "когато", "което", "които", "кой", "който", "колко", "която", "къде", "където", "към", "лесен", "лесно", "ли", "лош", "м", "май", "малко", "ме", "между", "мек", "мен", "месец", "ми", "много", "мнозина", "мога", "могат", "може", "мокър", "моля", "момента", "му", "н", "на", "над", "назад", "най", "направи", "напред", "например", "нас", "не", "него", "нещо", "нея", "ни", "ние", "никой", "нито", "нищо", "но", "нов", "нова", "нови", "новина", "някои", "някой", "няколко", "няма", "обаче", "около", "освен", "особено", "от", "отгоре", "отново", "още", "пак", "по", "повече", "повечето", "под", "поне", "поради", "после", "почти", "прави", "пред", "преди", "през", "при", "пък", "първата", "първи", "първо", "пъти", "равен", "равна", "с", "са", "сам", "само", "се", "сега", "си", "син", "скоро", "след", "следващ", "сме", "смях", "според", "сред", "срещу", "сте", "съм", "със", "също", "т", "тази", "така", "такива", "такъв", "там", "твой", "те", "тези", "ти", "т.н.", "то", "това", "тогава", "този", "той", "толкова", "точно", "три", "трябва", "тук", "тъй", "тя", "тях", "у", "утре", "харесва", "хиляди", "ч", "часа", "че", "често", "чрез", "ще", "щом", "юмрук", "я", "як"

    ];



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

function _getStopwords(options){
    options = options || {};

    var _language = options.language || "english";
   

    return stopwords[_language];
}

module.exports = {
    extract:_extract,
    getStopwords: _getStopwords
};
