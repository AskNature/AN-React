'use strict';

var React = require('react'),

Link = require('../modules/link.jsx'),
DefaultLayout = require('../layouts/default.jsx'),

TopSection = require('./common/topsection.jsx'),

RelationshipList = require('./common/relationshiplist.jsx'),
Gallery = require('./common/gallery.jsx'),

Col = require('react-bootstrap/Col'),
Row = require('react-bootstrap/Row'),
Grid = require('react-bootstrap/Grid');

var Template = React.createClass({

  render: function() {
    var routeNameSingle = '1user';
    var entityName = 'Original User';
    var data = this.props.data;
    var fullname;
    if(this.props.loaded) {
      fullname = data.first+' '+data.last;
    }
    var secondaryKey = 'name';
    var descriptionKey = 'special_text';
    var avatar = data.custom_avatar_url && data.custom_avatar_url !== 'null' ? data.custom_avatar_url : data.masterid ?  'http://www.asknature.org/images/uploads/user/'+data.masterid+'/avatar/lg_avatar.jpg' : '';
    return (
      /* jshint ignore:start */
      <div>
        <TopSection
          {...this.props}
          routename={routeNameSingle}
          entityName={entityName}
          primarytitle={fullname}
          secondarytitle={data[secondaryKey]}
          secondarykey={secondaryKey}
          description={data[descriptionKey]}
          descriptionKey={descriptionKey}
          innerimage={avatar}
          userdetail={true}
          />
          <Grid>
            <Row>

              <Col xs={12}>

                  <Gallery items={data} title={data.name} windowHeight={this.props.windowHeight}/>
                    {this.props.editable ? (
                      <RelationshipList
                        items={data.media}
                        editable={this.props.editable}
                        titleField='name'
                        onAdd={this.props.onRelationshipAdd.bind(null, 'media')}
                        onRemove={this.props.onRelationshipRemove.bind(null, 'media')}
                        field={'media'}
                        routeName={'media'}
                        title={'Personal Gallery'}
                        fieldName={'Media'}
                         />
                    ) : '' }

              </Col>
              <Col xs={12} sm={6}>
                <RelationshipList
                  items={data.bookmarked}
                  editable={false}
                  field='content'
                  title='Bookmarked'
                  fieldName='bookmarked'
                  titleField='name' />
              </Col>
              <Col xs={12} sm={6}>
                <RelationshipList
                  items={data.friends}
                  editable={false}
                  titleField='name'
                  onAdd={this.props.onRelationshipAdd.bind(null, 'friends')}
                  onRemove={this.props.onRelationshipRemove.bind(null, 'friends')}
                  field={'Users'}
                  routeName={'1user'}
                  title={'Friends'}
                  fieldName={'Friends'}
                   />
              </Col>
              <Col xs={12}>
                <RelationshipList
                  items={data.added_content}
                  editable={false}
                  titleField='name'
                  onAdd={this.props.onRelationshipAdd.bind(null, 'added_content')}
                  onRemove={this.props.onRelationshipRemove.bind(null, 'added_content')}
                  field={'media'}
                  routeName={'media'}
                  title={'Contributed Content'}
                  fieldName={'Content'}
                   />
              </Col>
              <Col xs={12}>
                <RelationshipList
                  items={data.added_media}
                  editable={false}
                  titleField='name'
                  onAdd={this.props.onRelationshipAdd.bind(null, 'added_media')}
                  onRemove={this.props.onRelationshipRemove.bind(null, 'added_media')}
                  field={'media'}
                  routeName={'media'}
                  title={'Contributed Media'}
                  fieldName={'Media'}
                   />
              </Col>

            </Row>
          </Grid>
    </div>
    /* jshint ignore:end */
    );
  }
});

module.exports = Template;
