const express=require('express');
const app=express();
const dbfunc=require('./write-db');
const readDb=require('./read-db');
console.log("express started");
app.use('/',express.static(__dirname+'/public'))
app.use(express.json())
//post method
app.post('/todos',(req,res)=>{
   console.log("from server "+req.body)
   console.log("post is called")
   console.log(req.body)
   dbfunc.writeDb(req.body).then(res.status(201).send("Added"));
})
//get method
app.get('/todos',(req,res)=>{
   console.log("INSIDE GET METHOD")
   res.send("coming").status(201);
})
app.listen(9000);
module.exports={app};