var utils = require('../utils');
var expect = require('chai').expect;

describe('Utils', function() {

  var testObject = {};
  
  describe('setObjectRef', function() {
    it('should set a deeply nested property in an object using a string address ', function() {
      utils.setObjectRef(testObject, 'deeply.nested[variable]', ['hello', 'world']);
      expect(testObject.deeply.nested.variable[0]).to.equal('hello');
    });
  });

  describe('getObjectRef', function() {
    it('should retrieve a deeply nested property using a string address', function() {
      var getter = utils.getObjectRef(testObject, 'deeply.nested[variable][1]');
      expect(getter).to.equal('world');
    });
  });

  describe('delObjectRef', function() {
    it('should delete a deeply nested property using a string address', function() {
      var result = utils.delObjectRef(testObject, 'deeply.nested[variable]');
      expect(result).to.equal(true);
      expect(testObject.deeply.nested.variable).to.be.an('undefined');
    });
  });
  
  describe('isArray', function() {
    it('should correctly tell if an object is an array or not', function() {
      var myString = 'test',
          myFunction = function() {
            return null;
          },
          myObject = {test: ['hello']},
          myNumber = 123.456,
          myArray = ['hello', 'world'];
      
      expect(utils.isArray(myString)).to.equal(false);
      expect(utils.isArray(myFunction)).to.equal(false);
      expect(utils.isArray(myObject)).to.equal(false);
      expect(utils.isArray(myNumber)).to.equal(false);
      expect(utils.isArray(myArray)).to.equal(true);
    });
  });
  
});
