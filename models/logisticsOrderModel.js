const mongoose = require('mongoose');
const validator = require('validator');

const logisticsOrderSchema = new mongoose.Schema({
  sendersName: { type: String, require: [true] },
  receiversName: { type: String, require: [true] },
  locationFrom: {
    type: String,
    required: [true, 'Order must have a location from'],
  },
  locationTo: {
    type: String,
    required: [true, 'Order must have a location to'],
  },
  category: {
    type: String,
    required: [true],
  },
  weight: {
    type: Number,
    required: [true],
  },
  receiversAddress: {
    type: String,
    required: [true],
  },
  sendersTelephone: {
    type: String,
    required: [true, 'Please provide the receivers telephone number'],
    validate: [
      validator.isMobilePhone,
      'Please input a valid telephone number',
    ],
  },
  receiversTelephone: {
    type: String,
    required: [true, 'Please provide the receivers telephone number'],
    validate: [
      validator.isMobilePhone,
      'Please input a valid telephone number',
    ],
  },
  quantity: {
    type: Number,
    required: [true, 'Please include quantity'],
  },
});

const LogisticsOrder = mongoose.model('LogisticsOrder', logisticsOrderSchema);

module.exports = LogisticsOrder;
