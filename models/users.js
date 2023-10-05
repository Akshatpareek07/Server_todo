const mongoose=require('mongoose')
const conn=require('../config/db')
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');

var userScheme=new mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    password:String,
    token:[
        {
            token:{
                type:String,
                require:true
            }
        }
    ]

},{
    timestamps:true
})


userScheme.pre('save',function(next){
    var salt = bcrypt.genSaltSync(10);
    if(this.password && this.isModified('password')){
    this.password = bcrypt.hashSync(this.password, salt);
    }
    
    console.log(this.password);
    next();
});

userScheme.methods.getAuthToken= async function(data){
    let params={
        id:this.id,
        email:this.email,
        phone:this.phone
    }
    var tokenValue=jwt.sign(params,process.env.SECRETKEY);
    this.token=this.token.concat({token:tokenValue});
    await this.save();
    return tokenValue;
}

let user=conn.model('users',userScheme);


module.exports=user

