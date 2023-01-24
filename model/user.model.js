const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const UserModel = model("UserSchema1", UserSchema);

module.exports = UserModel;
