/**
* Detail Admin Bar (component)
*/
'use strict';

var React = require('react'),
Link = require('../../modules/link.jsx'),
Avatar = require('react-avatar'),

moment = require('moment'),

Panel = require('react-bootstrap').Panel;

var CreatorMast = React.createClass({
  render: function() {
    // Default User should ultimately be defined somewhere else:
    var name, userid, avatar;

    if(this.props.addedby && this.props.addedby[0]) {
      name = this.props.addedby[0].first ? this.props.addedby[0].first + ' ' + this.props.addedby[0].last : this.props.addedby[0].name;
      userid = this.props.addedby[0].masterid;
      avatar = 'http://www.asknature.org/images/uploads/user/'+userid+'/avatar/lg_avatar.jpg';
    } else {
      name = 'AskNature Team';
      userid = 'asknatureteam';
      avatar = 'https://fbcdn-sphotos-c-a.akamaihd.net/hphotos-ak-xaf1/v/t1.0-9/10383663_869350803096314_2369845013213041061_n.png?oh=2c010ce055331caa73a9506795239fd1&oe=55BDD82A&__gda__=1433772443_f5c43498047b8193dccc0a5554ba6ed1';
    }

    var relTime = this.props.timestamp ? moment(this.props.timestamp, 'YYYY-MM-DD HH:MM:SS').fromNow() : '';
    return (
      /* jshint ignore:start */
      <Panel className="nomargin">
        <div className='media'>
          <div className='media-left media-middle'>
            <Link url={'/1user/' + userid}>
              <Avatar name={name} src={avatar} round size={40} />
            </Link>
          </div>
          <div className='media-body media-middle'>
            <Link url={'/1user/' + userid}> <strong> {name}</strong></Link> contributed this <strong>{this.props.entityname}</strong>  {relTime}
          </div>
        </div>
      </Panel>
      /* jshint ignore:end */
    );
  }
});

module.exports = CreatorMast;
