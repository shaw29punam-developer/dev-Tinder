const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    firstName :{
        type: String
    },
    lastName: {
        type: String
    },
    email:{
         type: String
    },
    password: {
        type: String
    },
    age: {
        type: Number
    }
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel