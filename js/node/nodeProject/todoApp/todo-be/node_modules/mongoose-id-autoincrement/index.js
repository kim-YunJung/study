const mongoose = require('mongoose');
const incrementSchema = new mongoose.Schema({
  model: String,
  count: Number
});
var Increment;
exports.initialize = function (connection) {
  try {
    Increment = connection.model('Increment');
  } catch (ex) {
    if (ex.name === 'MissingSchemaError') {
      Increment = connection.model('Increment', incrementSchema);
    }
    else
      throw ex;
  }
};

exports.plugin = function(schema, options) {
  if (!incrementSchema || !Increment) throw new Error("mongoose-id-autoincrement has not been initialized");

  var settings = {
    model: null, // The model to configure the plugin for.
    field: '_id', // The field the plugin should track.
    unique: true // Should we create a unique index for the field
  },

  settings = options;

  const model = settings.model;
  fields = {}, 
  fields[settings.field] = {
    type: Number,
    require: true
  };
  fields[settings.field].unique = settings.unique;
  schema.add(fields);

  schema.pre('save', function (next) {
    const user = this;
    if (user.isNew) {
      Increment.findOneAndUpdate(
        { model: model },
        { $inc: { count: 1 } },
        { new: true, upsert: true }
      ).then((increment) => {

        user.unique_id = increment.count;
        next();
      });
    } else {
      next();
    }
  });
}

