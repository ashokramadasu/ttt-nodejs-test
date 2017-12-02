'use strict';

//Node NPM modules
var  express           = require('express')
,    app               = express()
,    cors              = require('cors')
,    bodyParser        = require("body-parser")
,    async             = require('asyncawait/async')
,    await             = require('asyncawait/await')
,    request           = require('request-promise'); 

//Express configuration settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(express.static('./public'));

// input text file Url given in Assignment
const fileUrl = 'http://terriblytinytales.com/test.txt'

//Routes used for UI
app.post('/test',test);


//main logic written here
let makeRequest = async (function (N) {
  let   body       = await (request.get(fileUrl))
  let   wordsArray = await (splitByWords(body))
  let   wordsMap   = await (wordCount(wordsArray))
  return sortByCount(wordsMap, N)
});


// request handler function for test end point
function test (req, res) {
  let N = req.body.Number; 

   makeRequest(N)
       .then(function(result){
            res.json(result)
       })
       .catch(function (err) { 
            console.log('Something went wrong: ' + err); 
       });
}


// split string by spaces, tabs, newlines,comma,? mark,!mark, ;, ())
function splitByWords (text) {
  
  let wordsArray = text               
              .replace(/[,?!;()"']/g, " ")
              .replace(/\s+/g, " ")
              .toLowerCase()
              .split(" ");
  return wordsArray;
}


// funtion used for getting words with count
function wordCount (wordsArray) {

  let wordCount = {};

  wordsArray.forEach(function (key) {
    if (wordCount.hasOwnProperty(key)) {
        wordCount[key]++;
    } else {
        wordCount[key] = 1;
    }
  });
   console.log(wordCount)
  return wordCount;

}


// funtion used for sorting  by count in descending order
function sortByCount (wordCount, N) {

  let finalWordsArray = Object.keys(wordCount).map(function(key) {
    return {
      word : key,
      count: wordCount[key]
    };
  });
 
  finalWordsArray.sort(function(a, b) {
    return b.count - a.count;
  });

  return finalWordsArray.slice(0,N);

}


//Express Server running at port 3000;
app.listen(3000,function(){
  console.log("server running at 3000");
});
