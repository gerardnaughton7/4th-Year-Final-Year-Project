var assert = require('assert');
var map = require('../');

var o1 = {
  foo: 'bar',
  bar: 'foo'
};

var ctx = {
  baz: 'bar'
};

var ret = map(o1, function (k, v, o) {
  assert(o1[k]);
  assert.equal(o, o1);
  return 'foo/' + k;
});

assert.deepEqual(Object.keys(ret), ['foo/foo', 'foo/bar']);

map(o1, function (n) {
  assert.equal(this, ctx);
  return 'foo';
}, ctx);

assert.throws(function () {
  map(o1, null);
});
