var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var app = express();
var cors = require('cors');
var db = null;
var url = 'mongodb://localhost:27017/phoneBook';
MongoClient.connect(url, function(err, _db) {
    if (err) {
        console.log('Connection Error');
    } else {
        console.log("Connected correctly to server");
        db = _db;
    }
});
app.use(cors());
app.use(express.static('./'));
app.get('/api/add/', function(req, res) {
    insertDocuments(db, {
        "id": req.query.id,
        "name": req.query.name,
        "numberPhone": req.query.numberPhone
    }, function(result) {
        res.send(result);
    }, function(err) {
        res.status(500).send(err);
    });
});
app.get('/api/show', function(req, res) {
    findDocuments(db, function(docs) {
        res.send(docs);
    }, function(err) {
        res.status(500).send(err);
    });
});
app.get('/api/update/:_id', function(req, res) {
    var find = {};
    var newData = {};
    if (req.params._id) find._id = new ObjectID(req.params._id);
    if (req.query.name) newData.name = req.query.name;
    if (req.query.numberPhone) newData.numberPhone = req.query.numberPhone;
    updateDocuments(db, find, newData, function(result) {
        res.send(result);
    }, function(err) {
        res.status(500).send(err);
    });
});
app.get('/api/remove/:_id',function(req,res)
{
  var find = {};
  if(req.params._id)
    find._id = new ObjectID(req.params._id);

  removeDocuments(db, find, function(result) {
        res.send(result);
    }, function(err) {
        res.status(500).send(err);
    });
});
var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
// Function //
function insertDocuments(db, data, success, error) {
    var collection = db.collection('member');
    collection.insert(data, function(err, result) {
        if (err) {
            error(err);
        } else {
            success(result);
        }
    });
}

function findDocuments(db, success, error) {
    var collection = db.collection('member');
    collection.find({}).toArray(function(err, result) {
        if (err) {
            error(err);
        } else {
            success(result);
        }
    });
}

function updateDocuments(db, find, newData, success, error) {
    var collection = db.collection('member');
    collection.update(find, {
        '$set': newData
    }, function(err, result) {
        if (err) {
            error(err);
        } else {
            success(result);
        }
    });
}

function removeDocuments(db, find, success, error) {
    var collection = db.collection('member');
    collection.remove(find, function(err, result) {
        if (err) {
            error(err);
        } else {
            success(result);
        }
    });
}