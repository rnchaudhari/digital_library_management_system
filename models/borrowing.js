const mongoose = require("mongoose");

const borrowingSchema = new mongoose.Schema({
    borrowedBook:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "books",
      required: true,
    },
    borrowedBy:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"users",
      required: true,
    },
    returnDate:{
      type:Date,
    },
    borrowDate:{
      type:Date,
    },
    isReturned:{
      type:Boolean,
    }
},
    { timestamps: true }

)
const BORROWING= mongoose.model("borrowings",borrowingSchema );

//module.exports = BORROWING;