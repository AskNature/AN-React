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
    var routeNameSingle = 'phenomenon';
    var entityName = 'Phenomena';
    var data = this.props.data;
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
          editable={this.props.editable}
          store={this.props.store}
          actions={this.props.actions}
          media={data.media}
          primarytitle={data.name}
          secondarytitle={''}
          secondarylink=''
          masterid={this.props.masterid}
          primarytitlefield={'headline'} />
        <SubHero
          description={data.description}
          descriptionlink=''
          editable={this.props.editable}
          store={this.props.store}
          actions={this.props.actions}
          editBegin={this.props.editBegin}
          editFinish={this.props.editFinish}
          editCancel={this.props.editCancel}
          onDelete={this.props.onDelete}/>
        <Grid>
          <Row className='show-grid'>
            <Col xs={12} sm={4}>
              <RelationshipList
                items={data.parent}
                editable={this.props.editable}
                onAdd={this.props.onRelationshipAdd.bind(null, 'parent')}
                onRemove={this.props.onRelationshipRemove.bind(null, 'parent')}
                field={'function'}
                routeName='phenomenon'
                title='Parent Phenomenon'
                fieldName='Parent Phenomenon'
                titleField={'name'} />
              <RelationshipList
                items={data.children}
                editable={this.props.editable}
                onAdd={this.props.onRelationshipAdd.bind(null, 'children')}
                onRemove={this.props.onRelationshipRemove.bind(null, 'children')}
                field={'functions'}
                routeName='phenomenon'
                title='Child Phenomena'
                fieldName='Child Phenomena'
                titleField={'name'} />
            </Col>
            <Col xs={12} sm={4}>
              <RelationshipList
                items={data.mechanism}
                editable={this.props.editable}
                onAdd={this.props.onRelationshipAdd.bind(null, 'mechanism')}
                onRemove={this.props.onRelationshipRemove.bind(null, 'mechanism')}
                field={'mechanism'}
                routeName={null}
                title={'Listed as a Mechanism in'}
                fieldName={'Listed as a Mechanism in'}
                titleField={'name'} />
            </Col>
            <Col xs={12} sm={4}>
              <RelationshipList
                items={data.outcome}
                editable={this.props.editable}
                onAdd={this.props.onRelationshipAdd.bind(null, 'outcome')}
                onRemove={this.props.onRelationshipRemove.bind(null, 'outcome')}
                field={'outcome'}
                routeName={null}
                title={'Listed as an Outcome in'}
                fieldName={'Listed as an Outcome in'}
                titleField={'name'} />
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
