var mongoose = require('mongoose'), 
Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

var Schemas = {};
Schemas.user = new Schema({
    username    : String,
    displayName    : String,
    email     : String,
    password      : String
});

module.exports = Schemas;

