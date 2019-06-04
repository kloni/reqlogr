var config = require('./package').config;
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(express.json());

app.get('/', function (req, res) {
   res.send('OK');
});

app.post('/', function(req, res) {
  console.log(req.body);
  res.send('OK');
});

var server = app.listen(process.env.PORT || config.port, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
});
