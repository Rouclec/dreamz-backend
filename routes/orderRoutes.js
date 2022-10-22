const express = require('express');
const { protect } = require('../controllers/authController');
const {
  createOrder,
  sendWhatsAppMessage,
  addData,
} = require('../controllers/logisticsOrderController');

const router = express.Router();

router.use(protect);
router.post('/sendPackage', sendWhatsAppMessage, addData, createOrder);

module.exports = router;
