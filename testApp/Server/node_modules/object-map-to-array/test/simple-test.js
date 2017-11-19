var assert = require('assert');
var objmaparr = require('../');

var o1 = {
  a: 1,
  b: -1,
  c: 0,
  d: 42
};

var ctx = {
  foo: 'bar'
};

assert.deepEqual([
  { id: 'a', value: 1 },
  { id: 'b', value: -1 },
  { id: 'c', value: 0 },
  { id: 'd', value: 42 }
], objmaparr(o1, function (n, k, o) {
  assert.equal(o, o1);
  assert(typeof o1[k] !== 'undefined');
  return { id: k, value: n };
}));

objmaparr(o1, function (n) {
  assert.equal(this, ctx);
  return true;
}, ctx);

assert.throws(function () {
  objmaparr(o1, null);
});
