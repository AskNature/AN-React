'use strict';

var React = require('react'),

Link = require('../modules/link.jsx'),
DefaultLayout = require('../layouts/default.jsx'),

TopSection = require('./common/topsection.jsx'),

TextArea = require('./common/textarea.jsx'),
Gallery = require('./common/gallery.jsx'),
RelationshipList = require('./common/relationshiplist.jsx'),

Col = require('react-bootstrap/Col'),
Row = require('react-bootstrap/Row'),
Grid = require('react-bootstrap/Grid');

var Select = require('react-select');

var Template = React.createClass({

  // This is causing relationshiplist changes to be hidden until update button is clicked:
  /* shouldComponentUpdate: function(nextProps, nextState) {
    if(nextProps.masterid !== this.props.masterid || nextProps.editable !== this.props.editable || nextProps.loaded !== this.props.loaded) {
      return true;
    } else {
      return false;
    }
  },*/
  render: function() {
    var routeNameSingle = 'story';
    var entityName = 'Story';
    var data = this.props.data;
    var primaryKey = 'name';
    var primaryTitle = data[primaryKey];
    var descriptionKey = 'description';
    var addedby = data.added_by;
    var default_avatar = 'https://fbcdn-sphotos-c-a.akamaihd.net/hphotos-ak-xaf1/v/t1.0-9/10383663_869350803096314_2369845013213041061_n.png?oh=2c010ce055331caa73a9506795239fd1&oe=55BDD82A&__gda__=1433772443_f5c43498047b8193dccc0a5554ba6ed1';
    return (
      /* jshint ignore:start */
        <div>
          <TopSection
            {...this.props}
            routename={routeNameSingle}
            entityName={entityName}
            primarytitle={data[primaryKey]}
            primarydisplay={primaryTitle}
            primarykey={primaryKey}
            description={data[descriptionKey]}
            descriptionKey={descriptionKey}
            />
	        <Grid>
  	        <Row className='show-grid'>
  		        <Col xs={12} sm={4}>
                <RelationshipList
                  items={data.bsystems}
                  editable={this.props.editable}
                  titleField={'name'}
                  onAdd={this.props.onRelationshipAdd.bind(null, 'bsystems')}
                  onRemove={this.props.onRelationshipRemove.bind(null, 'bsystems')}
                  field={'b.system'}
                  routeName={'b.system'}
                  title={'Biological Systems'}
                  fieldName={'Biological Systems'}/>
                  <RelationshipList
                    items={data.dsystems}
                    editable={this.props.editable}
                    titleField={'name'}
                    onAdd={this.props.onRelationshipAdd.bind(null, 'dsystems')}
                    onRemove={this.props.onRelationshipRemove.bind(null, 'dsystems')}
                    field={'d.system'}
                    routeName={'d.system'}
                    title={'Designed Systems'}
                    fieldName={'Designed Systems'}/>
                <RelationshipList
                  items={data.contexts}
                  editable={this.props.editable}
                  titleField='name'
                  onAdd={this.props.onRelationshipAdd.bind(null, 'contexts')}
                  onRemove={this.props.onRelationshipRemove.bind(null, 'contexts')}
                  field={'context'}
                  routeName={'context'}
                  title={'Contexts'}
                  fieldName={'Contexts'}/>
      		    </Col>
      		    <Col xs={6} sm={4}>
                <RelationshipList
                  items={data.mechanisms}
                  editable={this.props.editable}
                  titleField='name'
                  onAdd={this.props.onRelationshipAdd.bind(null,'mechanisms')}
                  onRemove={this.props.onRelationshipRemove.bind(null, 'mechanisms')}
                  field={'fm'}
                  routeName={'fm'}
                  title={'Mechanisms'}
                  fieldName={'Mechanisms'}/>
        		    </Col>
        		    <Col xs={6} sm={4}>
                  <RelationshipList
                    items={data.functions}
                    editable={this.props.editable}
                    titleField='name'
                    onAdd={this.props.onRelationshipAdd.bind(null, 'functions')}
                    onRemove={this.props.onRelationshipRemove.bind(null, 'functions')}
                    field={'fm'}
                    routeName={'fm'}
                    title={'Functions'}
                    fieldName={'Functions'}/>
        		    </Col>
          		</Row>
       	    </Grid>
  	        <Grid>
			        <Row>
		            <Col xs={12}>

                    <Gallery items={data} />
                      {this.props.editable ? (
                        <RelationshipList
                          items={data.media}
                          editable={this.props.editable}
                          titleField='name'
                          onAdd={this.props.onRelationshipAdd.bind(null, 'media')}
                          onRemove={this.props.onRelationshipRemove.bind(null, 'media')}
                          field={'media'}
                          routeName={'media'}
                          title={'Media'}
                          fieldName={'Media'}
                          media />
                      ) : '' }

	              </Col>
              </Row>
              <Row>

	              </Row>
                <Row className='show-grid'>
		              <Col xs={12} sm={6}>
                    <RelationshipList
                      items={data.bstrategy}
                      editable={this.props.editable}
                      titleField='name'
                      onAdd={this.props.onRelationshipAdd.bind(null, 'bstrategy')}
                      onRemove={this.props.onRelationshipRemove.bind(null, 'bstrategy')}
                      field={'b.strategy'}
                      routeName={'b.strategy'}
                      title={'Biological Strategies'}
                      fieldName={'Biological Strategies'}/>
    				    </Col>
    				    <Col xs={12} sm={6}>
                  <RelationshipList
                    items={data.dstrategy}
                    editable={this.props.editable}
                    titleField='headline'
                    subtitleField='name'
                    onAdd={this.props.onRelationshipAdd.bind(null, 'dstrategy')}
                    onRemove={this.props.onRelationshipRemove.bind(null, 'dstrategy')}
                    field={'d.strategy'}
                    routeName={'d.strategy'}
                    title={'Bio-inspired Strategies'}
                    fieldName={'Bio-inspired Strategies'}/>
    				    </Col>
	            </Row>
        			<Row className='show-grid'>
                <Col xs={12} sm={6}>

                    <RelationshipList
                      items={data.source}
                      editable={this.props.editable}
                      titleField='name'
                      subtitleField='authors'
                      onAdd={this.props.onRelationshipAdd.bind(null, 'source')}
                      onRemove={this.props.onRelationshipRemove.bind(null, 'source')}
                      field={'source'}
                      routeName={'source'}
                      title={'Referenced Sources'}
                      fieldName={'Referenced Sources'}/>
                </Col>
		            <Col xs={12} sm={6}>
                  <RelationshipList
                    items={data.team}
                    editable={this.props.editable}
                    titleField='name'
                    subtitleField='institution'
                    onAdd={this.props.onRelationshipAdd.bind(null, 'team')}
                    onRemove={this.props.onRelationshipRemove.bind(null, 'team')}
                    field={'researcher'}
                    routeName={'researcher'}
                    title={'Referenced R&D Teams'}
                    fieldName={'Referenced R&D Teams'} />
          			</Col>
        			</Row>
			    </Grid>

        </div>
      /* jshint ignore:end */
    );
  }
});

module.exports = Template;