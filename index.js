var request = require('request');
var async = require('async');
var virgo = require('virgo.js');
var config = require('./config');
var identity = require('./lib/identity');


var identityClient = identity.createClient(config.username, config.apiKey);
    accountId = config.accountId;
    
async.series([
  function getIdentityToken(callback) {
    identityClient.getToken(function(err, token) {
      callback(err, token);
    });
  },
], function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Identity token obtained');
});
