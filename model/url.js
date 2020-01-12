var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var urlSchema = new Schema({
	originUrl : {type: String, require: true },
	shortenUrl : {type: String, require: true},
	yearMonth : { type: String, require: true }
},{ versionKey: '_somethingElse' })

module.exports = mongoose.model('url',urlSchema);