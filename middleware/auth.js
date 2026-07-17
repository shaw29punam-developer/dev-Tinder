const userAuth =(req, res, next) => {
    let token = "abc";
    if(token == "xy") {
        console.log("user is authrized");
        next();
    } else {
        res.status(401).send("user is not authorized");
    }
}


const adminAuth =(req, res, next) => {
    let token = "xyz";
    if(token === "xyz") {
        console.log("admin is authrized");
        next();
    } else {
        res.status(401).send("admin is not authorized");
    }
}

module.exports = {
    userAuth,
    adminAuth
}