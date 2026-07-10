const express = require("express");

const app = express();


app.use("/", (req, res) => {
    res.send("welcome to Dev Tinder");
});

app.listen("7777", () => {
    console.log("connected tpo server");
});

