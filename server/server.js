import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongodb.js'

// app config
const PORT = process.env.PORT||4000
const app = express()
await connectDB

//Intialize Middleware
app.use(express.json())
app.use(cors())

// api routes
app.get('/',(req,res)=>res.send("Api Working"))

app.listen(PORT,()=> console.log("Server is running on port" + PORT))