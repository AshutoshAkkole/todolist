require("dotenv").config();

const { MongoClient} = require("mongodb");


const client = new MongoClient(process.env.url);

async function getOne(dAte){
    let data;
    try{
        await client.connect();
        console.log("connected to database");
        data = await client.db("todolist").collection("lists").findOne({date:dAte});
        console.log(data.array.length);
        // return data.toArray();
    }catch(e)
    {
        console.log(e);
    }
    finally{
        await client.close();
        console.log("Connection Closed");
        return data;
    }
}

async function insertdata(daTe)
{
    try{
        await client.connect();
        console.log("connected to database");
        await client.db("todolist").collection("lists").insertOne({date:daTe,array:[]});
        console.log("data inserted");
    }catch(e)
    {
        console.log(e);
    }
    finally{
        await client.close();
        console.log("connection closed");
    }
}

async function updatedata(daTe,aray)
{
    try{
        await client.connect();
        console.log("connected for inserting");
        await client.db("todolist").collection("lists").updateOne({date:daTe},{array:aray});
        console.log("data updated");
    }catch(e)
    {
        console.log(e);
    }
    finally{
        await client.close();
        console.log("connection closed");

    }
}

module.exports={insertdata,getOne,updatedata};

// insertdata("Saturday, July 31").catch(console.error);
