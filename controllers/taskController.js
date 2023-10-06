const Tasks=require("../models/task");

const taskAdd=async(req,res)=>{
    console.log(req.body);
    let taskName=req.body.taskName;
    let taskDescription=req.body.taskDescription;
    
    
    let data=new Tasks({
        taskName:taskName,
        taskDescription:taskDescription,
        isComplete:"NO"
    });
    let response=await data.save();
    
    res.json({message:"added", token:"myToken",response:response});

}
const taskDelete=async (req,res)=>{
    const {_id} = req.params;
        try {
          await Tasks.findOneAndDelete({_id});
          res.status(200).json({ message: 'Todo deleted successfully' });
        } catch (error) {
          res.status(500).json({ error: 'Internal server error' });
        }
}

const taskFind = async (req,res)=>{
        const allTasks = await Tasks.find();
        return res.status(200).json({ allTasks });
}



const taskstatusUpdate= async (req,res)=>{
  const _id = req.params._id;
  const isComplete = req.params.isComplete;

  console.log(_id + " And " + isComplete);
  
  try {
    const updatedItem = await Tasks.findOneAndUpdate(
      {
        _id
      }, 
      {
        isComplete
      }, 
    {
      new :true
    });
    return res.json({updatedItem});
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item.' });
  }
}
module.exports={
    taskAdd,
    taskDelete,
    taskFind,
    taskstatusUpdate
}



// name : "tara"

//  name : "tara chand"