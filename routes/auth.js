// External imports
const express = require('express');

// External imports
const { login, register } = require('../controllers/auth');

// Variable
const router = express.Router();

router.route('/login')
    .post(login);         // http://localhost:5000/auth/login

router.route('/register')
    .post(register);      // http://localhost:5000/auth/register


// Exports
module.exports = router;