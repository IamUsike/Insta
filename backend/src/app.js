import express from "express"
import cors from "cors"

const app = express()

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" })); //in forms
app.use(express.urlencoded({ extended: true, limit: "16kb" })); //from url

import userRouter from "./routes/user.routes.js";
app.use("/accounts", userRouter)


export {app}