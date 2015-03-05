'use strict';

var React = require('react');

var ReactIntl = ('react-intl');

var IntlMixin = ReactIntl.IntlMixin;
var FormattedNumber = ReactIntl.FormattedNumber;

var TestIntl = React.createClass({
    mixins: [IntlMixin],

  render: function () {
      return (
        /* jshint ignore:start */
        <div>
          <FormattedNumber value={1000} style="currency" currency="USD" />
        </div>
        /* jshint ignore:end */
      );
  }
});

module.exports = TestIntl;
