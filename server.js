const express = require('express'),
  request = require('request'),
  bodyParser = require('body-parser'),
  app = express();

app.use(bodyParser.json());

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  res.header("Access-Control-Allow-Headers", req.header('access-control-request-headers'));

  if (req.method === 'OPTIONS') {
    console.log('Allowing CORS for ' + req.url)
    res.send();
    return;
  } else {
    let apiEndpoint = req.url;
    let apiRoot = req.headers.target;
    if (!apiRoot) {
      res.send(500, { error: 'There is no target in the request' });
      return;
    }

    console.log('Proxying request to ' + apiRoot + apiEndpoint);
    request({ url: apiRoot + apiEndpoint, method: req.method, json: req.body, headers: { "connection": "keep-alive" } }).pipe(res);
  }
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function () {
  console.log('Proxy server listening on port ' + app.get('port'));
});
