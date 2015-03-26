/**
* TopSection (component)
*/
'use strict';

var React = require('react'),

Hero = require('./hero.jsx'),
SubHero = require('./subhero.jsx'),
AdminBar = require('./adminbar.jsx'),
CreatorMast = require('./creatormast.jsx');

var TopSection = React.createClass({
  render: function() {
    return (
      /* jshint ignore:start */
      <div>
        <AdminBar masterid={this.props.data.masterid}
          routename={this.props.routename} pluralroute={this.props.type}
          entityName={this.props.entityName} />
        <CreatorMast
          img='https://lh5.googleusercontent.com/-rybUadmgv5g/AAAAAAAAAAI/AAAAAAAAABA/LDHYA7EFTuI/s120-c/photo.jpg'
          entityname={this.props.entityName} />
        <Hero
          editable={this.props.editable}
          store={this.props.store}
          actions={this.props.actions}
          media={this.props.data.media}
          primarytitle={this.props.primarytitle}
          secondarytitle={this.props.secondarytitle}
          secondarylink={this.props.secondarylink}
          masterid={this.props.masterid} />
        <SubHero
          description={this.props.description}
          descriptionlink={this.props.descriptionlink}
          status={this.props.data.status}
          credentials={this.props.user.role === 'admin' ? true : false}
          editable={this.props.editable}
          store={this.props.store}
          actions={this.props.actions}
          editBegin={this.props.editBegin}
          editFinish={this.props.editFinish}
          editCancel={this.props.editCancel}
          onDelete={this.props.onDelete}
          onRelationshipSet={this.props.onRelationshipSet} />
      </div>
      /* jshint ignore:end */
    );
  }
});

module.exports = TopSection;
