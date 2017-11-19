var expect = require('chai').expect;
var model = require('../index');

var testData = {
  name: "Colin ",
  age: "17",
  telephones: {
    home: "123",
    mobile: "456"
  },
  role: "admin",
  rename: "test"
};

var testModelOptions = {
  blacklist: [
    "role"
  ],
  customSanitizers: {
    addMister:  function(data) {
      return "Mr. " + data;
    }
  },
  sanitize: {
    name: ["trim", "toUpperCase", "addMister"],
    age: "toInt",
    "telephones.home": {prepend: "+1 "},
    "telephones.mobile": {prepend: "+1 "}
  },
  customValidators: {
    checkMiss: function(value) {
      var regex = /^Ms\.\s/;
      if(!regex.test(value)) {
        return "oh snap, " + value + " is not a Miss!";
      }
    }
  },
  validate: {
    name: {
      presence: true,
      checkMiss: true
    },
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
  },
  rename: {
    rename: "renamed"
  }
};

describe('Model', function() {

  it('Should behave as expected synchronously', function() {
    var user = new model(testModelOptions);
    var testUser = new user(testData);
    var results = testUser.process().results;
    expect(results.name).to.equal('Mr. COLIN');
    expect(results.age).to.be.a('number');
    expect(results.telephones.home).to.equal('+1 123');
    expect(results.role).to.equal('user');
    expect(testUser.errors).to.have.property('name');
    expect(testUser.errors).to.have.property('age');
    expect(testUser.errors).to.have.property('telephones.work');
    expect(results.renamed).to.equal('test');
    expect(results).not.to.have.property('rename');
  });

  it('Should whitelist objects correctly', function() {
    var options = {
      whitelist: ['name', 'telephones.home']
    };
    var user = new model(options);
    var testUser = new user(testData);
    var results = testUser.whitelist().results;
    expect(results).to.have.property('name');
    expect(results).to.have.deep.property('telephones.home');
    expect(results).to.not.have.property('age');
  });

  it('Should merge the results on top of another object', function() {
    var user = new model(testModelOptions);
    var testUser = new user(testData);
    var original = {
      name: "Bob",
      secret: "don't tell",
      telephones: {
        office: "789"
      }
    };
    var results = testUser.merge(original).results;
    expect(results.name).to.equal("Colin ");
    expect(results.secret).to.equal("don't tell");
    expect(results.telephones.home).to.equal("123");
    expect(results.telephones.office).to.equal("789");
  });

  it('Should behave as expected asynchronously', function(done) {
    testModelOptions.async = true;
    var user = new model(testModelOptions);
    var testUser = new user(testData);
    testUser.process()
      .then(function() {
        throw new Error('Validation promise should have been rejected.');
      }, function(errors) {
        expect(errors).to.have.property('name');
        expect(errors).to.have.property('age');
        expect(errors).to.have.property('telephones.work');
      })
      .finally(function() {
        testUser = new user(testData);
        testUser.sanitize()
          .then(function(results) {
            expect(results.name).to.equal('Mr. COLIN');
            done();
          });
      });
  });

});



