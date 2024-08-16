const Razorpay = require('razorpay');

api_key = 'rzp_test_aoNq9ToMyPVapr'
api_secret = 'rU7AYZ9vHi5PPgrxxW6hAm5u'

const razorpay = new Razorpay({
  key_id: api_key,
  key_secret: api_secret,
});


module.exports = razorpay;