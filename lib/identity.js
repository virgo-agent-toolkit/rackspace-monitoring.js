var request = require('request');

var clients = {};

// Using London test account, this will be un-hardcoded.
var AUTH_URL = 'https://identity.api.rackspacecloud.com/v2.0/tokens';
var EXPIRATION_BUFFER = 60 * 1000; // One minute in milliseconds


/**
 * Client for handling identity with Rackspace Cloud.
 * @param {String} username The username to auth as.
 * @param {String} apiKey The password to auth with.
 */
var IdentityClient = function(username, apiKey) {
  this.username = username;
  this.apiKey = apiKey;
  this.token = null;
  this.tokenExpires = Date.now();
};


/**
 * Returns an auth token. If the cached token is expired, get a new one.
 * @param {Function} callback expects (err, token).
 */
IdentityClient.prototype.getToken = function(callback) {
  if (this.token && Date.now() < this.tokenExpires) {
    callback(null, this.token);
    return;
  } else {
    this._updateToken(function(err, token) { 
      callback(err, token);   
    });
  }
};


/**
 * Gets a new auth token and sets expiration.
 * @param {Function} callback Expects (err, token).
 */
IdentityClient.prototype._updateToken = function(callback) {
  var self = this,
      tokenPayload = {};

  tokenPayload = {
    "auth": {
      "RAX-KSKEY:apiKeyCredentials": {
        "username": this.username,
        "apiKey": this.apiKey
      },
    }
  };

  request.post(AUTH_URL, {"json": tokenPayload}, function(err, response, body) {
    if (err) {
      callback(err);
      return;
    }

    if (!body.hasOwnProperty('access')) {
      callback(body);
      return;
    }    

    self.token = body.access.token.id;
    self.tokenExpires = Date.parse(body.access.token.expires).valueOf() - EXPIRATION_BUFFER;
    callback(null, self.token);
  });
};


/**
 * Send a request
 * 
 * @param {String} requestUrl url for resource
 * @param {String} method HTTP request method
 * @param {Object} payload json data to send to API
 * @param {Function} callback expects callback(err, ticketResult).
 */
IdentityClient.prototype.sendAuthenticatedApiRequest = function(requestUrl, method, payload, callback) {
  var headers,
      requestOptions;
  
  headers = {
    "X-Auth-Token": this.token,
    "Content-Type": 'application/json'
  };

  payload = payload || {};
  requestOptions = {
    url: requestUrl,
    headers: headers,
    method: method,
    json: payload
  };
 
  request(requestOptions, function(error, response, body) {
    callback(error, body);
  });
};


/**
 * Create identity managing
 * 
 * @param {String} username cloud username
 * @param {String} apiKey apikey for cloud control
 */
exports.createClient = function(username, apiKey) {
  var client = clients[username];

  if (!client) {
    client = new IdentityClient(username, apiKey);
    clients[username] = client;
  }
  return client;
};
