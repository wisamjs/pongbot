const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const router = express.Router();

const token = process.env.SLACK_AUTH_TOKEN;

const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// test route
router.get('/', function (req, res) { 
  res.status(200).send('Hello world!');
});

router.post('/challenge', function(req, res, next) {
  submitChallenge(req.body.user_name, req.body.text)
  .then(() => {
    res.status(200).send('OK');
  })
  .catch((err) => {
    console.log(err);
    res.status(500);
  });
});

router.post('/accept', function(req, res, next) {
  const userName = req.body.user_name;
  const botPayload = {
    text : 'Let the games begin.',
    'icon_emoji': ':pingpong:'
  };

  // avoid infinite loop
  if (userName !== 'slackbot') {
    return res.status(200).json(botPayload);
  } else {
    return res.status(200);
  }
});

app.use('/api', router);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(400).send(err.message);
});

app.listen(port, function () {
  console.log('Pong bot listening on port ' + port);
});


function submitChallenge(challenger, challengee) {
  const text = `${challengee} is being challenged by ${challenger}!\n${challengee}, do you accept?`;

  const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'text': text
      })
  };

  return fetch(process.env.SLACK_URL, options);
}
