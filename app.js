const express = require("express");
const app = express();
// const UserModel = require("./src/model/user");



const connectDatabase = require("./src/config");


connectDatabase().then(() => {
    console.log("database connected");
    app.listen('7777', () => {
         console.log("server started");
    })
}).catch((err) => {
    console.log("db connection failed" + err);
});


// app.use(express.json());  ///serve can't read the json object coming from client

// app.post("/createUser", async(req,res) => {
//     const userDetails = req.body;
//     const user = new UserModel(userDetails);
   
//     try{
//          let user = await user.save();
//         res.send(user);
//     }catch(err) {
//         res.send("create user api is failing")
//     } 
// })

// app.patch("/updateUser", (req,res) => {
//     const userDetails = req.body;
    
//     try{
//         const user =  UserModel.findOneAndUpdate('email', userDetails)
//         res.send(user);
//     }catch(err) {
//         res.send("create user api is failing")
//     } 
// })
