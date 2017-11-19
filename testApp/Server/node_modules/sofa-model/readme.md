Sofa Model
===

Sofa Model is a simple model class to sanitize and validate your data. It is 100% data store agnostic and perfect for use with schema-less NoSQL DBs like CouchDB.

Right now it is built for Node.js, but browser support is coming soon. It can be used 100% synchronously, or asynchronously based on Promises.

For issues and feature requests visit the [issue tracker](https://github.com/colinskow/sofa-model/issues).

Build status
---
[![Build Status](https://travis-ci.org/colinskow/sofa-model.png?branch=master)](https://travis-ci.org/colinskow/sofa-model)

Basic Usage
---

```javascript
var Model = require('sofa-model');

var testData = {
  name: "Colin ",
  age: "17",
  telephones: {
    home: "123",
    mobile: "456"
  },
  role: "admin"
};

var userModelOptions = {
  blacklist: [
    "role"
  ],
  sanitize: {
    name: ["trim", "toUpperCase"],
    age: "toInt",
    "telephones.home": {prepend: "+1 "},
    "telephones.mobile": {prepend: "+1 "}
  },
  validate: {
    name: {presence: true},
    age: {
      presence: true,
      numericality: {
        onlyInteger: true,
        greaterThanOrEqualTo: 21,
        lessThan: 150,
        message: "invalid age"
      }
    },
    "telephones.home": {
      presence: true
    },
    "telephones.work": {
      presence: true
    }
  },
  static: {
    role: "user"
  }
};

var UserModel = new Model(userModelOptions);
var testUser = new UserModel(testData);
var results = testUser.process().results;
var errors = testUser.errors;
console.log(results);
console.log(errors);
```

This outputs:

```javascript
{ 
  name: 'COLIN',
  age: 17,
  telephones: { home: '+1 123', mobile: '+1 456' },
  role: 'user'
}
  
{ 
  age: [ 'Age invalid age' ],
  'telephones.work': [ 'Telephones work can\'t be blank' ]
}
```

Async Usage
---
Simply add `async: true` to the options when you instantiate your model. Each transformation you apply to the model will then return a Promise that will resolve with the result of the transformation. If there are validation errors the promise will be rejected with the list of errors.

```javascript
testModelOptions.async = true;
testUser.process()
  .then(function(results) {
    console.log('Yeah! Validation successful');
    console.log(results);
  }, function(errors) {
    console.log('Oh snap, there were validation errors');
    console.log(errors);
  });
```

API
---

### Creating your model

First set the options for your model, then create a new instance from the data you want to process.

```javascript
var BlogpostModel = new Model(options);
var blogEntry = new BlogpostModel(data);
```

### Validate

Validation is handled by [Validate.js](http://validatejs.org). Specify your validation constraints in `options.validate` when you instantiate your model. To get a list of errors (with synchronous validation):

```javascript
console.log(blogEntry.validate().errors);
```

Custom validator functions can be specified within the `customValidators` field of your Model options. They work per the [Validate.js documentation](http://validatejs.org).

```javascript
customValidators: {
  checkMiss: function(value) {
    var regex = /^Ms\.\s/;
    if(!regex.test(value)) {
      return "oh snap, " + value + " is not a Miss!";
    }
  }
}
```

### Sanitize

Sanitize is handled mostly by [Validator.js](https://github.com/chriso/validator.js). `options.sanitize` is an object where the keys correspond to the data fields you want to process. The value is either an array of operations you want to apply or an object where is key is an operation and the value represents the options for that operation.

```javascript
sanitize: {
  name: ["trim", "toUpperCase"],
  age: "toInt",
  "telephones.home": {prepend: "+1 "},
  "telephones.mobile": {prepend: "+1 "}
}
```

Sanitize functions: (see the [Validator.js documentation](https://github.com/chriso/validator.js))
- toString
- toDate
- toFloat
- toInt
- toBoolean
- trim
- escape
- stripLow
- whiteList
- blackList
- normalizeEmail
- append (string)
- prepend (string)
- toUpperCase
- toLowerCase
- toTitleCase

Custom sanitizer functions can be specified within the `customSanitizers` field of your Model options.

### Whitelist

A list of fields that are allowed to be present in your output data. If the Whitelist option is specified, any field not specifically whitelisted will be removed.

### Blacklist

A list of fields that are not allowed in your output data. Any field specified under blacklist will be removed if present.

### Rename

An object where the keys are the fields you want to rename, and the values are what you want to change them to.

```javascript
rename: {
  username: '_id',
  password: 'token'
}
```

### Static

A list of static fields and their values that will be merged on top of your data.

```javascript
static: {
  type: 'blog_post'
}
```

### Merge

An object that will be merged behind your data.

```javascript
blogEntry.merge(template);
```

### Process

Applies `whitelist`, `blacklist`, `sanitize`, `validate`, `rename`, and `static` in that order based on your options.

### Results

For synchronous use, all of Sofa Model's methods are chained. To get the final results, simply access the `results` property. Note that you need to specifically check the `errors` property to detect validation errors.

For async use the results are returned as each promise resolves. Validation errors will cause the promise to reject.

```javascript
var results = blogEntry.validate().sanitize().results;
```

Changes
---

### 0.2.0 (August 21, 2015)

* **Breaking:** Updated dependencies and there were some breaking changes in [Validate.js](http://validatejs.org), which could cause your models to behave differently. Specifically when you write custom async validators, you must use Promise.resolve(err) instead of reject. See their documentation for details.

### 0.1.0 (March 7, 2015)

* Initial release