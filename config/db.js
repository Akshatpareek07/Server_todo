const mongoose=require('mongoose');

mongoose.connect(`mongodb://${process.env.HOST}:${process.env.DB_PORT}/${process.env.DB}`,{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    family: 4,
}).then(con=>{
    console.log("connected DB");
}).catch(err=>{
    console.error('error',err);
});

module.exports=mongoose
