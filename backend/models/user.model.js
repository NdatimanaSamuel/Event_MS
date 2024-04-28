const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Add Names"],
    },

    email: {
      type: String,
      required: [true, "Please Add Email"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Please Add Phone Number"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please Add Passsword"],
    },
    role: {
      type: String,
      default: "client",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
