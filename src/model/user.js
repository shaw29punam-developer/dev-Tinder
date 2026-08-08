const mongoose = require('mongoose');
const JWT = require('jsonwebtoken');

let userSchema = new mongoose.Schema({
    firstName :{
        type: String,
         required: true,
    },
    lastName: {
        type: String,
         required: true,
    },
    email:{
         type: String,
         required: true,
         unique: true,
         minLength: 2,
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value){ 
            if(!["male", "female", "others"].includes(value)){
                throw new Error("Invalid gender");
            }
        }
    },
    skills: {
        type: [String],
        minLength: 6
    }
}, {
    timestamps: true
});

userSchema.methods.generateJWTtoken = async function(){
    const token = await JWT.sign({ id: this._id }, "punam@123", { expiresIn: "1h" });
    return token;
}

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel