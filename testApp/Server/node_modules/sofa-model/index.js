var validate = require('validate.js'),
    Promise = require('bluebird'),
    merge = require('deepmerge'),
    sanitize = require('./sanitize'),
    utils = require('./utils');

validate.Promise = function(callback) {
  return new Promise(callback);
};

module.exports = function(options) {
  return function(record) {
    var self = this;
    this.results = deepClone(record);
    this.validator = validate;
    this.errors = null;

    var customValidators = options.customValidators || {};
    for(var validator in customValidators) {
      if(customValidators.hasOwnProperty(validator) && typeof customValidators[validator] === 'function') {
        this.validator.validators[validator] = customValidators[validator];
      }
    }

    this.validate = function() {
      if(typeof options.validate !== 'object') {
        return self;
      }
      if(options.async) {
        return new Promise(function(resolve, reject) {
          validate.async(self.results, options.validate, options.valOptions || {})
            .then(function() {
              resolve(self.results);
            }, function(err) {
              self.errors = err;
              reject(err);
            });
        });
      } else {
        self.errors = validate(self.results, options.validate, options.valOptions || {}) || null;
        return self;
      }
    };

    this.sanitize = function() {
      if(options.sanitize) {
        self.results = sanitize(self.results, options.sanitize || {}, options.customSanitizers || {});
      }
      if(options.async) {
        return Promise.resolve(self.results);
      } else {
        return self;
      }
    };

    this.whitelist = function() {
      if(options.whitelist) {
        self.results = whitelist(this.results, options.whitelist);
      }
      if(options.async) {
        return Promise.resolve(self.results);
      } else {
        return self;
      }
    };

    this.blacklist = function() {
      if(options.blacklist) {
        self.results = blacklist(self.results, options.blacklist);
      }
      if(options.async) {
        return Promise.resolve(self.results);
      } else {
        return self;
      }
    };

    this.rename = function() {
      if(options.rename) {
        self.results = rename(self.results, options.rename);
      }
      if(options.async) {
        return Promise.resolve(self.results);
      } else {
        return self;
      }
    };

    this.static = function() {
      if(options.static) {
        self.results = merge(self.results, options.static);
      }
      if(options.async) {
        return Promise.resolve(self.results);
      } else {
        return self;
      }
    };

    this.merge = function(doc) {
      self.results = merge(doc, self.results);
      if(options.async) {
        return Promise.resolve(self.results);
      } else {
        return self;
      }
    };

    this.process = function() {
      if(options.async) {
        return self.whitelist()
          .then(self.blacklist)
          .then(self.sanitize)
          .then(self.validate)
          .then(self.rename)
          .then(self.static);
      } else {
        return self.whitelist()
          .blacklist()
          .sanitize()
          .validate()
          .rename()
          .static();
      }
    };
  };

};

var whitelist = function(doc, list) {
  var results = {};
  for(var item in list) {
    var selected = utils.getObjectRef(doc, list[item]);
    if(typeof selected !== 'undefined') {
      utils.setObjectRef(results, list[item], selected);
    }
  }
  return results;
};

var blacklist = function(doc, list) {
  for(var item in list) {
    var selected = utils.getObjectRef(doc, item);
    if(typeof selected !== 'undefined') {
      utils.delObjectRef(doc, item);
    }
  }
  return doc;
};

var rename = function(doc, list) {
  for(var item in list) {
    var selected = utils.getObjectRef(doc, item);
    if(typeof selected !== 'undefined') {
      utils.setObjectRef(doc, list[item], selected);
      utils.delObjectRef(doc, item);
    }
  }
  return doc;
};

var deepClone = function(obj) {
  return JSON.parse(JSON.stringify(obj));
};
