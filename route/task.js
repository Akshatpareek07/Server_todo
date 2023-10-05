const express= require('express');
const router = express.Router();
const taskController=require('../controllers/taskController');
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


// router.get('/list',jwtAuth,userController.userList);

router.post('/add',taskController.taskAdd);
router.delete('/delete/:_id',taskController.taskDelete);
router.get('/find',taskController.taskFind);
router.patch('/statusUpdate/:_id/:isComplete',taskController.taskstatusUpdate);

// router.post('/login',userController.userLogin);

module.exports=router;