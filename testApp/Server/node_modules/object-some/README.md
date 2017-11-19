# object-some
[![Build Status](https://travis-ci.org/mmalecki/object-some.png?branch=master)](https://travis-ci.org/mmalecki/object-some)

`Array.prototype.filter` for objects.

## Installation

```sh
npm install object-some
```

## Usage

```js
var assert = require('assert');
var objectSome = require('object-some');

var o1 = {
  a: 1,
  b: -1,
  c: 0,
  d: 42
};

objectSome(o1, function (n) {
  return n > 0;
}); // => `true`

objectSome(o1, function (n) {
  return n === 100'
}); // => `false`
```

## API

### `objectSome(obj, iterator, this)`

* `obj` (`object`) - object to filter on
* `iterator` (`function`, required) - iterator function
* `this` (optional) - `this` for `iterator`

Iterates over `obj`, calls `iterator(value, key, obj)` with each item and
returns `true` if it returns `true` when `iterator` returns `true`, false otherwise.
