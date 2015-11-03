var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 8080;
var router = express.Router();
var rp = require('request-promise');
var token = 'UkWMGR8rpzx37Qyss3JZbEdp';

// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// test route
app.get('/', function (req, res) { res.status(200).send('Hello world!') });

app.post('/challenge', function(req, res, next) {
  // console.log(req);
  submitChallenge(req.body.user_name, req.body.text);
  res.status(200).send('OK');
});

app.post('/accept', function(req, res, next) {
  var userName = req.body.user_name;
  var botPayload = {
    text : 'Let the games begin.',
    'icon_emoji': ':pingpong:'
  };

  // avoid infinite loop
  if (userName !== 'slackbot') {
    return res.status(200).json(botPayload);
  } else {
    return res.status(200).end();
  }
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(400).send(err.message);
});

app.listen(port, function () {
  console.log('Slack bot listening on port ' + port);
});



function submitChallenge(challenger, challengee) {
  var text = challengee + ' is being challenged by ' + challenger + '!\n' +
  challengee + ', do you accept?';

  var options = {
      method: 'POST',
      uri: 'https://hooks.slack.com/services/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',
      body: {
        'text': text,
        'icon_emoji': ':pingpong:'
      },
      json: true // Automatically stringifies the body to JSON
  };

  rp(options).then(function(res) {
    console.log(res);
  })
  .then(null, function(e){
    console.log(e);
  })
}
