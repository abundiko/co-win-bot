const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 50
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    phone: {
      type: String,
      required: true
    },
    phone_id: {
      type: String,
      required: true
    },
    fav_club: {
      type: String
    },
    plan: {
      type: String,
      required: true
    },
    pending: {
      type: Boolean,
      default: true
    }
  },
  {
    collection: "users"
  }
);

const UserModel = model("User", UserSchema);

module.exports = UserModel;
