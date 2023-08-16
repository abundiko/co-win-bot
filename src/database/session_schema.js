const { Schema, model } = require("mongoose");

const SessionSchema = new Schema(
  {
    _id: { type: String },
    name: { type: String },
    data: { type: Schema.Types.Mixed, default: {} }
  },
  {
    collection: "session"
  }
);

module.exports = model("Session", SessionSchema);
