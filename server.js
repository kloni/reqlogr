var config = require('./package').config;
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(express.json());

app.get('/', function (req, res) {
   res.send('OK');
});

app.post('/', function(req, res) {
  console.log(JSON.stringify(req.body));
   if (req.body.payment && req.body.payment.statuses && req.body.payment.statuses.status) {
      var status = req.body.payment.statuses.status;
      for (var i=0; i<status.length; i++) {
         console.log(status[i].code + ": " + status[i].description);
      }
   }
  res.send('OK');
});

var server = app.listen(process.env.PORT || config.port, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
});
