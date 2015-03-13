/**
* Detail Edge Lists (component)
*/
'use strict';

var React = require('react'),

Link = require('../../modules/link.jsx'),

Table = require('react-bootstrap').Table,
Row = require('react-bootstrap').Row,
Col = require('react-bootstrap').Col;

var List = React.createClass({
  render: function() {
    var properties = this.props;
    var items = this.props.items;
    var routename = this.props.routename;
    var title = this.props.title;
    return (
      <div>
        <h6><strong>{title}</strong></h6>
        <Table striped condensed hover>
            <tbody>
              {
                items.map(function(item, i){
                  var link;
                  if(item.masterid) {
                     link = '../'+ routename +'/'+ item.masterid;
                  }
                  return (
                    <tr href="#" key={i}>
                      {properties.livingsystems ? (
                        <td>{item.taxon}: <Link url={link}><i>{item.name}</i></Link></td>
                      ) : properties.sources ? (
                        <td>{item.publication_year}<br/><Link url={link}><strong>{item.name}</strong></Link><br/>{item.authors}</td>
                      ) : properties.phenomena ? (
                        <td><Link url={link}>{item.name}</Link></td>
                      ) : (
                        <td>{item.name}</td>
                      )}
                    </tr>
                  );
                })
              }
            </tbody>
        </Table>
      </div>
    );
  }
});

module.exports = List;
