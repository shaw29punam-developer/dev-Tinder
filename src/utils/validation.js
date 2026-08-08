const validator = require('validator');
const signUpValidation = (req) => {
    const {firstName, lastName, email, password} = req.body;
    if(!firstName || !lastName) {
        throw new Error("First name and last name are required.");
    }
    if(firstName.length < 3 || firstName.length > 30) {
        throw new Error("First name must be between 3 and 30 characters.");
    }

    if(!validator.isEmail(email)) {
        throw new Error("Invalid email address.");
    } 
    if(!validator.isStrongPassword(password)) {
        throw new Error("password is invalid");
    }
}

module.exports = {
    signUpValidation
}