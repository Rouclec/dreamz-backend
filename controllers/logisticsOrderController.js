const catchAsync = require('../utils/errorHandling');

const LogisticsOrder = require('../models/logisticsOrderModel');
const { createOne } = require('../helpers/handlerFactory');

require('dotenv').config({ path: '../config.env' });

// const client = require('twilio')(
//   process.env.ACCOUNT_SID,
//   process.env.AUTH_TOKEN
// );

const client = require('twilio')(
  'ACc1d8457c4cb7a8b3d79a3ecd0816c871',
  '76ee5856ec640f204419efa56f241f17'
);

exports.sendWhatsAppMessage = catchAsync(async (req, res, next) => {
  let data = { ...req.body };
  data.sendersName = req.user.name;
  data.sendersTelephone = req.user.phoneNumber;
  await client.messages.create({
    body: `${'\t\t'} *New Shipping Order* ${'\t\t\t'} ${'\n\n'}*Category:* ${
      data.category
    } ${'\n'}*Weight:* ${data.weight}grams${'\n'}*q'ty:* ${
      data.quantity
    }grams${'\n'}*Sender's name:* ${
      data.sendersName
    }${'\n'}*Sender's telephone:* ${
      data.sendersTelephone
    } ${'\n'}*Receiver's name:* ${
      data.receiversName
    } ${'\n'}*Receiver's address:* ${
      data.receiversAddress
    } ${'\n'}*Receiver's telephone:* ${
      data.receiversTelephone
    } ${'\n'}*From:* ${data.locationFrom} ${'\n'}*To:* ${
      data.locationTo
    } ${'\n'}`,
    from: 'whatsapp:+14155238886',
    to: 'whatsapp:+23750184172',
  });
  next();
});

exports.addData = catchAsync(async (req, res, next) => {
  req.body.sendersName = req.user.name;
  req.body.sendersTelephone = req.user.phoneNumber;
  next();
});

exports.createOrder = createOne(LogisticsOrder);
