/**
*   Outcome Component Spec Test
*/

/*jshint expr: true*/

'use strict';

var React = require('react');
var OutcomeComponent = React.createFactory(require('../../../../client/scripts/components/admin/outcomes.jsx'));

describe('Outcome Component', function() {

    var ReactTestUtils;
    var reactRender;

    beforeEach(function() {
        ReactTestUtils = require('react/addons').addons.TestUtils;
        reactRender = ReactTestUtils.renderIntoDocument;
        this.outcomeComponent = new OutcomeComponent();
    });

    it('provides the "Outcome Component" instance', function() {
        // Expect it to exist
        expect(this.outcomeComponent).to.be.ok;
    });

    it('must know the answer to life, the universe, and everything', function() {
        var answer = 42;
        expect(answer).to.equal(42);
    });

});
