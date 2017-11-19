
# couch-pwd

[![Build Status](https://travis-ci.org/zeMirco/couch-pwd.svg?branch=master)](https://travis-ci.org/zeMirco/couch-pwd)

Hash and compare passwords with the crypto's pbkdf2.
Heavily inspired by [node-pwd](https://github.com/visionmedia/node-pwd).

Uses the following values as defaults

- iterations = 10
- keylen = 20
- size = 16
- encoding = 'hex'

The resulting salt and password Strings are the same you'd get when you save a
user to CouchDB and let CouchDB do all the hashing for you.

Module has two goals

- verify user passwords without making requests to `/_session` API
- use the same hashing algorithm for other databases

# Installation

```bash
npm install couch-pwd
```

# Example

On signup generate a salt / password hash, and save it somewhere:

```js
var pwd = require('couch-pwd');
pwd.hash('my password', function(err, salt, hash){
  user.salt = salt;
  user.hash = hash;
})
```

To authenticate load and compare:

```js
var pwd = require('couch-pwd');
pwd.hash('submitted password', user.salt, function(err, hash){
  if (user.hash == hash) {
    // yay
  }
})
```

## License

MIT
