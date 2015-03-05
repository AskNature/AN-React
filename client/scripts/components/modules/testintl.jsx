'use strict';

var IntlMixin         = ReactIntl;
var FormattedMessage  = ReactIntl.FormattedMessage;
var FormattedRelative = ReactIntl.FormattedRelative;

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
              <FormattedRelative value={yesterday} />
        </div>
        /* jshint ignore:end */
      );
  }
});

module.exports = TestIntl;
