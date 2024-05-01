const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
require("dotenv").config();

//MiddleWare
app.use(cors());

//API ENDPOINTS CONSTANTS
const HouseListingRoute = require("./Routes/HouseUpload/HouseSaleOrRent");
const ListHouseFecthRoute = require("./Routes/ListedHouseFetch/HouseFetch");
const ContactFormRoute = require("./Routes/EmailRoute/Email");
//API ENDPOINTS
app.use(HouseListingRoute);
app.use(ListHouseFecthRoute);
app.use(ContactFormRoute);

//Setting up for production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (request, response) => {
    response.sendFile(
      path.resolve(__dirname, "./client", "build", "index.html")
    );
  });
}


app.use(cors())
app.use(express.json())
const client = new MongoClient('mongodb+srv://admin:admin@cluster0.8zwrfai.mongodb.net/?retryWrites=true&w=majority')
client.connect()
const db = client.db('RealEstate')
const col = db.collection('Register')
//col.insertOne({'student':"123"})

app.post('/register',(req,res)=>{
    col.insertOne(req.body)
    res.send('inserted successfully')
})-
app.get('/retrieve',async (req,res)=>{
    const result = await col.find().toArray()
    console.log(result)
    res.send(result)
})

app.put('/users/:id',async(req,res)=>{
    const {id}=req.params
    const{name,surname,phonenumber,email,province,street}=req.body
    const result=col.updateOne({_id: new ObjectId(id)},
    {$set:{name,surname,phonenumber,email,province,street}})
    res.send('updated')
})
app.delete('/users/:id',async(req,res)=>{
    const {id}=req.params
    const result=await col.deleteOne({_id:new ObjectId(id)})
    res.json({message:"deleted successfully"})
})

app.get('/',(req,res)=>{
    res.send('<h1><center>Hello World</center></h1>')
})
app.get('/about',(req,res)=>{
    res.send('<h1><center>This is about page</center></h1>')
})
app.listen('8080', ()=>{
    console.log('server is running')
})

//SERVER'S ENTRY POINT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
