require("dotenv").config()
const mongoose = require("mongoose");

mongoose.connect(process.env.url,{
    useNewUrlParser: true,
   });

const collection_schema = new mongoose.Schema({
    date:String,
    tasks:[String]
})

const List = mongoose.model('list',collection_schema);

// List.updateOne({date:"Tuesday, August 2"},{$push:{"tasks":"ab"}},function(err,res){
//     if(err)
//     {
//         console.log(err);
//     }else
//     {
//         mongoose.connection.close();
//         console.log(res);
//     }
// });

// const data = new List({
//     date:"some day",
//     tasks:["wasting hours on bugs","my life is ruined"]
// });

module.exports = {List,mongoose};

// data.save();
// mongoose.connection.close();

// const a = List.findOne({date:"Saturday ,30 july"},function(err,data){
//     if(err){
//         console.log(err);
//     }else{
//         mongoose.connection.close();
//         console.log(data);
//         return data;
//     }
// })

// console.log("this is a",a);