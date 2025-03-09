const User=require('../models/userModel')
const Complaint = require('../models/complaintModel'); 
const Equipment = require('../models/equipModel');
const Booking=require('../models/booking')
const multer = require('multer');
const path = require('path');


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



const addEquipment = async (req, res) => {
    try {
        const { name, cautionDeposit, rentPerDay, status } = req.body;
        const image = req.files.image[0].path;
      console.log(req.body)
        const newEquipment = new Equipment({
            name,
            image,
            cautionDeposit,
            rentPerDay,
            status
        });

        await newEquipment.save();
        res.json("Equipment added successfully");
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to add equipment" });
    }
};

const viewEquipments = async (req, res) => {
    try {
        const equipments = await Equipment.find();
        console.log(equipments);
        res.json(equipments);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch equipments" });
    }
};

const deleteEquipment = async (req, res) => {
    try {
        const id = req.headers._id;
        console.log(id);
        await Equipment.findByIdAndDelete({ _id: id });
        res.json("Deleted Successfully");
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to delete equipment" });
    }
};

const updateEquipment = async (req, res) => {
    try {
        const id = req.headers._id;
        const { name, cautionDeposit, rentPerDay, status } = req.body;
        const image = req.files?.image ? req.files.image[0].path : undefined;
        console.log(req.body);

        const updateData = { name, cautionDeposit, rentPerDay, status };
        if (image) {
            updateData.image = image;
        }

        await Equipment.findByIdAndUpdate({ _id: id }, updateData);
        res.json("Updated Successfully");
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to update equipment" });
    }
};

const equipBooking = async (req, res) => {
    try {
      const bookings = await Booking.find({}).populate("userId").populate("equipmentId")
      console.log(bookings); // Log the bookings object to inspect its structure
      res.json(bookings); // Send it only if it doesn't have circular references
    } catch (error) {
      console.error("Error fetching equipment bookings:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

module.exports = { fectchUsers, fetchClients, verifyClient, deleteUser, viewComplaints, addEquipment, viewEquipments, deleteEquipment, updateEquipment,equipBooking};

