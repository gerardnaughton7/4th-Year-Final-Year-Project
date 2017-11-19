# pouchdb-seed-design
Seed CouchDB design documents with [`PouchDB`](http://pouchdb.com).

##Build status

[![Build Status](https://travis-ci.org/colinskow/pouchdb-seed-design.png?branch=master)](https://travis-ci.org/colinskow/pouchdb-seed-design)

## Installation

```sh
npm install pouchdb-seed-design
```

## Usage

```js
var PouchDB = require('pouchdb');
var seed = require('pouchdb-seed-design');
var db = new PouchDB('http://localhost:5984/design');

seed(db, {
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
    }
  }
}, function () {
  console.dir(arguments);
});
```

## API

### `pouchdb-seed-design(db, design, cb)`

* `db` (`object`, required) - `PouchDB` (or compatible) database object
* `design` (`object`, required) - design object
* `cb` (`function`, optional) - callback

Creates a set of CouchDB design documents basing on `design` object. Each key in `design` object becomes a separate design document called (`'_design/' + key`).

If no changes between remote design documents and `design` object are detected, no updates are sent to CouchDB.

In addition to invoking the optional callback, seed also returns a [Bluebird Promise](https://github.com/petkaantonov/bluebird/blob/master/API.md).

```js
seed(db, design)
  .then(function(results) {
    console.log(results);
  }, function(err){
    console.log(err);
  });
```

## Updates

##### (0.2.0) 2015-09-16 
Added support for `filters`, `lists`, `shows`, and `validate_doc_update` thanks to [Will Holley](https://github.com/colinskow/pouchdb-seed-design/pull/2). Updated to PouchDB `4.0.X`. Removed Bluebird Promise dependency, preferring native and using [lie](https://github.com/calvinmetcalf/lie) as a fallback.

## Credits

This project is forked from [couchdb-seed-design](https://github.com/mmalecki/couchdb-seed-design) by Maciej Małecki.

A huge round of applause goes to [Dale Harvey](https://github.com/daleharvey), [Calvin Metcalf](https://github.com/calvinmetcalf), and [Nolan Lawson](https://github.com/nolanlawson) for all the tireless work they put into maintaining PouchDB!

And a special thanks goes to [Mirco Zeiss](http://www.mircozeiss.com) for all the awesome blog articles on how to use Node.js, Express, and CouchDB!