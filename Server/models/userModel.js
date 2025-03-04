const mongoose=require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
    },
    status: {
        type: String,
        default: 'pending'
    },
    address: {
        type: String,
    },
    experience:{
        type:String,
    },
    companyname:{
        type:String,
    },
    certificate:{
        type:String
    },
    image:{
        type:String
    },
    category:{
        type:String
    }
}, {
    timestamps: true
});

const userModel = mongoose.model('User', userSchema);

module.exports=userModel