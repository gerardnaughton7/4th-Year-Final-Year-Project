var sanitize = require('../sanitize');
var expect = require('chai').expect;

var doc = {
  title: 'Title',
  nested: {
    tag: 'hello'
  }
};

var settings = {
  title: {append: '-x'},
  'nested.tag': [
      {prepend: 'y-'}, 
      {append: '-x' }
    ]
};

describe('sanitize', function() {
  it('Should correctly sanitize fields of the source document', function() {
    var newDoc = sanitize(doc, settings);
    expect(newDoc.title).to.equal('Title-x');
    expect(newDoc.nested.tag).to.equal('y-hello-x');
  });
});




