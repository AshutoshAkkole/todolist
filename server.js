const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoosedb = require("./mongoosedb");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static('public'));
// let tasks = [];


app.get("/", function (req, res) {
    const day = new Date();
    let today;


    const option = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    today = day.toLocaleDateString("en-US", option);


    mongoosedb.List.findOne({ date: today }, function (err, data) {
        if (err) {
            console.log("error");
        } else {
            // console.log(data);
            if (data) {
                console.log("This is data=", data);
                res.render("weekday", { vaar: today, task: data.tasks });
            } else {
                const data1 = new mongoosedb.List({
                    date: today,
                    tasks: []
                });
                data1.save();
                res.redirect("/");
            }

        }});


});

app.post("/addtolist", function (req, response) {

    const day = new Date();


    const option = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    let today = day.toLocaleDateString("en-US", option);

    if (req.body.task === "") {
        response.redirect("/");
    }
    else {
        console.log("In addtolist",today);
        mongoosedb.List.updateOne({date:today},{$push:{"tasks":req.body.task}},function(err,res){
            if(err)
            {
                console.log(err);
            }else
            {
                // mongoosedb.mongoose.connection.close();
                console.log(res);
                response.redirect("/");
                
            }
        });

    }
});

app.listen(process.env.PORT || 3000, function () {
    console.log("port 3000 stated");
});