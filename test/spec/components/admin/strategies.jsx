/**
*   Strategy Component Spec Test
*/

/*jshint expr: true*/

'use strict';

var React = require('react');
var StrategyComponent = React.createFactory(require('../../../../client/scripts/components/admin/strategies.jsx'));

describe('Strategy Component', function() {

    var ReactTestUtils;
    var reactRender;

    beforeEach(function() {
        ReactTestUtils = require('react/addons').addons.TestUtils;
        reactRender = ReactTestUtils.renderIntoDocument;
        this.strategyComponent = new StrategyComponent();
    });

    it('provides the "Strategy Component" instance', function() {
        // Expect it to exist
        expect(this.strategyComponent).to.be.ok;
    });

    it('must know the answer to life, the universe, and everything', function() {
        var answer = 42;
        expect(answer).to.equal(42);
    });

});
