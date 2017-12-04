'use strict';

//Node NPM modules
var  express           = require('express')
,    app               = express()
,    cors              = require('cors')
,    bodyParser        = require("body-parser")
,    async             = require('asyncawait/async')
,    await             = require('asyncawait/await')
,    request           = require('request-promise')
,    _                 = require('underscore')

//Express configuration settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(express.static('./public'));
app.set( 'port', ( process.env.PORT || 3000 ));

// input text file Url given in Assignment
const fileUrl = 'http://terriblytinytales.com/test.txt'

//Routes used for UI
app.post('/test',test);
// app.get('/',function(req,res){
//    res.render(__dirname+ './public/index.html')
// });

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
    console.log(N)
   makeRequest(N)
       .then(function(result){
            res.json(result)
       })
       .catch(function (err) { 
            console.log('Something went wrong: ' + err); 
            res.status(err.code).send('Something went wrong: ' + err);
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
     wordCount[key] ? wordCount[key]++ : wordCount[key] = 1;
  })
  
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

 let len = finalWordsArray.length;

  finalWordsArray.sort(function(a, b) {
    return b.count - a.count;
  });

  if(N  > len ){
     return ({data: "The result array contains " +len+ " records . Please enter a Number between 1 to " +len})
  }
  return _.first(finalWordsArray, N);

}


//Express Server running at port 3000;
app.listen(app.get( 'port' ),function(){
  console.log("server running at 3000");
});

module.exports= app;
