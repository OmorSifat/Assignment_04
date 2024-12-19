const express = require('express');
const { getUserProfile, getAllUsers, updateUserProfile, deleteUser } = require('../controllers/userController');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/').get(protect, getAllUsers);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/:id').delete(protect, deleteUser);

module.exports = router;
