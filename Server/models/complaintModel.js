const mongoose=require('mongoose')


const complaintSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    freelancerName: {
        type: String,
        // required: true
    },
    complaint: {
        type: String,
        required: true
    }
});

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;
