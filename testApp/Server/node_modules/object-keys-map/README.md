# object-keys-map
[![Build Status](https://travis-ci.org/mmalecki/object-keys-map.png?branch=master)](https://travis-ci.org/mmalecki/object-keys-map)

`Array.prototype.map` for object keys.

## Usage

```js
var assert = require('assert');
var objmap = require('object-keys-map');

var o1 = {
  foo: 'bar',
  bar: 'foo'
};

objmap(o1, function (key) {
  return 'foo/' + key;
}); // => `{ 'foo/foo': 'bar', 'foo/bar': 'foo' }`
```

## API

### `objectKeysMap(obj, iterator, this)`

* `obj` (`object`) - object to map on
* `iterator` (`function`, required) - iterator function
* `this` (optional) - `this` for `iterator`

Iterates over keys of `obj` and creates a new object with keys based on return
value of `iterator` and values from `obj`.
