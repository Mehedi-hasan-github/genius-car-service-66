const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express= require('express');
const cors=require('cors');
const res = require('express/lib/response');
const app= express();
require('dotenv').config()
const port=process.env.PORT || 5000;
// middleware]

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ebr0b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
   
    try{
        await client.connect();
        const servicessCollection=client.db('genious-car').collection('servicess');
      app.get('/service', async(req,res)=>{
        const query={};
        const cursor= servicessCollection.find(query);
        const servicesss= await cursor.toArray();
        res.send(servicesss);
      });
      app.get('/service/:id',async(req,res)=>{
          const id=req.params.id;
          const query= {_id:ObjectId(id)};
          const service= await servicessCollection.findOne(query);
          res.send(service);

      })

    //  Data post
    app.post('/service', async(req,res)=>{
        const newService=req.body;
        const result = await servicessCollection.insertOne(newService);
        res.send(result);
    })
    // Delete
    app.delete('/service/:id',async(req,res)=>{
        const id =req.params.id;
        const query={_id:ObjectId(id)}
        const result=await servicessCollection.deleteOne(query);
        res.send(result);
    })

    }
    finally{

    }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('Running genious car services');
});

 app.listen(port,()=>{
     console.log('listening to port',port);
 });
