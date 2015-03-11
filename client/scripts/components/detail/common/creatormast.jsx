/**
* Detail Admin Bar (component)
*/
'use strict';

var React = require('react'),
Link = require('../../modules/link.jsx'),
Avatar = require('react-avatar'),

Panel = require('react-bootstrap').Panel;

var CreatorMast = React.createClass({
  render: function() {
    var avatar = 'http://www.asknature.org/images/uploads/user/'+this.props.userid+'/avatar/lg_avatar.jpg';
    var msec = Date.parse(this.props.timestamp);
    var d = new Date(msec);
    return (
      /* jshint ignore:start */
      <Panel className="nomargin">
        <div className='media'>
          <div className='media-left media-middle'>
            <Link url={'/user/' + this.props.userid}>
              <Avatar name={this.props.displayname} src={avatar} round='true' size='40' />
            </Link>
          </div>
          <div className='media-body media-middle'>
            <Link url={'/user/' + this.props.userid}> <strong> {this.props.displayname}</strong></Link> contributed this <strong>{this.props.entityname}</strong> on {d.toLocaleDateString()}
          </div>
        </div>
      </Panel>
      /* jshint ignore:end */
    );
  }
});

module.exports = CreatorMast;
