// External imports
const express = require('express');

// Variables
const router = express.Router();

// Internal imports
const {
    getMe,
    putMe,
    deleteMe,
} = require('../controllers/me');

const { protect } = require('../utilisateurs/auth');


// CRUD Routes
router.route('')
    .get(protect, getMe)        // http://localhost:5000/me
    .put(protect, putMe)        // http://localhost:5000/me
    .delete(protect, deleteMe)  // http://localhost:5000/me



// Exports 
module.exports = router;