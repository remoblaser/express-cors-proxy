const express = require('express'),
  request = require('request'),
  bodyParser = require('body-parser'),
  url = require('url'),
  app = express();

app.use(bodyParser.json());

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  res.header("Access-Control-Allow-Headers", req.header('access-control-request-headers'));

  if (req.method === 'OPTIONS') {
    console.log('Allowing CORS for ' + req.url)
    res.send();
  } else {
    let query = url.parse(req.url,true).query;
    let targetURL = query.target;
    if (!targetURL) {
      res.send(500, { error: 'There is no target in the request' });
      return;
    }

    console.log('Proxying request to ' + targetURL);
    request({ url: targetURL, method: req.method, json: req.body },
      function (error, response, body) {
        if (error) {
          console.error(response)
        }
      }).pipe(res);
  }
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function () {
  console.log('Proxy server listening on port ' + app.get('port'));
});
