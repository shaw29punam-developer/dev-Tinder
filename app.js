const express = require("express");
const app = express();
const UserModel = require("./src/model/user");
const connectDatabase = require("./src/config");
const bcrypt = require("bcrypt");
const {signUpValidation }= require("./src/utils/validation");
const JWT = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json());

// app.post("/createUser", async (req, res) => {
//     try {
//         const user = new UserModel(req.body);
//         const savedUser = await user.save();
//         res.status(201).json(savedUser);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json(err);
//     }
// });

// app.patch("/updateUser", async (req, res) => {
//     try {
//         const userDetails = req?.body;
//         const userId = userDetails?.userId;
//         console.log("userDetails", userDetails);
//         const ALLOWED_UPDATES = ["userId", "firstName", "lastName","password", "age", "gender", "skills"];
//         const isAllowed = Object.keys(userDetails).every((k) => ALLOWED_UPDATES.includes(k));
//         if (!isAllowed) {
//            throw new Error("Invalid updates");
//         }
//         const user = await UserModel.findOneAndUpdate(
//            { _id: userId },
//             userDetails,
//             {
//                 new: true,
//                 runValidators: true
//             }
//         );
//         res.send(user);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: err.message });
//     }
// });

app.post("/signup", async (req, res) => {
    try{
    const { firstName, lastName, email, password } = req.body;
    signUpValidation(req);
     const user = new UserModel({
        firstName,
        lastName,
        email,
        password: await bcrypt.hash(password, 10)
     });
     await user.save();
     res.send("User created successfully");
    }catch(err){
        res.status(400).send("Error: " + err.message);
    }
});


app.post("/login", async (req, res) => {

 try{
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if(!user) { 
        throw("email not found");
    } else {
          const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        throw("password is incorrect");
    }
    
    const token = await user.generateJWTtoken();
    res.cookie("token", token); //setting token in cookie of response
    
    res.send("Login Successful");
    }
  
 }catch(err){
    console.log("Error: " + err);
    res.status(400).send("Error: " + err);
 }
});

app.post("/profile", async (req, res) => {
    try{
    const { token } = req.cookies;
    const payload = JWT.verify(token, "punam@123");
    const user = await UserModel.findById(payload.id);

    if (!user) {
        throw new Error("User not found");
    }
    res.send(user);
    } catch(err){
        res.status(400).send("Error: " + err);
    }
   
});

const startServer = async () => {
    try {
        await connectDatabase();
        app.listen(7777, () => {
            console.log("server started");
        });
    } catch (err) {
        console.log("db connection failed: " + err);
    }
};

startServer();
