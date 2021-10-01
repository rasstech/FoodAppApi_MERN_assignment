const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
  fname: {type: String},
  lname: {type: String},
  email: {
    type: String,
    unique: true,
     validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email");
      }
    },
  },
  username: { type: String },
  phone: { type: Number  },
  city: { type: String},
  password: { type: String  },
  is_active:{type: Boolean}
});

const User = mongoose.model("User", userSchema);

module.exports = User;
