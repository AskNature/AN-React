/**
*   Producttable Component Spec Test
*/

/*jshint expr: true*/

'use strict';

var React = require('react');
var ProducttableComponent = React.createFactory(require('../../../../client/scripts/components/modules/producttable.jsx'));

describe('Producttable Component', function() {

    var ReactTestUtils;
    var reactRender;

    beforeEach(function() {
        ReactTestUtils = require('react/addons').addons.TestUtils;
        reactRender = ReactTestUtils.renderIntoDocument;
        this.producttableComponent = new ProducttableComponent();
    });

    it('provides the "Producttable Component" instance', function() {
        // Expect it to exist
        expect(this.producttableComponent).to.be.ok;
    });

});
