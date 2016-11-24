'use strict';

var request = require('request');
var Document = require('./document');

var Legalesign = function(apiUser, apiKey, options) {

  if (!(this instanceof Legalesign)) {
    return new Legalesign(apiUser, apiKey, options);
  }

  var DEFAULT_URL = 'https://legalesign.com/api/v1/';

  var DEFAULT_HEADERS = {
    'Authorization': 'ApiKey ' + apiUser + ':' + apiKey,
    'Content-Type': 'application/json'
  };

  this.getDefaultURL = function() {
    return options.url || DEFAULT_URL;
  };

  this.getDefaultHeaders = function() {
    return options.headers || DEFAULT_HEADERS;
  };

  this.options = options || {};
  this.options.url = this.getDefaultURL();
  this.options.headers = this.getDefaultHeaders();

  // Expose Document object
  this.Document = Document;
};

Legalesign.prototype.resetOptions = function() {
  this.options.json = null;
  this.options.url = this.getDefaultURL();
};

Legalesign.prototype.send = function(document, callback) {
  var callback = callback || function() {};
  this.resetOptions();

  if (document.constructor !== Document) {
    document = new Document(document);
  }
  this.options.url += 'document/';
  this.options.json = document;

  var req = request.post(this.options, function(err, res, body) {
    if (err) {
      return callback(err, null);
    }

    if (body !== 'OK') {
      var message = body;
      if (!body) {
        message = 'Please review Group, Signer(s) and other related document information';
      }
      var error = 'Legalesign Error: ' + message;
      return callback(new Error(error), null);
    }
    return callback(null, body);
  });
};

module.exports = Legalesign;
