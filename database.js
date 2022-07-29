require("dotenv").config();

const { text } = require("body-parser");
const { MongoClient} = require("mongodb");


const client = new MongoClient(process.env.url);

async function getdata(){
    try{
        const testdb = client.db(process.env.db);
        const test = testdb.collection("test");
        const data = await test.find()
        console.log(await data.toArray());
        // return data.toArray();
    }catch(e)
    {
        console.log(e);
    }
    finally{
        await client.close();
    }
}

getdata().catch(console.dir);
