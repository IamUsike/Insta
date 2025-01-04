import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";


dotenv.config({
  path: "./env", //this is an experimental feature so need to make some changes in scripts
  //make it `"dev": nodemon -r dotenv/config --experimental-json-modules src/index.js
});

connectDB()
.then(()=>{
    app.listen(8000, ()=>{
        console.log(`server is running on port 8000`)
    })
})
.catch((err)=>{
    console.log("Database Connection failed", err.message)
})