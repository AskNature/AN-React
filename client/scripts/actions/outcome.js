/**
* Outcome actions
*/
'use strict';

var Dispatcher = require('../dispatchers/default');
var outcomeConstants = require('../constants/outcome');
var outcomeDefaults = require('../constants/defaults').outcome;
var request = require('superagent');
var assign = require('object-assign');

module.exports = {

  /**
  * setOutcome is called by getOutcomes and sends a request to the dispatcher.
  */

  setOutcome: function(outcome) {
    Dispatcher.handleViewAction({
      actionType: outcomeConstants.SET_CURRENT_OUTCOME,
      outcome: assign({}, outcomeDefaults, outcome)
    });
    console.log('setOutcome action returning '+outcome.results.length + ' results.');
  },

  /**
  * getOutcomes is called by the outcomefilter component. It defines the URI
  * that the router uses to pass a request to the controller.
  */

  getOutcomes: function(callback) {
    var self = this;
    request
    .get('/outcome/all')
    .type('json')
    .end(function(res) {
      if (res.ok) {
        if (res) {
          var outcomesData = res.body;
          self.setOutcome(outcomesData);
          console.log(res.body);
        }
        if (callback && callback.success) {
          callback.success(res);
        }
      }
      else {
        if (callback && callback.error) {
          callback.error(res);
        }
      }

      if (callback && callback.complete) {
        callback.complete(res);
      }
    });
  },

};
