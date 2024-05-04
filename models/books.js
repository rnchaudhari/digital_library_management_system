const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema(
  {
    isbn: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    currentHolder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      default:null,
    },
    //allocationHistory: [{ UserId: { type: String } }]
  },
  { timestamps: true }
);
const BOOKS = mongoose.model("books", booksSchema);

module.exports = BOOKS;