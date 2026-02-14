
const express = require('express');
const cookieParser = require('cookie-parser'); // used as middleware
const authRoutes = require('./routes/auth.routes')


const app = express(); // instance of server created
app.use(cookieParser());
app.use(express.json());   //created middleware to read request


app.get("/" , (req , res)=>{
    res.send("hello hello");
})

app.use('/api/auth' , authRoutes); 
// telling server that API's exist 
// api/auth , this is like prefix








module.exports = app;