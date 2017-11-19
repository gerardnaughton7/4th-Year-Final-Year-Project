var PouchDB = require("pouchdb");
var expect = require("chai").expect;
var seed = require("../index");
var db = new PouchDB("http://localhost:5984/pouchdb_seed_test");

if(typeof Promise !== 'function') {
  var Promise = require('lie');
}

var designDoc1 = {
  person: {
    views: {
      byFirstName: function (doc) {
        emit(doc.firstName);
      },
      byLastName: function (doc) {
        emit(doc.lastName);
      },
      byFullName: function (doc) {
        emit(doc.firstName + " " + doc.lastName);
      }
    },
    updates: {
      firstName: function (doc, req) {
        doc.firstName = req.body;
        return [doc, "ok"];
      }
    },
    filters: {
      byType: function(doc, req) {
        return doc.type == "person";
      }
    },
    lists: {
      zoom: function() { return "zoom!"; },
    },
    shows: {
      people: function(doc, req) { return "foo"; }
    },
    validate_doc_update: function(newDoc, oldDoc, userCtx, secObj) {
      if (newDoc.address === undefined) {
        throw({forbidden: 'Document must have an address.'});
      }
    }
  }
};

var designDoc2 = {
  person: {
    updates: {
      firstName: function (doc, req) {
        doc.firstName = req.body;
        return [doc, "ok"];
      }
    },
    filters: {
      byType: function(doc, req) {
        return doc.type == "person";
      }
    }
  }
};

describe("pouchdb_seed_design", function() {

  var previous, step1, step2, step3;

  it("should add design docs to an empty database (returning a promise)", function(done) {
    previous = seed(db, designDoc1)
      .then(function(result) {
        expect(result[0].id).to.equal("_design/person");
        return db.get(result[0].id);
      })
      .then(function(ddoc) {
        expect(ddoc.filters.byType).to.be.a('string');
        expect(ddoc.lists.zoom).to.be.a('string');
        expect(ddoc.shows.people).to.be.a('string');
        expect(ddoc.validate_doc_update).to.be.a('string');
        done();
      })
      .catch(function(err) {
        done(err);
      });
  });

  it("should not try to write over a design document that hasn't changed (with callback)", function(done) {
    previous
      .then(function() {
        return new Promise(function(resolve, reject) {
          seed(db, designDoc1, function(err, result) {
            if(err) reject(err);
            expect(err).to.equal(null);
            expect(result).to.equal(false);
            done();
            resolve();
          });
        });
      })
      .catch(function(err) {
        done(err);
      });
  });

  it("should write over a design document that has changed", function(done) {
    previous
      .then(function() {
        designDoc1.person.views.byLastName = function(doc) {
          emit("Mr. " + doc.lastName);
        };
        return seed(db, designDoc1);
      })
      .then(function(result) {
        expect(result[0].id).to.equal("_design/person");
        done();
      })
      .catch(function(err) {
        done(err);
      });
  });

  it("should correctly remove views on update if they no longer exist", function(done) {
    previous
      .then(function() {
        return seed(db, designDoc2);
      })
      .then(function(result) {
        return db.get(result[0].id);
      })
      .then(function(ddoc) {
        expect(ddoc.validate_doc_update).to.be.an('undefined');
        done();
      })
      .catch(function(err) {
        done(err);
      });
  });

  it("should not update a doc that hasn't changed (without all fields specified)", function(done) {
    previous
      .then(function() {
        return seed(db, designDoc2);
      })
      .then(function(result) {
        expect(result).to.equal(false);
        done();
      })
      .catch(function(err) {
        done(err);
      });
  });

  it("should make sure all the steps ran and clean up", function(done) {
    previous
      .then(function() {
        return db.destroy();
      })
      .then(function() {
        done();
      })
      .catch(function(err) {
        done(err);
      });
  });
});