var config = require('./package').config;
var express = require('express');
var bodyParser = require('body-parser');
var cons = require('consolidate');

var app = express();

app.use(express.json());

app.get('/', function (req, res) {
   res.send('OK');
});

var requestStore = [];

// assign the mustache engine to .html files
app.engine('html', cons.mustache);

// set .html as the default extension 
app.set('view engine', 'html');

app.set('views', __dirname + '/views');

app.post('/', function(req, res) {
  console.log(JSON.stringify(req.body));
  if (req.body.payment) {
    if (req.body.payment.statuses && req.body.payment.statuses.status) {
      var status = req.body.payment.statuses.status;
      for (var i=0; i<status.length; i++) {
        console.log(status[i].code + ": " + status[i].description);
      }
    }
    requestStore.push(req);
  }
  res.send('OK');
});

app.get('/', function(req, res) {
  res.render('index', { "request": requestStore });
  requestStore.splice(0, requestStore.length);
});

var server = app.listen(process.env.PORT || config.port, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
});
