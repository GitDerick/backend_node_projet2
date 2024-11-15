// External imports
const express = require('express');

// Variable
const router = express.Router();

// Internal imports
const { 
    getFriends,
    postSingleFriend,
    deleteSingleFriend
} = require('../controllers/friends');

const { protect, isAdmin } = require('../utilisateurs/auth');



router.route('')
    .get(protect, getFriends);            // http://localhost:5000/friends

router.route('/:userId')
    .post(protect, isAdmin, postSingleFriend)         // http://localhost:5000/firends/:userid
    .delete(protect, isAdmin, deleteSingleFriend);    // http://localhost:5000/firends/:userid



// Exports
module.exports = router;