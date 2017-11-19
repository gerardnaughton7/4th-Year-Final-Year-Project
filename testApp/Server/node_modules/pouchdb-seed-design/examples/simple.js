var PouchDB = require('pouchdb');
var seed = require('../index');
var db = new PouchDB('http://localhost:5984/pouch_simple_test');

var designDoc = {
  person: {
    views: {
      byFirstName: function (doc) {
        emit(doc.firstName);
      },
      byLastName: function (doc) {
        emit(doc.lastName);
      },
      byFullName: function (doc) {
        emit(doc.firstName + ' ' + doc.lastName);
      }
    },
    updates: {
      firstName: function (doc, req) {
        doc.firstName = req.body;
        return [doc, 'ok'];
      }
    }
  }
};

seed(db, designDoc)
  .then(function(result) {
    console.log(result);
  })
  .catch(function(err) {
    console.log(err)
  });
