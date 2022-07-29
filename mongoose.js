require("dotenv").config()
const mongoose = require("mongoose");

mongoose.connect(process.env.url,{"useNewUrlPraser":true});

const table = mongoose.model('test');