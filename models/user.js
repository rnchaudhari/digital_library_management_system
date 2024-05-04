const mongoose = require("mongoose");


const userSchema = new mongoose.Schema(
    {
        student_id: {
            type: String,
            required: true,
            unique: true,
        },
        emailId: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        loginPassword: {
            type: String,
            required: true,
        },
        tempaddress: {
            type: String,
            required: true,
        },
        permantAddress: {
            type: String,
            required: true,
        },
        contactNo: {
            type: String,
            required: true,
            unique: true,
        },
        dob: {
            type: Date,
            required: true,
        },
        yearOfStudying: {
            type: String,
            required: true,
        },
        department: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            require: true,
        }
    }
)
const USER = mongoose.model("users", userSchema);

module.exports = USER;

