/**
 * Access nested JavaScript objects with string key
 * http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key
 *
 * @param {object} obj The base object you want to get a reference to
 * @param {string} str The string addressing the part of the object you want
 * @return {object|undefined} a reference to the requested key or undefined if not found
 */

exports.getObjectRef = function(obj, str) {
  str = str.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  str = str.replace(/^\./, '');           // strip a leading dot
  var pList = str.split('.');
  while (pList.length) {
    var n = pList.shift();
    if (n in obj) {
      obj = obj[n];
    } else {
      return;
    }
  }
  return obj;
};

/**
 * Dynamically set property of nested object
 * http://stackoverflow.com/questions/18936915/dynamically-set-property-of-nested-object
 *
 * @param {object} obj The base object you want to set the property in
 * @param {string} str The string addressing the part of the object you want
 * @param {*} val The value you want to set the property to
 */

exports.setObjectRef = function(obj, str, val) {
  str = str.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  str = str.replace(/^\./, '');           // strip a leading dot
  var pList = str.split('.');
  var len = pList.length;
  for(var i = 0; i < len-1; i++) {
    var elem = pList[i];
    if( !obj[elem] ) {
      obj[elem] = {};
    }
    obj = obj[elem];
  }
  obj[pList[len-1]] = val;
};

/**
 * Dynamically delete property of nested object
 *
 * @param {object} obj The base object you want to set the property in
 * @param {string} str The string addressing the part of the object you want
 * @return {boolean} true if successful
 */

exports.delObjectRef = function(obj, str) {
  str = str.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  str = str.replace(/^\./, '');           // strip a leading dot
  var pList = str.split('.');
  var len = pList.length;
  for(var i = 0; i < len-1; i++) {
    var elem = pList[i];
    if( !obj[elem] ) {
      return false;
    }
    obj = obj[elem];
  }
  delete obj[pList[len-1]];
  return true;
};

/**
 * Detect if an Object is an Array
 * http://stackoverflow.com/questions/18936915/dynamically-set-property-of-nested-object
 *
 * @param {object} obj The object you want to check
 * @return {boolean} True if the object is an array, false otherwise
 */

exports.isArray = function(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
};



