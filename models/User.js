// External imports
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    username: {
        type: String,
    },
    fullname: {
        type: String,
    },
    long: {
        type: Number,
        default: 0,
    },
    lat: {
        type: Number,
        default: 0,
    },
    friends : [{
        type : mongoose.Schema.ObjectId,
        ref:'TEC_MAP'
    }]
});

// Exports
module.exports = mongoose.model('TEC_MAP', UserSchema);