var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
const cors = require('cors');

//const bills = require('./mongoose/account');


var app = express();
app.use(bodyParser.json());

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(cors({credentials: true, origin: true}))

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const mongoose = require('mongoose');

//var Schema = mongoose.Schema;

const options = {
  reconnectTries: 60,
  reconnectInterval: 2000,
  auto_reconnect: true

}

var connection_url = "";
//var url ="mongodb+srv://admin:admin@cluster0.7mgnx.mongodb.net/innovate-mongo?retryWrites=true&w=majority";

var server;
//var server = require('./app');
var port = 3400;
// Connect to the db 
var connection_url = "169.57.56.202:30659";
//
var url = "mongodb+srv://admin:admin@cluster0.7mgnx.mongodb.net/innovate?retryWrites=true&w=majority";
MongoClient.connect(url,options, function(err, mongoclient) {
  if(err) {
    console.log("Mongo DB connection failed");
    return console.dir(err);
  }
  console.log("Mongo DB connection successful");



});

app.post('/api/bills/create', function (req, res) {
    let number = Math.floor(Math.random() * 900000);
    let balance = 0;

    var body = req.body;
    console.log(JSON.stringify(body));
   // res.send(body);

    var url = "mongodb+srv://admin:admin@cluster0.7mgnx.mongodb.net/innovate?retryWrites=true&w=majority";


    const options = {
      reconnectTries: 60,
      reconnectInterval: 2000,
      auto_reconnect: true

    }

    MongoClient.connect(url,options, function(err, mongoclient) {
    if(err) {
      console.log("Mongo DB connection failed");
      return console.dir(err);
    }

  
  //console.log(JSON.stringify(newAccount));

  var database = mongoclient.db("innovate");
  var collection;

  database.createCollection('bills', function(err1, collection) {
   
  var newBill = {
        uuid: req.body.uuid,
        category: req.body.category,
        entity: req.body.entity,
        account_no: req.body.account_no,
        amount: req.body.amount,
        date: req.body.date,
        type: req.body.type
  };

 collection = database.collection('bills');


collection.update({'category': req.body.category}, newBill, {upsert: true}, function (err) {
if (err) {
    console.log(err);
    res.status(500).send(err);
    return;
}
    console.log("Bill created");
    res.status(200).send({'message': 'Done!'});
});
});
   });


});


/*



*/



app.post('/api/bills/get', function (req, res) {
var url = "mongodb+srv://admin:admin@cluster0.7mgnx.mongodb.net/innovate?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, mongoclient) {
    if(err) {
      console.log("Mongo DB connection failed");
      return console.dir(err);
    }





const client = new MongoClient(url);

async function run() {
  try {
    await client.connect();
    const database = client.db("innovate");
    const bills = database.collection("bills");
    // Query for a movie that has the title 'The Room'
    const query = { uuid:req.body.uuid};


    //res.status(200).send("bill has been found");
    //console.log("bill has been found");

   bills.find(query).toArray(function(err, items) {
         // res.status(200).send(items);
          //o[key].push(items);
          //res.status(200).send(JSON.stringify(o));
          res.status(200).send(items);
      });

   

    }finally {
        client.close();
      }
    }
      run().catch(console.dir);


      });

});


app.get('/api/bills/drop', function (req, res) {
MongoClient.connect(url,{ useUnifiedTopology: true }, function(err, mongoclient) {
    if(err) {
      console.log("Mongo DB connection failed");
      return console.dir(err);
    }

const client = new MongoClient(url);

async function run() {
  try {
    await client.connect();
    const database = client.db("innovate");
    const bills = database.collection("bills");
    // Query for a movie that has the title 'The Room'

    bills.drop();
    // since this method returns the matched document, not a cursor, print it directly
    
    console.log("Bill collection has been droped");
    res.status(200).send({'message': 'Done!'});


    //res.status(200).send(movie

    }finally {
        await client.close();
      }
    }
      run().catch(console.dir);


      });

});




app.get('/', function (req, res) {
    res.end( "Rest API implementation for Microservice BILLS " );
});

var port = 3800;

var server = app.listen(port, function () {
  console.log("Bills service listening on " + port);
});

