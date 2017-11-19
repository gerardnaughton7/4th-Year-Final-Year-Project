var nut   = require('./nut')
var shell = require('./shell') //the shell surrounds the nut
var Codec = require('level-codec')
var codec = new Codec();

var ReadStream = require('./read-stream')

var precodec = require('./codec/legacy')

module.exports = function (db) {
  return shell ( nut ( db, precodec, codec ), [], ReadStream, db.options)
}

