const mongoose=require('mongoose')
const conn=require('../config/db')
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');

var userScheme=new mongoose.Schema({
    taskName:String,
    taskDescription:String,
    isComplete:String
},{
    timestamps:true
})


let task=conn.model('tasks',userScheme);


module.exports=task

