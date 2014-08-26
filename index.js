var request = require('request');
var async = require('async');
var virgo = require('virgo.js');
var config = require('./config');
var identity = require('./lib/identity');


var identityClient = identity.createClient(config.username, config.apiKey);
    accountId = config.accountId,
    agentServiceApiUrl = 'https://monitoring.api.rackspacecloud.com/v1.0/' + accountId + '/agent_tokens',
    agentLabel = 'virgo-js-agent';

async.auto([
  function getIdentityToken(callback) {
    identityClient.getToken(function(err, token) {
      callback(err, token);
    });
  },

  function createAgentTokenIfNoneExists(callback) {
    function filterByVirgoAgentLabel(agentToken) {
      return agentToken.label == agentLabel;
    }

    identityClient.sendAuthenticatedApiRequest(agentServiceApiUrl, "GET", {}, function(err, agentTokenList) {
      var virgoJsAgents;
      
      if (agentTokenList.values) {
        virgoJsAgents = agentTokenList.values.filter(filterByVirgoAgentLabel);
      } else if (!virgoJsAgents) {
        identityClient.sendAuthenticatedApiRequest(agentServiceApiUrl, "POST", {label: agentLabel}, callback);
      } else {
        callback(err);
      }
    });
  },
], function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Identity token obtained');
  console.log('Agent token obtained');
});