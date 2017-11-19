module.exports = function objectKeysMap(o, f, t) {
  var ret = {};

  if (typeof f !== 'function') {
    throw new TypeError('`f` has to be a function');
  }

  Object.keys(o).forEach(function (k) {
    ret[f.call(t || this, k, o[k], o)] = o[k];
  });
  return ret;
};
