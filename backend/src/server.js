import express from "express"
import { ENV } from "./lib/env.js";
import path from "path"



const app=express();

const __dirname = path.resolve();

if(ENV.NODE_ENV=="production"){
    console.log("In Production")
    app.use(express.static(path.join(__dirname,"../frontend/dist")));
    app.get("/{*any}",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })

}

app.get("/health",(req,res)=>{
    res.status(200).json({status:"200",message:"ok"});
})


app.get("/books",(req,res)=>{
    res.status(200).json({status:"200",message:"this is a book endpoint"});
})
app.listen(ENV.PORT,()=>{
    console.log("server is running at port : ",ENV.PORT)
})
// console.log("server is running")   