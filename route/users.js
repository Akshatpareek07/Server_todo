const express= require('express');
const router = express.Router();
const userController=require('../controllers/userController');
const bodyParser=require('body-parser');
const jwt=require('jsonwebtoken');

var jwtAuth=(req,res,next)=>{
    var token=req.headers.authorization;
    token=token.split(' ')[1];
    jwt.verify(token,process.env.SECRETKEY,function(err,decoded){
        if(err){
            res.send({message:'Invalid Token'});
        }
        else
        {
            next();
        }
    })
}

router.use(bodyParser.urlencoded({extended:false}));

router.get('/users',(req,res)=>{
    res.send("hellio code improve ");
})

router.get('/list',jwtAuth,userController.userList);

router.post('/add',userController.userAdd);

router.post('/login',userController.userLogin);

module.exports=router;