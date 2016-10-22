var keyword_extractor = require("./module");
 var fs = require('fs');

var sentence = "Също както много свои връстници Дориан отива да работи като сезонен работник в съседна Гърция, за да изкара някой лев и да подпомага семейството при изплащането на заема. Много от албанските гастарбайтери обаче остават без работа поради финансовата криза в Гърция и Дориан трябва да напусне страната."
 

var extraction_result = keyword_extractor.extract(sentence,{
                                                                language:"bulgarian",
                                                                remove_digits: true,
                                                                return_changed_case:true,
                                                                remove_duplicates: false
 
                                                           });
														   
														   
console.log (extraction_result);

var str = JSON.stringify(extraction_result);
fs.appendFile('text.txt', str, 'utf8', function(err) {
    if(err) {
        console.log('there was an error: ', err);
        return;
    }
    console.log('Хуйййй',{'Content-Type': 'text/plain; charset=utf-8'});
});