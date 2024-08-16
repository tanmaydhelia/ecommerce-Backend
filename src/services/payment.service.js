const razorpay = require("../config/razorPayClient.js");
const orderService = require("../services/order.service.js")

const createPaymentLink = async(orderId)=>{
    try {

       const order = await orderService.findOrderById(orderId);

        const paymentLinkRequest = {
            amount:order.totalDiscountedPrice*100,
            currency:"INR",
            customer:{
                name:order.shippingAddress.firstName+" "+order.shippingAddress?.lastName,
                contact: order.shippingAddress?.mobile,
                email: order.shippingAddress?.email,
            },
            notify:{
                sms:true,
                email:true,
            },
            reminder_enable:true,
            // yaha URL frontend ki hogi
            callback_url:`http://localhost:3000/payment/${orderId}`,
            callback_method: 'get'
            }; 

            // console.log(paymentLinkRequest)

            const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest);


            const paymentLinkId = paymentLink.id;
            const payment_link_url = paymentLink.short_url;

            const resData = {
                paymentLinkId,
                payment_link_url,
            }

            // console.log("res", resData)

            return resData;

    } catch (error) {   
        throw new Error(error.message);
    }
    
}

const updatePaymentInformation = async(reqData) =>{
    const paymentId = reqData.payment_id;
    const orderId = reqData.order_id;
    try {
       const order = await orderService.findOrderById(orderId);
        
        const payment = await razorpay.payments.fetch(paymentId);

        if(payment.status == "captured"){
            order.paymentDetails.paymentId = paymentId;
            order.paymentDetails.status = "COMPLETED";
            order.orderStatus = "PLACED";

            await order.save();
        }

        const resData = {message: "Your Order is Placed", success:true}

        return resData;

    } catch (error) {
        throw new Error(error.message);   
    }
}

module.exports = {
    createPaymentLink,
    updatePaymentInformation,
}