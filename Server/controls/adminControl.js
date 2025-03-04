const User=require('../models/userModel')
const Complaint = require('../models/complaintModel'); 


const fectchUsers=async(req,res)=>{
    try{
       const users=await User.find({role:"user"})
       console.log(users)
       res.json(users)
    }catch(err){
        console.log(err)  
    }
}

const fetchClients=async(req,res)=>{
    try{
       const users=await User.find({role:"client"})
       console.log(users)
       res.json(users)
    }catch(err){
        console.log(err)  
    }
}

const verifyClient=async(req,res)=>{
    try{
        const id=req.headers._id
        console.log(id)
        await User.findByIdAndUpdate({_id:id},{status:"verified"})
       
        res.json("Verified Successfully")
    }catch(err){
        console.log(err)
    }
}

const deleteUser=async(req,res)=>{
    try{
        const id=req.headers._id
        console.log(id)
        await User.findByIdAndDelete({_id:id})    
        res.json("Deleted Successfully")
    }catch(err){
        console.log(err)
    }
}


const viewComplaints=async(req,res)=>{
    try {
        const complaints = await Complaint.find().populate("userId");
        console.log(complaints);
        res.json(complaints);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch complaints" });
    }
}

module.exports={fectchUsers,fetchClients,verifyClient,deleteUser,viewComplaints}