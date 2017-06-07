var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');

var config = {
  database: 'order_history_app',
  host: 'localhost',
  port: 5432,
  max: 12
};

var pool = new pg.Pool(config);
  var sendBackData = [];

router.get('/customers', function(req, res){
  pool.connect(function (err, client, done) {
    if (err) {
      console.log('Error connecting to the DB', err);
      res.sendStatus(500);
      done();
      return;
    }

    client.query('SELECT * FROM customers;', function (err, result) {
      done();
      if (err) {
        console.log('Error querying the DB', err);
        res.sendStatus(500);
        return;
      }

      console.log('Got rows from the DB:', result.rows);
      res.send(result.rows);
    });
  });
});

router.get('/:id', function(req, res){
  console.log(req.params.id);
  var id = req.params.id;
pool.connect(function (err, client, done) {
  if (err) {
    console.log('Error connecting to the DB', err);
    res.sendStatus(500);
    done();
    return;
  }

  client.query('SELECT customers.id, order_id,' +
  ' first_name, last_name, street, city, state, zip, address_type,' +
  ' quantity, description, products.unit_price, total' +
  '  FROM customers JOIN addresses ON customers.id = addresses.customer_id '+
  ' JOIN orders ON orders.address_id = addresses.id'+
  '  JOIN line_items on line_items.order_id = orders.id '+
  'JOIN products on products.id = line_items.product_id WHERE customers.id = '+ id, function (err, result) {
    done();
    if (err) {
      console.log('Error querying the DB', err);
      res.sendStatus(500);
      return;
    }

    console.log('Got rows from the DB:', result.rows);
    res.send(result.rows);
  });
});
});
//end calls
module.exports = router;
