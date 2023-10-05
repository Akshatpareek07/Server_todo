const express= require('express');
const cors = require('cors');
const app = express();
const port=4000;
// require("dotenv").config();


// .env file connection
const path=require('path');
require('dotenv').config({
    path:path.join(__dirname,'.env')
})

app.use(cors({ origin: `http://localhost:${process.env.R_PORT}` }));
app.use(express.json());
app.use(express.urlencoded({extended :false}))






const userRoute = require('./route/users');
app.use('/', userRoute);

const taskRoute = require('./route/task');
app.use('/loginUser',taskRoute);

app.listen(port,()=>{
    console.log('app is listening on '+port);

})