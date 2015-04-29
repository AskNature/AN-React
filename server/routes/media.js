/**
* Media Routes
* Define controllers to call when various routes are received via
* client actions.
*/

'use strict';

var Controller = require('../controllers/media');
var config = require('../config/secrets.json');

var routes = function (app) {
  app.get('/admin/media', Controller.loadindex);
  app.get('/media/:id', Controller.loadindex);

  // API v1
  app.get('/api/media', Controller.returnList1);
  app.get('/api/media/:id', Controller.returnItem1);
  app.post('/api/media/:id', Controller.updateMedia1);

  // API v2
  app.get('/api/v2/media/:id', Controller.returnItem2);
  app.post('/api/v2/media/:id', Controller.updateItem2);
  app.delete('/api/v2/media/:id', Controller.deleteItem2);
  app.post('/api/v2/media', Controller.createItem2);
  app.delete('/api/v2/media', Controller.deleteMultiple2);

  app.use('/s3', require('react-s3-uploader/s3router')({
      bucket: config.s3.bucket,
      getFileKeyDir: function(req) { return 'test' }
  }));
};

module.exports = routes;
