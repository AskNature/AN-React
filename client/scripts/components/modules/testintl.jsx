'use strict';

var IntlMixin         = ReactIntl;
var FormattedMessage  = ReactIntl.FormattedMessage;
var FormattedDate = ReactIntl.FormattedDate;

var TestIntl = React.createClass({
    mixins: [IntlMixin],

  render: function () {
    var today = Date.now();
      return (
        /* jshint ignore:start */
        <div>
          <p>Today is <FormattedDate value={today} /></p>
        </div>
        /* jshint ignore:end */
      );
  }
});

module.exports = TestIntl;
