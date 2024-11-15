// External imports
const express = require('express');

// Internal imports
const {
    getUsers,
} = require('../controllers/users');


const { protect } = require('../utilisateurs/auth');

// Variables
const router = express.Router();

router.route('')
    .get(protect, getUsers);

module.exports = router;