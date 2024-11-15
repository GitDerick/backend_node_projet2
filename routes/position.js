// External imports
const express = require('express');

// Internal imports
const {
    positionFriends,
    putPosition
} = require('../controllers/position');


const { protect } = require('../utilisateurs/auth');

// Variables
const router = express.Router();

router.route('/friends')
    .get(protect, positionFriends);   // http://localhost:5000/position/friends

router.route('')
    .put(protect, putPosition);      // http://localhost:5000/position

module.exports = router;