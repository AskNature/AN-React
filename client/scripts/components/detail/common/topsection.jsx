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
        {this.props.user.role === 'superstar' ? (
          <AdminBar masterid={this.props.data.masterid}
            routename={this.props.routename} pluralroute={this.props.type}
            entityName={this.props.entityName} />
        ): ''}
        <CreatorMast
          img='https://lh5.googleusercontent.com/-rybUadmgv5g/AAAAAAAAAAI/AAAAAAAAABA/LDHYA7EFTuI/s120-c/photo.jpg'
          entityname={this.props.entityName} />
      ) : ''}
        <Hero
          editable={this.props.editable}
          store={this.props.store}
          actions={this.props.actions}
          media={this.props.data.media}
          datatype={this.props.datatype}
          primarytitle={this.props.primarytitle}
          primarydisplay={this.props.primarydisplay}
          secondarytitle={this.props.secondarytitle}
          secondarylink={this.props.secondarylink}
	        name={this.props.data.name}
          masterid={this.props.masterid}
          innerimage={this.props.innerimage} />
        <SubHero
          description={this.props.description}
          descriptionlink={this.props.descriptionlink}
          status={this.props.data.status}
          credentials={this.props.user.role === 'admin' ? true : false}
          editable={this.props.editable}
          store={this.props.store}
          actions={this.props.actions}
          editBegin={this.props.editBegin}
          toggleEditable={this.props.toggleEditable}
          editFinish={this.props.editFinish}
          editCancel={this.props.editCancel}
          onDelete={this.props.onDelete}
          onRelationshipSet={this.props.onRelationshipSet}
          user={this.props.user}
          editorComments={this.props.data.editor_comments}
          flags={{'flagText':this.props.data.flag_text, 'flagMedia':this.props.data.flag_media,'flagTags':this.props.data.flag_tags}} />
      </div>
      /* jshint ignore:end */
    );
  }
});

module.exports = TopSection;
