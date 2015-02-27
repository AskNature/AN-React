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
    var title = this.props.title;
    return (
      <div>
        <h6><strong>{title}</strong></h6>
        <Table striped condensed hover>
            <tbody>
              {
                items.name.map(function(item, i){
                  var link;
                  if(items.id[0]) {
                     link = '../'+ items.routename +'/'+ items.id[i];
                  }
                  return (
                    <tr href="#" key={i}>
                      {properties.livingsystems ? (
                        <td>{items.taxon[i]}: <Link url={link}><i>{item}</i></Link></td>
                      ) : properties.sources ? (
                        <td>{items.year[i]}<br/><Link url={link}><strong>{item}</strong></Link><br/>{items.authors[i]}</td>
                      ) : properties.phenomena ? (
                        <td><Link url={link}>{item}</Link></td>
                      ) : (
                        <td>{item}</td>
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
