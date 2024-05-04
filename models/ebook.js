const mongoose = require("mongoose");

const eBookSechema = new mongoose.Schema({
    isbn: {
        type: Number,
        required: true,
        unique: true,
      },
      title: {
        type: String,
        required: true,
        unique: false
      },
      author: {
        type: String,
        required: true,
        unique: false
      }
},
    { timestamps: true }

)
const eBOOK = mongoose.model("eBooks", eBookSechema);

module.exports = eBOOK;