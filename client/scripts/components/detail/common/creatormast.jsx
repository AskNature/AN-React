/**
* Detail Admin Bar (component)
*/
'use strict';

var React = require('react'),
Link = require('../../modules/link.jsx'),
Avatar = require('react-avatar'),

moment = require('moment'),

DropdownButton = require('react-bootstrap').DropdownButton,
MenuItem = require('react-bootstrap').MenuItem,
OverlayTrigger = require('react-bootstrap').OverlayTrigger,
Popover = require('react-bootstrap').Popover,
Panel = require('react-bootstrap').Panel;

var Colabs = React.createClass({
  render: function() {

    return(
      <div>
      {this.props.colabs.map(function(colab, i){
        var avatar = colab.custom_avatar_url ? colab.custom_avatar_url : 'http://www.asknature.org/images/uploads/user/'+colab.masterid+'/avatar/lg_avatar.jpg';
        return (
          <MenuItem eventKey={'1.'+i}>
            <Link url={'/1user/' + colab.masterid}>
            <div className='media'>
              <div className='media-left media-middle'>
                  <Avatar name={name} src={avatar} round size={30} />
              </div>
              <div className='media-body media-middle'>
                <h6>
                    <strong> {colab.first ? colab.first + ' ' + colab.last : colab.name}</strong>
                </h6>
              </div>
            </div>
            </Link>
          </MenuItem>
        );
      })}
    </div>
    );
  }
});

var CreatorMast = React.createClass({
  render: function() {
    // Default User should ultimately be defined somewhere else:
    var name, userid, avatar;

    if(this.props.added_by && this.props.added_by[0]) {
      name = this.props.added_by[0].first ? this.props.added_by[0].first + ' ' + this.props.added_by[0].last : this.props.added_by[0].name;
      userid = this.props.added_by[0].masterid;
      avatar = this.props.added_by[0].custom_avatar_url ? this.props.added_by[0].custom_avatar_url : 'http://www.asknature.org/images/uploads/user/'+userid+'/avatar/lg_avatar.jpg';
    } else {
      name = 'AskNature';
      userid = 'asknature';
      avatar = 'https://fbcdn-sphotos-c-a.akamaihd.net/hphotos-ak-xaf1/v/t1.0-9/10383663_869350803096314_2369845013213041061_n.png?oh=2c010ce055331caa73a9506795239fd1&oe=55BDD82A&__gda__=1433772443_f5c43498047b8193dccc0a5554ba6ed1';
    }

    var relTime = this.props.timestamp ? moment(this.props.timestamp, 'YYYY-MM-DD HH:mm:ss').fromNow() : '';
    var tooltip = <Popover>This is a test</Popover>;
    return (
      /* jshint ignore:start */
      <Panel className="nomargin creator-mast">
        <div className='media'>
          <div className='media-left media-middle'>
            <Link url={'/1user/' + userid}>
              <Avatar name={name} src={avatar} round size={40} />
            </Link>
          </div>
          <div className='media-body media-middle'>
            <h6>
            <Link url={'/1user/' + userid}>
              <strong> {name}</strong>
            </Link>
            {this.props.collaborators && this.props.collaborators[0] ? (
              <span> and {' '}
                <DropdownButton
                  eventKey={1}
                  bsStyle='link'
                  noCaret
                  title={
                    this.props.collaborators.length > 1 ? (
                      ' ' + this.props.collaborators.length + 'collaborators'
                    ) : (
                      'one collaborator'
                    )
                  }
                  navItem={true}>
                  <Colabs colabs={this.props.collaborators} />
                </DropdownButton>
                {' '}
              </span>
            ) : ' '}
              contributed this <strong>{this.props.entityname}</strong>  {relTime}
              </h6>
          </div>
        </div>
      </Panel>
      /* jshint ignore:end */
    );
  }
});

module.exports = CreatorMast;
