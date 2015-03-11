'use strict';

var IntlMixin         = ReactIntl;
var FormattedMessage  = ReactIntl.FormattedMessage;
var FormattedDate = ReactIntl.FormattedDate;

var TestIntl = React.createClass({
    mixins: [IntlMixin],

  render: function () {
    var yesterday = Date.now() - (1000 * 60 * 60 * 24);
      return (
        /* jshint ignore:start */
        <div>
        <FormattedMessage
                message={this.getIntlMessage('post.meta')}
                num={1000}
                ago="Yesterday" />
              <FormattedDate value={yesterday} />
        </div>
        /* jshint ignore:end */
      );
  }
});

module.exports = TestIntl;
