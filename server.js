const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static('public'));
let tasks = [];

app.get("/", function (req, res) {
    const day = new Date();
    let today;
    const option = {
        weekday:"long",
        day: "numeric",
        month:"long"
    }
    today=day.toLocaleDateString("en-US",option);
    res.render("weekday",{vaar:today,task:tasks});
});

app.post("/addtolist", function (req, res) {

    if(req.body.task==="")
    {
        res.redirect("/");
    }
    else{
        tasks.push(req.body.task);
        res.redirect("/");

    }
});

app.listen(3000, function () {
    console.log("port 3000 stated");
});