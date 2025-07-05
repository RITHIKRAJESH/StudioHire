const User=require('../models/userModel')
const Complaint = require('../models/complaintModel'); 
const Equipment = require('../models/equipModel');
const Booking=require('../models/booking')
const Project=require('../models/projectModel')
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
        await Project.findByIdAndDelete({userId:id}) 
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
  
  const updateBookingStatus = async (req, res) => {
    try {
        const id = req.headers.id; // Get the booking ID from headers
        const { status } = req.body; // Get the status from the request body
        
        console.log(req.body, id); // Log the request body and booking ID

        // Find the booking by its ID
        const booking = await Booking.findById(id);

        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        // Find the equipment related to this booking
        const equipment = await Equipment.findById(booking.equipmentId);
        
        if (!equipment) {
            return res.status(404).json({ error: "Equipment not found" });
        }

        // Update the booking status
        await Booking.findByIdAndUpdate(id, { status: status });

        // Based on the booking status, update the equipment's availability
        if (status === "Accepted" || status === "Booked") {
            // If booking is accepted or still booked, mark the equipment as "Not Available"
            await Equipment.findByIdAndUpdate(booking.equipmentId, { status: "Not Available" });
        } else if (status === "Returned" || status === "Cancelled") {
            // If booking is returned or cancelled, mark the equipment as "Available"
            await Equipment.findByIdAndUpdate(booking.equipmentId, { status: "Available" });
        }

        res.json("Booking status and equipment availability updated successfully");
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to update booking status and equipment availability" });
    }
};


module.exports = { fectchUsers, fetchClients, verifyClient, deleteUser, viewComplaints, addEquipment, viewEquipments, deleteEquipment, updateEquipment,equipBooking, updateBookingStatus};

