// Ark config
var config = {};

// User config starts here

// Database
config.dbconnect = 'mongodb://127.0.0.1/ark';

// Session
config.sessionkey = 'changemes';

// Port
// Must be above 1000 when not running as root
// running Ark as root is a really bad idea. use nginx or another
// reverse proxy to use standard ports like 80 and to use SSL at all
config.port = '3000';

// User config ends here
// enjoy Ark

module.exports = config;