const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description:{
        type:String
    },
    images: {
        type: String,
        required: true
    },
},{timestamps:true});

const Work = mongoose.model('Work', workSchema);

module.exports = Work;