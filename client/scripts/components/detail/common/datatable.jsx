/**
* Datatable (component)
*/
'use strict';

var React = require('react'),

Link = require('../../modules/link.jsx'),
TextField = require('../../modules/textfield.jsx'),

Table = require('react-bootstrap').Table,
Panel = require('react-bootstrap').Panel,
ButtonToolbar = require('react-bootstrap').ButtonToolbar,
Button = require('react-bootstrap').Button,
Glyphicon = require('react-bootstrap').Glyphicon;

var List = React.createClass({
  render: function() {
    var items = this.props.items;
    return (
      <ul>
        {
          items.map(function(item, i){
            return (
              <li key={i}>{item.name}</li>
            );
          })
        }
      </ul>
    );
  }
});

var DataTable = React.createClass({
  render: function() {
    var items = this.props.data;
    var keys = Object.keys(items);
    var properties = this.props;
    console.log('Items: '+ items);
    return (
      <Table striped responsive condensed hover>
        <thead>
          <th>Field Name</th>
          <th>Field Value</th>
        </thead>
        <tbody>
          {
            keys.map(function(key, i){
              return (
                <tr key={i}>
                  <td>{key}</td>
                  <td>
                    {items[key] instanceof Array ? (
                        <List items={items[key]} />
                      ) : (
                        key !== 'status' ? (
                          <TextField store={properties.store} actions={properties.actions} fieldName={key} initialValue={items[key]} editable={properties.editable}/>
                        ) : (
                          <span>{items[key].masterid}</span>
                        )
                      )
                    }
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </Table>
    );
  }
});

module.exports = DataTable;
