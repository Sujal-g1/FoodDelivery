require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/db/db');

connectDB(); //db call

app.listen(3000 , ()=>{
    console.log("server is running on port 3000");
}) 
// server started ,  npx nodemon server.js;