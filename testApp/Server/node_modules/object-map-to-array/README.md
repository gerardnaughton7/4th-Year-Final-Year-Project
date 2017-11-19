# object-map-to-array
[![Build Status](https://travis-ci.org/mmalecki/object-map-to-array.png?branch=master)](https://travis-ci.org/mmalecki/object-map-to-array)

Map an object to an array.

## Usage

```js
var assert = require('assert');
var objMapToArr = require('object-map-to-array');

var o1 = {
  a: 1,
  b: -1,
  c: 0,
  d: 42
};

objMapToArr(o1, function (n) {
  return { id: k, value: n };
}); /* => `[
  [ id: 'a', value: 1 ],
  [ id: 'b', value: -1 ],
  [ id: 'c', value: 0 ],
  [ id: 'd', value: 42 ]
]` */
```

## API

### `objMapToArr(obj, iterator, this)`

* `obj` (`object`) - object to map on
* `iterator` (`function`, required) - iterator function
* `this` (optional) - `this` for `iterator`

Creates a new array with all the items returned by `iterator`.
