var mongoose = require('mongoose'),
Schema = mongoose.Schema,
ObjectId = Schema.ObjectId,
bcrypt = require('bcrypt-nodejs'),

db = require('./db');

var arkUser = mongoose.model('arkUser', db.user);

module.exports = {
    isNewInstall: function(callback) {
        arkUser.findOne({}, function(err, user) {
            if(user === null) {
                // no users, must be a new install
                callback(false);
            } else {
                callback(true);
            }
        });
    },

    createUser: function(username, password, email, callback) {
        var newuser = new arkUser({
            username    : username,
            email     : "arkadmin@test.com",
            password      : bcrypt.hashSync(password)
    
        });
        newuser.save(function(err, newuser) {
              if(err) callback(false);
              callback(true);
        });
    }
}