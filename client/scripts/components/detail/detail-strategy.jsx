'use strict';

var React = require('react'),

Link = require('../modules/link.jsx'),
DefaultLayout = require('../layouts/default.jsx'),

TopSection = require('./common/topsection.jsx'),

TextArea = require('./common/textarea.jsx'),
DataTable = require('./common/datatable.jsx'),
Gallery = require('./common/gallery.jsx'),
RelationshipList = require('./common/relationshiplist.jsx'),

Panel = require('react-bootstrap/Panel'),
PanelGroup = require('react-bootstrap/PanelGroup'),
Col = require('react-bootstrap/Col'),
Row = require('react-bootstrap/Row'),
Grid = require('react-bootstrap/Grid');

var Select = require('react-select');

var Template = React.createClass({

  render: function() {
    var routeNameSingle = 'strategy';
    var entityName = 'Biological Strategies';
    var data = this.props.data;
    var primaryTitle = data.name;
    var secondaryTitle;
    if(primaryTitle.includes(':')) {
        var split = primaryTitle.split(': ');
        primaryTitle = split[0];
        secondaryTitle = split[1];
    }
    var default_avatar = 'https://fbcdn-sphotos-c-a.akamaihd.net/hphotos-ak-xaf1/v/t1.0-9/10383663_869350803096314_2369845013213041061_n.png?oh=2c010ce055331caa73a9506795239fd1&oe=55BDD82A&__gda__=1433772443_f5c43498047b8193dccc0a5554ba6ed1';
    return (
      /* jshint ignore:start */
        <div>
          <TopSection
            {...this.props}
            routename={routeNameSingle}
            entityName={entityName}
            primarytitle={primaryTitle}
            secondarytitle={secondaryTitle}
            secondarylink=''
            description={this.props.data.summary} />
	        <Grid>
  	        <Row className='show-grid'>
  		        <Col xs={12} sm={4}>
                <RelationshipList
                  items={data.living_systems}
                  editable={this.props.editable}
                  titleField='name'
                  onAdd={this.props.onRelationshipAdd.bind(null, 'living_systems')}
                  onRemove={this.props.onRelationshipRemove.bind(null, 'living_systems')}
                  field={'living_systems'}
                  routeName={'living-system'}
                  title={'Living Systems'}
                  fieldName={'Living Systems'}/>
                <RelationshipList
                  items={data.conditions}
                  editable={this.props.editable}
                  titleField='name'
                  onAdd={this.props.onRelationshipAdd.bind(null, 'conditions')}
                  onRemove={this.props.onRelationshipRemove.bind(null, 'conditions')}
                  field={'conditions'}
                  routeName={'condition'}
                  title={'Context'}
                  fieldName={'Context'}/>
      		    </Col>
      		    <Col xs={6} sm={4}>
                <RelationshipList
                  items={data.mechanisms}
                  editable={this.props.editable}
                  titleField='name'
                  onAdd={this.props.onRelationshipAdd.bind(null,'mechanisms')}
                  onRemove={this.props.onRelationshipRemove.bind(null, 'mechanisms')}
                  field={'functions'}
                  routeName={'phenomenon'}
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
                    field={'functions'}
                    routeName={'phenomenon'}
                    title={'Outcomes'}
                    fieldName={'Outcomes'}/>
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
                  {data.brief || this.props.editable ? (
                    <TextArea
                      title='Story'
                      item={data.brief}
                      store={this.props.store}
                      actions={this.props.actions}
                      fieldName={'brief'}
                      editable={this.props.editable} />
                    ) : '' }
                    {data.special_text || this.props.editable ? (
                      <TextArea
                        title='Citations'
                        item={data.special_text}
                        store={this.props.store}
                        actions={this.props.actions}
                        fieldName={'special_text'}
                        editable={this.props.editable} />
                    ) : '' }
                  </Col>
	              </Row>
                <Row className='show-grid'>
		              <Col xs={12} sm={6}>
                    <h6><strong>Your Inspired Ideas</strong></h6>
                    <ul className='media-list'>
                      {data.application_1 ? (
                        <li className='media'>
                          <div className='media-left'>
                            <a href='#'>
                              <img src={default_avatar} alt='Thumb' width='30px' height='30px' className='img-circle media-object' />
                            </a>
                          </div>
                          <div className='media-body'>
                            <p><a href='#'><strong>AskNature Team </strong></a><span dangerouslySetInnerHTML={{__html: data.application_1}} /></p>
                          </div>
                        </li>) : ''
                    }
                    {data.application_2 ? (
                      <li className='media'>
                        <div className='media-left'>
                          <a href='#'>
                            <img src={default_avatar} alt='Thumb' width='30px' height='30px' className='img-circle media-object' />
                          </a>
                        </div>
                        <div className='media-body'>
                          <p><a href='#'><strong>AskNature Team </strong></a><span dangerouslySetInnerHTML={{__html: data.application_2}} /></p>
                        </div>
                      </li>) : ''
                    }
                    {data.application_3 ? (
                      <li className='media'>
                        <div className='media-left'>
                          <a href='#'>
                            <img src={default_avatar} alt='Thumb' width='30px' height='30px' className='img-circle media-object' />
                          </a>
                        </div>
                        <div className='media-body'>
                          <p><a href='#'><strong>AskNature Team </strong></a><span dangerouslySetInnerHTML={{__html: data.application_3}} /></p>
                        </div>
                      </li>) : ''
                    }
                    <li className='media'>
                      <div className='media-left'>
                        <a href='#'>
                          <img src={default_avatar} alt='Thumb' width='30px' height='30px' className='img-circle media-object' />
                        </a>
                      </div>
                      <div className='media-body'>
                        <form>
                          <Input type='text' className='input-sm' placeholder='Share Your Idea...' />
                        </form>
                      </div>
                    </li>
                  </ul>
    				    </Col>
    				    <Col xs={12} sm={6}>
                  <RelationshipList
                    items={data.products}
                    editable={this.props.editable}
                    titleField='headline'
                    subtitleField='name'
                    onAdd={this.props.onRelationshipAdd.bind(null, 'products')}
                    onRemove={this.props.onRelationshipRemove.bind(null, 'products')}
                    field={'products'}
                    routeName={'product'}
                    title={'Inspired Solutions'}
                    fieldName={'Inspired Solution'}/>
    				    </Col>
	            </Row>
        			<Row className='show-grid'>
                <Col xs={12} sm={6}>
                  <RelationshipList
                    items={data.sources}
                    titleField='name'
                    subtitleField='authors'
                    onAdd={this.props.onRelationshipAdd.bind(null, 'sources')}
                    onRemove={this.props.onRelationshipRemove.bind(null, 'sources')}
                    field={'sources'}
                    routeName={'source'}
                    title={'Sources'}
                    fieldName={'Sources'}/>
                </Col>
		            <Col xs={12} sm={6}>
                  <RelationshipList
                    items={data.experts}
                    editable={this.props.editable}
                    titleField='name'
                    subtitleField='institution'
                    onAdd={this.props.onRelationshipAdd.bind(null, 'experts')}
                    onRemove={this.props.onRelationshipRemove.bind(null, 'experts')}
                    field={'experts'}
                    routeName={'researcher'}
                    title={'Researched By'}
                    fieldName={'Researched By'}/>
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
