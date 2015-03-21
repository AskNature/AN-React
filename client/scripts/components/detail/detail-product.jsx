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
    var routeNameSingle = 'product';
    var entityName = 'Inspired Solutions';
    var data = this.props.data;
    return (
      /* jshint ignore:start */
      <div>
        <AdminBar
          masterid={this.props.masterid}
          routename={routeNameSingle}
          pluralroute={this.props.type}
          entityname={entityName} />
        <CreatorMast
          img="https://lh5.googleusercontent.com/-rybUadmgv5g/AAAAAAAAAAI/AAAAAAAAABA/LDHYA7EFTuI/s120-c/photo.jpg"
          entityname={entityName} />
        <Hero
          editable={this.props.editable}
          store={this.props.store}
          actions={this.props.actions}
          media={data.media}
          primarytitle={data.headline}
          secondarytitle={data.name}
          secondarylink=''
          masterid={this.props.masterid}
          primarytitlefield={'headline'} />
        <SubHero
          first='Concept'
          description={data.company}
          descriptionlink={data.company_website}
          credentials={this.props.user.role === 'admin' ? true : false}
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
                items={data.designedsystems}
                editable={this.props.editable}
                onAdd={this.props.onRelationshipAdd.bind(null, 'designedsystems')}
                onRemove={this.props.onRelationshipRemove.bind(null, 'designedsystems')}
                field={'designedsystems'}
                routeName='design'
                title='Designed Systems'
                fieldName='Designed System'
                titleField={'name'} />
            </Col>
            <Col xs={6} sm={4}>
              <RelationshipList
                items={data.outcomes}
                editable={this.props.editable}
                onAdd={this.props.onRelationshipAdd.bind(null, 'functions')}
                onRemove={this.props.onRelationshipRemove.bind(null, 'functions')}
                field={'functions'}
                routeName='phenomenon'
                title='Outcomes'
                fieldName='Outcome'
                titleField={'name'} />
            </Col>
            <Col xs={12} sm={8}>
              <RelationshipList
                items={data.strategies}
                editable={this.props.editable}
                onAdd={this.props.onRelationshipAdd.bind(null, 'strategies')}
                onRemove={this.props.onRelationshipRemove.bind(null, 'strategies')}
                field={'strategies'}
                routeName='strategy'
                title='Inspired By'
                fieldName='Biological Strategy'
                titleField={'name'} />
            </Col>
          </Row>
        </Grid>
        <Grid>
          <Row>
            <Col xs={12}>
              <Gallery items={data} />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12}>
              {data.special_text || this.props.editable ? (
                <TextArea
                  title='Summary'
                  item={data.special_text}
                  store={this.props.store}
                  actions={this.props.actions}
                  fieldName={'special_text'}
                  editable={this.props.editable}/>
              ) : '' }
            </Col>
            </Row>

          </Grid>
          {this.props.user.role == 'admin' || 'editor' ? (
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
