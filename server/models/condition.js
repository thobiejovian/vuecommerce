const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConditionSchema = new Schema ({
  type: {type: String, unique: true, required: true}
});

module.exports = mongoose.model("Condition", ConditionSchema);
