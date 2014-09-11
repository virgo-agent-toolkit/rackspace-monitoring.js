var constants = {};

var prefix = 'agent-endpoint-';
var uri = '.monitoring.api.rackspacecloud.com';

constants.dfw = prefix + 'dfw' + uri;
constants.ord = prefix + 'ord' + uri;
constants.iad = prefix + 'iad' + uri;

module.exports = constants;
