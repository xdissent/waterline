var Collection = require('../../../lib/waterline/collection'),
    assert = require('assert');

describe('Collection Query', function() {

  describe('.findAll()', function() {
    var query;

    before(function() {

      // Extend for testing purposes
      var Model = Collection.extend({
        identity: 'user',
        adapter: 'foo',
        attributes: {
          name: {
            type: 'string',
            defaultsTo: 'Foo Bar'
          },
          doSomething: function() {}
        }
      });

      // Fixture Adapter Def
      var adapterDef = { findAll: function(criteria, options, cb) { return cb(null, [{name: 'Foo Bar'}]); }};
      query = new Model({ adapters: { foo: adapterDef }});
    });

    it('should allow options to be optional', function(done) {
      query.findAll({}, function(err, values) {
        assert(!err);
        done();
      });
    });

    it('should return an array', function(done) {
      query.findAll({}, {}, function(err, values) {
        assert(Array.isArray(values));
        done();
      });
    });

    it('should return an instance of Model', function(done) {
      query.findAll({}, {}, function(err, values) {
        assert(typeof values[0].doSomething === 'function');
        done();
      });
    });

  });
});