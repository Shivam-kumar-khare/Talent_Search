import express from "express"
import { ENV } from "./lib/env.js";


const app=express();

app.get("/",(req,res)=>{
    res.status(200).json({status:"200",message:"ok"});
})
app.listen(ENV.PORT,()=>{
    console.log("server is running at port : ",ENV.PORT)
})
// console.log("server is running")   