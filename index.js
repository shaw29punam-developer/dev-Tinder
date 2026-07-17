
const express = require("express");
const {userAuth, adminAuth} = require("./middleware/auth");

const app = express();
app.listen("7777", () => {
    console.log("connected devtinder server");
});


app.use("/admin", adminAuth);
app.get("/admin", (req, res) => {
    res.send("it is admin flow");
})

app.get("/admin/details", (req, res) => {
    res.send("get the admin data");
});
app.get("/admin/role", (req, res) => {
    throw new Error("some thing went wrong")
});


app.get("/admin", (err, req, res, next) => {
    if(err) {
        res.status(500).send(err);
    }
})




app.get("/user", userAuth, (req, res) => {
    res.send("user flow");
})


app.get("/user/login", userAuth, (req, res) => {
    res.send("user got loggedIn");
})

app.get("/user/logout", (req, res) => {
    res.send("user got logged out");
})






app.get("/new",
    (req, res, next) => {
        console.log("1st route handler");
        next();
    },
    [
        (req, res, next) => {
        console.log("2nd route handler");
        next();
    }
    ],
     (req, res, next) => {
        console.log("3rd route handler");
        next();
    },
     (req, res, next) => {
        console.log("4th route handler");
        res.send("4th route")
    }


),

app.get("/new",(req, res) => {
   console.log("1st route handler");
   next();
});
app.get("/new",(req, res) => {
   console.log("1st route handler");
   next();
});


app.get("/user/:userId", (req, res) => {
    console.log(req.query);
    res.send("Hi I am new user");
});
app.post("/user", (req, res) => {
    res.send("user is craeted");
})
app.delete("/user", (req, res) => {
    res.send("Hi , user is deleted");
})
app.put("/user", (req, res) => {
    res.send("Hi user is updated");
})
app.patch("/user", (req, res) => {
    res.send("Hi some info has been updated");
});


//supported by express 5
app.use(/ab+c/, (req, res) => {
    res.send("welcome to Dev Tinder");
});  








