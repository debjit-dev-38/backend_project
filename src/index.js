import dotenv from "dotenv"
import connectDB from "./db/index.js";


dotenv.config({
    path: './env'
})

connectDB().then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`server is running at port ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("DB connection failed", err)
})
































// import mongoose from "mongoose";
// import {DB_NAME} from "./constants.js"
// import express from "express"
// import dotenv from "dotenv"
// const app=express()

// dotenv.config({
//     path: './env'
// })

// ;(async ()=>{
//     try {
//        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//        app.on("error",(error)=>{
//         console.log("error", error)
//         throw error
//        })

//        app.listen(process.env.PORT, ()=>{
//         console.log("db connected app is listening")
//        })
//     } catch (error) {
//         console.error("ERROR: ",error)
//         throw err
//     }
// })()
