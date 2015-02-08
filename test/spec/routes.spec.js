/**
*   Router Spec Test
*/

/*jshint expr: true*/

'use strict';

var routes = require('../../client/scripts/routes.js');

describe('Routes for router', function() {

    it('provides the "Router" instance', function() {
        // Expect it to exist
        expect(routes).to.be.ok;
    });

});
