var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var pg = require('pg');
//routes
var customer = require('./routes/customers')

var port = 3000;

var config = {
  database: 'order_history_app',
  host: 'localhost',
  port: 5432,
  max: 12
};

var pool = new pg.Pool(config);
  var sendBackData = [];

app.listen(port, function(){
  console.log('server up on:', port);
})

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', function(req, res){
  console.log('base url hit');
  res.sendFile(path.resolve('views/index.html'));
});

app.use('/get', customer);
