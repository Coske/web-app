const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    },
    phoneNumber: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    address: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
});

const User = mongoose.model("User", userSchema);
module.exports.User = User;
