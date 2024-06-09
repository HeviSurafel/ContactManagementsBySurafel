const express=require("express")
const userRoutes=require('./Routes/userRoutes.js')
// importing contact route $$ error handler
const errorhandler = require("./Middleware/errorhandler.js")
const connectdb = require("./config/dbconnection.js")
const app=express()
const dotenv=require("dotenv").config()
connectdb();
app.use(express.json())
//config dotenv 

const port=process.env.PORT||5001
// middleware 
const contactRoutes=require("./Routes/contactRoutes.js")
app.use("/api/contacts",contactRoutes)
app.use("/api/users",userRoutes)
app.use(errorhandler)
// calling database connection

app.listen(port,()=>{
    console.log(`we are running on port ${port}`)
})