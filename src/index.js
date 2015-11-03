var express = require('express');
var bodyParser = require('body-parser');
var rp = require('request-promise');
var response = require('./hackbot');
var app = express();
var port = process.env.PORT || 8080;
var router = express.Router();
var webhook = 'https://hooks.slack.com/services/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';


// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// test route
app.get('/', function (req, res) { res.status(200).send('Hello world!') });
app.post('/hello', response);
// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(400).send(err.message);
});

// app.listen(port, function () {
//   console.log('Slack bot listening on port ' + port);
// });

var options = {
  method: 'POST',
  uri: webhook,
  body: {
    "payload": JSON.stringify({text:'lorem'})
  }
};

rp(options).then(function(){
  console.log('yay');
})

