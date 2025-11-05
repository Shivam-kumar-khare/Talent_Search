import express from "express"
import { ENV } from "./lib/env.js";
import path from "path"
import { connectDb } from "./lib/database.js";



const app = express();

const __dirname = path.resolve();

if (ENV.NODE_ENV == "production") {
    console.log("In Production")
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })

}

app.get("/health", (req, res) => {
    res.status(200).json({ status: "200", message: "ok" });
})


app.get("/books", (req, res) => {
    res.status(200).json({ status: "200", message: "this is a book endpoint" });
})

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