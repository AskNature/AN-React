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
        {this.props.userdetail ? '' : (
          <CreatorMast
            img='https://lh5.googleusercontent.com/-rybUadmgv5g/AAAAAAAAAAI/AAAAAAAAABA/LDHYA7EFTuI/s120-c/photo.jpg'
            entityname={this.props.entityName}
            timestamp={this.props.data.timestamp}
            added_by={this.props.data.added_by}
            collaborators={this.props.data.collaborators}
            />
        ) }
        <Hero
          editable={this.props.editable}
          store={this.props.store}
          actions={this.props.actions}
          media={this.props.data.media}
          datatype={this.props.data.type}
          label={this.props.label ? this.props.label : this.props.entityName}
          primarytitle={this.props.primarytitle}
          primarykey={this.props.primarykey}
          primarydisplay={this.props.primarydisplay}
          primarylink={this.props.primarylink}
          secondarytitle={this.props.secondarytitle}
          secondarykey={this.props.secondarykey}
          secondarylink={this.props.secondarylink}
	        name={this.props.data.name}
          masterid={this.props.masterid}
          innerimage={this.props.innerimage}
          imgurl={this.props.imgurl}
          description={this.props.description}
          type={this.props.entityName}/>
        <SubHero
          description={this.props.description}
          descriptionlink={this.props.descriptionlink}
          descriptionKey={this.props.descriptionKey}
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
          onRelationshipAdd={this.props.onRelationshipAdd}
          onRelationshipRemove={this.props.onRelationshipRemove}
          onRelationshipSet={this.props.onRelationshipSet}
          onBooleanSet={this.props.onBooleanSet}
          user={this.props.user}
          added_by={this.props.data.added_by}
          collaborators={this.props.data.collaborators}
          editorComments={this.props.data.editor_comments}
          flags={{'flagText':this.props.data.flag_text, 'flagMedia':this.props.data.flag_media,'flagTags':this.props.data.flag_tags, 'flagDemo':this.props.data.flag_demo}}
          type={this.props.entityName}
          />
      </div>
      /* jshint ignore:end */
    );
  }
});

module.exports = TopSection;
