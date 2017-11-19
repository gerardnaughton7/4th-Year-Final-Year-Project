var assert = require('assert');
var objSome = require('../');

var o1 = {
  a: 1,
  b: -1,
  c: 0,
  d: 42
};

var ctx = {
  foo: 'bar'
};

assert(objSome(o1, function (n, k, o) {
  assert.equal(o, o1);
  assert(typeof o1[k] !== 'undefined');
  return n > 0;
}));

assert(!objSome(o1, function (n, k, o) {
  assert.equal(o, o1);
  assert(typeof o1[k] !== 'undefined');
  return n === 100;
}));

assert(objSome(o1, function (n) {
  assert.equal(this, ctx);
  return true;
}, ctx));

assert.throws(function () {
  objSome(o1, null);
});
