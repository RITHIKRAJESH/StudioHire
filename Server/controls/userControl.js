const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); 
const Project=require('../models/projectModel')
const Complaint = require('../models/complaintModel'); 
// User registration
const register = async (req, res) => {
    try {
        const { username, email, password, role,companyName,experience, category } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Handle file uploads
        const image = req.files?.image ? req.files.image[0].path : null;
        const certificate = req.files?.certificate ? req.files.certificate[0].path : null;

        // Create new user object
        user = new User({
            username,
            email,
            password: hashedPassword,
            role,
            image,
            certificate,
            companyname:companyName,
            experience,
            category
        });

        // Save user to database
        await user.save();

        res.status(200).json({ msg: "Registration Successful", user });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};
// User login
login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Prepare the payload by extracting only the necessary fields (username, email, and role)
        const payload = {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            status:user.status // You may also include any other relevant fields
        };

        // Generate JWT token
        jwt.sign(
            payload,
            'jwtauthen', // Secret key
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const viewProfile = async (req, res) => {
    try {
        // Extract _id from the headers
        const userId = req.headers.id; // Assuming the ID is passed in the headers with the key 'id'

        if (!userId) {
            return res.status(400).json({ msg: 'User ID is missing from headers' });
        }

        // Fetch the user from the database using the _id
        const user = await User.findById(userId);
       console.log(user)
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Respond with user profile data (you can customize what data to send back)
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


const bookproject=async(req,res)=>{
    try{
      const clientId=req.headers.id
      const {userId,projectName,startDate,endDate}=req.body
      console.log(req.body)
      const project=await Project({
        userId,
        clientId, 
        projectName,
        startDate,
        endDate
      })
      await project.save()
      res.json("Freelancer Booked for this date")
    }catch(err){
        console.log(err)
    }
}

const viewBooking=async(req,res)=>{
    const userId=req.headers.id
    const project=await Project.find({userId}).populate("clientId")
    res.json(project)
}

const booking=async(req,res)=>{
    const project=await Project.find()
    res.json(project)
}

const viewBookingClient = async (req, res) => {
    try {
        const clientId = req.headers.id;
        const projects = await Project.find({ clientId }).populate("userId");
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: "Server error", details: err.message });
    }
};


const updatebooking = async (req, res) => {
    try {
        const { Status, ProjectId } = req.body;
        console.log(req.body)
        const updatedProject = await Project.findByIdAndUpdate(
            ProjectId, 
            { status: Status },
            { new: true } 
        );

        if (!updatedProject) {
            return res.status(404).json({ error: "Project not found" });
        }

        res.json( "Updated Successfully");
    } catch (error) {
        console.error("Error updating project:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const registerComplaint = async (req, res) => {
    try {
        const userId = req.headers.id;
        const { freelancerName, complaint } = req.body;

        if (!userId) {
            return res.status(400).json({ msg: 'User ID is missing from headers' });
        }

        const complaints = new Complaint({
            userId,
            freelancerName,
            complaint
        });

        await complaints.save();
        res.status(200).json({ msg: "Complaint Registered Successfully", complaint });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};

module.exports = { registerComplaint, register, login, viewProfile, bookproject, viewBooking, viewBookingClient, updatebooking, booking };

