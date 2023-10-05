const Users=require("../models/users");
const bcrypt = require('bcryptjs');

const userList=async (req,res)=>{
    let data=await Users.find();
    res.json(data);

}
const userAdd=async(req,res)=>{
    console.log(req.body);
    let name=req.body.username;
    let email=req.body.email;
    let phone=req.body.phone;
    let password=req.body.password;
    
    //let {name,email,phone,password} ={req.body.username,req.body.email,req.body.phone,req.body.password};
    let data=new Users({
        name:name,
        email:email,
        phone:phone,
        password:password
    });
    let response=await data.save();
    
    let myToken=await data.getAuthToken();
    res.json({message:"added", token:myToken,response:response});

}

const userLogin =async (req,res)=>{
    if(!req.body.email ||!req.body.password)
    {  
        res.status(301).json({message:"ERROR",message:"Please select email/password"});
    }
    let user=await Users.findOne({email:req.body.email});
    var responseType={
        message:"ok"
    }
    if(user)
    {
        var match=await bcrypt.compare(req.body.password,user.password);
        console.log(match,req.body.password,user.password);

        if(match)
        {
            let myToken=await user.getAuthToken();
            responseType.message="Login Successfully";
            
            responseType.token=myToken;

        }
        else
        {
            responseType.message="Invalid Password";
            
        }
    }
    else{
        responseType.message="Invalid Email Id";
            
    }
    res.status(200).json({message:"Ok",data:responseType});
}

module.exports={
    userList,
    userAdd,
    userLogin
}


