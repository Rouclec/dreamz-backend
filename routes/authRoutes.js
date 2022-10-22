const express = require('express');
const {
  signup,
  login,
  protect,
  updatePasswword,
} = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

//TODO: add routes for forgotPassword and resetPassword

router.use(protect);

router.patch('/updatePassword', updatePasswword);

module.exports = router;
