'use strict'

var app = require('../../../server')
var request = require('supertest');

describe('Product API', function() {
    it('should successfully return JSON with a results list', function(done) {
	request(app)
	.get('/api/products')
	.expect(200)
	.expect('Content-Type', /json/)
	.end(function(err, res) {
	    should.not.exist(err);
	    should.exist(res.results);
	    done();
	});
    });
});
