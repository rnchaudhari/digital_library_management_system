const mongoose = require("mongoose");

const QuerrySchema = mongoose.Schema({
    emailId:{
        type: String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,

    },
    isAcknoledged:{
        type: Boolean,
        required: true,

    },
    raisedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
    }
},
{timestamps: true}
);

const QUERRY = mongoose.model("queries", QuerrySchema)
module.exports= QUERRY;