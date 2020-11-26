const { DateTime } = require("luxon");
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, maxlength: 100},
    family_name: {type: String, required: true, maxlength: 100},
    date_of_birth: {type: Date, default: Date.now},
    date_of_death: {type: Date, default: Date.now},
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});


// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

// Virtual for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function () {
  return (DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)) + " - " + (DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED))
});


//Export model
module.exports = mongoose.model('Author', AuthorSchema);