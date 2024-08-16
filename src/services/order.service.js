const Address = require("../models/address.model.js");
const Order = require("../models/order.model.js");
const CartService = require("../services/cart.service.js");
const OrderItems = require("../models/orderItems.model.js")

async function createOrder(user,shipAddress){
    
    let addressHere;
    console.log("user", user)
    if(shipAddress._id){
        let existAddress = await Address.findById(shipAddress._id);
        addressHere=existAddress;
        // console.log(addressHere._id)
    }
    else{
        // console.log("HERE")
        addressHere = new Address(shipAddress);
        addressHere.user=user;
        await addressHere.save();
        console.log("address:", addressHere)
        user.addresses.push(addressHere);
        // await user.populate("addresses")    
        await user.save();
    }
    console.log("HERE")

    const cart = await CartService.findUserCart(user._id);
    const orderItems=[];

    for(const item of cart.cartItems){

        const orderItem = new OrderItems({
            price: item.price,
            product:item.product,
            quantity:item.quantity,
            size:item.size,
            userId:user._id,
            discountedPrice:item.discountedPrice,
        })

        const createdOrderItem = await orderItem.save();
        orderItems.push(createdOrderItem);
    }

    const createdOrder = new Order({
        user,
        orderItems,
        totalPrice:cart.totalPrice,
        totalDiscountedPrice:cart.totalPrice-cart.discount,
        discount:cart.discount,
        totalItem: cart.totalItem,
        shippingAddress:addressHere,
    })
    // console.log(createdOrder.shippingAddress);

    

    const savedOrder = await createdOrder.save();

    return savedOrder;
}

async function placedOrder(orderId){
    const order = await findOrderById(orderId);

    order.orderStatus="PLACED";
    order.paymentDetails.status="COMPLETED";

    return await order.save();
}

async function confirmedOrder(orderId){
    const order = await findOrderById(orderId);

    order.orderStatus="CONFIRMED";

    return await order.save();
}

async function shipOrder(orderId){
    const order = await findOrderById(orderId);

    order.orderStatus="SHIPPED";

    return await order.save();
}

async function deliverOrder(orderId){
    const order = await findOrderById(orderId);

    order.orderStatus="DELIVERED";

    return await order.save();
}

async function cancelledOrder(orderId){
    const order = await findOrderById(orderId);

    order.orderStatus="CANCELLED";

    return await order.save();
}

async function findOrderById(orderId){
    const order = Order.findById(orderId)
    .populate("user")
    .populate({path:"orderItems", populate:{path:"product"}})
    .populate("shippingAddress")

    return order;
}

async function usersOrderHistory(userId) {
    try {
        const orders = await Order.find({user:userId, orderStatus:"PLACED"})
        .populate({path:"orderItems",populate:{path:"product"}}).lean()

        return orders;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function getAllOrders() {
    return await Order.find()
        .populate({path:"orderItems",populate:{path:"product"}}).lean()
}

async function deleteOrder(orderId) {
    const order = await findOrderById(orderId);
    await Order.findByIdAndDelete(order._id);
}

module.exports={
    createOrder,
    placedOrder,
    confirmedOrder,
    shipOrder,
    deliverOrder,
    cancelledOrder,
    findOrderById,
    usersOrderHistory,
    getAllOrders,
    deleteOrder,
};