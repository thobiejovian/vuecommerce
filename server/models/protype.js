const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProtypeSchema = new Schema ({
  type: {type: String, unique: true, required: true}
});

module.exports = mongoose.model("Protype", ProtypeSchema);
