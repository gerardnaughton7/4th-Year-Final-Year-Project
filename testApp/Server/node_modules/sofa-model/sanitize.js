var validator = require('validator'),
    utils = require('./utils');

var append = function(data, options) {
  if(typeof data === 'undefined') {
    return;
  }
  var str = '';
  if(typeof options !== 'undefined') {
    str = str + options;
  }
  return data + str;
};

var prepend = function(data, options) {
  if(typeof data === 'undefined') {
    return;
  }
  var str = '';
  if(typeof options !== 'undefined') {
    str = str + options;
  }
  return str + data;
};

var upperCase = function(data) {
  return data.toString().toUpperCase();
};

var lowerCase = function(data) {
  return data.toString().toLowerCase();
};

var titleCase = function(data) {
  return data.toString().replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

var sanitizeFunctions = {
  toString: validator.toString,
  toDate: validator.toDate,
  toFloat: validator.toFloat,
  toInt: validator.toInt,
  toBoolean: validator.toBoolean,
  trim: validator.trim,
  escape: validator.escape,
  stripLow: validator.stripLow,
  whiteList: validator.whiteList,
  blackList: validator.blackList,
  normalizeEmail: validator.normalizeEmail,
  append: append,
  prepend: prepend,
  toUpperCase: upperCase,
  toLowerCase: lowerCase,
  toTitleCase: titleCase
};


var sanitizeField = function(data, fn, options) {
  if(typeof sanitizeFunctions[fn] === 'function') {
    return sanitizeFunctions[fn].call(null, data, options);
  } else {
    throw new Error("Sanitize function " + fn + " doesn't exist.");
  }
};

module.exports = function(doc, settings, sanitizers) {
  // Add any custom sanitize functions that are supplied
  if(typeof sanitizers === 'object') {
    for(var sanitizer in sanitizers) {
      if(sanitizers.hasOwnProperty(sanitizer) && typeof sanitizers[sanitizer] === 'function') {
        sanitizeFunctions[sanitizer] = sanitizers[sanitizer];
      }
    }
  }
  // Process each key listed in the sanitize options
  for (var key in settings) {
    if(settings.hasOwnProperty(key)){
      var thisOp = settings[key];
      var output = utils.getObjectRef(doc, key);
      var opArray, func;
      if(typeof output !== 'undefined') {
        if (utils.isArray(thisOp)) {
          opArray = thisOp;
        } else {
          var arr = [];
          arr[0] = thisOp;
          opArray = arr;
        }
        for(var x=0; x<opArray.length; x++) {
          if(typeof opArray[x] === 'string') {
            func = opArray[x];
            output = sanitizeField(output, func);
          } else if(typeof opArray[x] === 'object') {
            for(var op in opArray[x]) {
              if(opArray[x].hasOwnProperty(op)) {
                func = op;
                output = sanitizeField(output, func, opArray[x][op]);
              }
            }
          }

        }
        utils.setObjectRef(doc, key, output);
      }
    }
  }
  return doc;
};