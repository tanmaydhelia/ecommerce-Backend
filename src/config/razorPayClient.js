const Razorpay = require('razorpay');
require('dotenv').config();

const razorpay = new Razorpay({
  key_id: process.env.api_key,
  key_secret: process.env.api_secret,
});


module.exports = razorpay;