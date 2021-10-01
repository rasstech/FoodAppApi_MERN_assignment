const mongoose = require("mongoose");

const foodSchema = mongoose.Schema({
  Title: {
    type: String,
  },
  Subtitle: {
    type: String,
  },
  Price: {
    type: String,
  },
  City: {
    type: String,
  },
  IsAvailable: {
    type: Boolean,
    default: false,
  },
});

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;
