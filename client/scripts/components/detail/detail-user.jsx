'use strict';

var React = require('react'),

Link = require('../modules/link.jsx'),
DefaultLayout = require('../layouts/default.jsx'),
Hero = require('./common/hero.jsx'),
SubHero = require('./common/subhero.jsx'),
AdminBar = require('./common/adminbar.jsx'),
CreatorMast = require('./common/creatormast.jsx'),
TextArea = require('./common/textarea.jsx'),
DataTable = require('./common/datatable.jsx'),
ImageList = require('./common/imagelist.jsx'),
ButtonList = require('./common/edgelists.jsx'),
Gallery = require('./common/gallery.jsx'),
RelationshipList = require('./common/relationshiplist.jsx'),

Panel = require('react-bootstrap/Panel'),
PanelGroup = require('react-bootstrap/PanelGroup'),
Col = require('react-bootstrap/Col'),
Row = require('react-bootstrap/Row'),
Grid = require('react-bootstrap/Grid');

var Template = React.createClass({

  render: function() {
    var routeNameSingle = 'user';
    var entityName = 'Users';
    var data = this.props.data;
    var avatar = 'http://www.asknature.org/images/uploads/user/'+this.props.masterid+'/avatar/lg_avatar.jpg';
    return (
      /* jshint ignore:start */
      <div>
        <AdminBar
          masterid={this.props.masterid}
          routename={routeNameSingle}
          pluralroute={this.props.routeNamePlural}
          entityname={entityName} />
        <CreatorMast
          img="https://lh5.googleusercontent.com/-rybUadmgv5g/AAAAAAAAAAI/AAAAAAAAABA/LDHYA7EFTuI/s120-c/photo.jpg"
          entityname={entityName} />
        <Hero
          editable={false}
          store={this.props.store}
          actions={this.props.actions}
          media={data.media}
          primarytitle={this.props.loaded ? data.first+' '+data.last : '!!!!'}
          secondarytitle={data.name}
          secondarylink=''
          masterid={this.props.masterid}
          innerimage={avatar} />
        <SubHero
          description={data.special_text}
          credentials={this.props.user.role === 'admin' ? true : false}
          editable={this.props.editable}
          store={this.props.store}
          actions={this.props.actions}
          editBegin={this.props.editBegin}
          editFinish={this.props.editFinish}
          editCancel={this.props.editCancel}
          onDelete={this.props.onDelete}
          user />
        <Grid>
          <Row className='show-grid'>
            <Col xs={12} sm={4}>
              <RelationshipList
                items={data.friends}
                titleField='name'
                editable={this.props.editable}
                onAdd={this.props.onRelationshipAdd.bind(null, 'friends')}
                onRemove={this.props.onRelationshipRemove.bind(null, 'friends')}
                field={'friends'}
                routeName='user'
                title='Friends'
                fieldName='Friends' />
            </Col>

          </Row>
        </Grid>
        <Grid>
          <Row>
            <Col xs={12}>
              <Gallery items={data} />
            </Col>
          </Row>
        </Grid>
        {this.props.userrole == 'admin' || 'editor' ? (
          <PanelGroup defaultActiveKey='0' accordion>
            <Panel header='Table View' eventKey='1'>
              <DataTable data={data} />
            </Panel>
          </PanelGroup>
        ) : '' }

    </div>
    /* jshint ignore:end */
    );
  }
});

module.exports = Template;
