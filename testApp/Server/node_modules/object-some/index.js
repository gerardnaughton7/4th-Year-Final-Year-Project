module.exports = function objSome(o, f, t) {
  if (typeof f !== 'function') {
    throw new TypeError('`f` has to be a function');
  }

  var keys = Object.keys(o);
  var len = keys.length;
  var k;

  for (var i = 0; i < len; i++) {
    k = keys[i];
    if (f.call(t, o[k], k, o)) {
      return true;
    }
  }
  return false;
};
