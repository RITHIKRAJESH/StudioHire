const mongoose=require('mongoose')


const dbConnect=async(req,res)=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/newfreelance")
        console.log("database connected successfully")
    }catch(err){
        console.log(err)
    }
}

module.exports=dbConnect