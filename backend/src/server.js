import express from "express"
import { ENV } from "./lib/env.js";
import path from "path"
import { connectDb } from "./lib/database.js";
import cors from "cors"



const app = express();
app.use(express.json());
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}));

const __dirname = path.resolve();


app.get("/health", (req, res) => {
    res.status(200).json({ status: "200", message: "ok" });
})


app.get("/books", (req, res) => {
    res.status(200).json({ status: "200", message: "this is a book endpoint" });
})
if (ENV.NODE_ENV == "production") {
    console.log("In Production")
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend","dist","index.html"))
    })

}



const startServer = async () => {
   try {
     await connectDb();
     app.listen(ENV.PORT, () => {
         console.log("server is running at port : ", ENV.PORT)
     })
   } catch (error) {
    console.log("Error starting server\n",error)
   }


}
startServer();
// console.log("server is running")   