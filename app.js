import "dotenv/config"
import router from "./router/router.js";
import supabase from "./db/database.js";
import express from "express"


const app = express()

app.use(express.json())

app.use(router)

app.use((req,res,next) =>{
    const err = new Error("route not found")
    const status = 404
    next(err)
})

app.use((err,req,res,next) =>{
    res.status(err.status || 500)
    .json({error:err.message})
})

app.listen(3000,() =>console.log("server runnig on port 3000"))
