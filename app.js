// External imports
const express = require('express');
const mongoose = require('mongoose');

// Internal imports
const authRoutes = require('./routes/auth');
const friendsRoutes = require('./routes/friends');
const meRoutes = require('./routes/me');
const positionRoutes = require('./routes/position');
const usersRoutes = require('./routes/users');

// Variables
const app = express();
const PORT = 5000;

const connect = async () => {
    try {
        const connectdb = await mongoose.connect('mongodb+srv://derick:derick@cluster0.vobyisa.mongodb.net/');
        console.log(`DB connect to : ${connectdb.connection.host}`);
    } catch (error) {
        console.log(`Error mongodb: ${error}`);
    }

}
connect();

// Body parser
app.use(express.json());


// Routers
app.use('/auth', authRoutes);
app.use('/friends', friendsRoutes);
app.use('/me', meRoutes);
app.use('/position', positionRoutes);
app.use('/users', usersRoutes);


// Listener
app.listen(PORT, () => {
    console.log(`Server listen on port: ${PORT}`);
});

