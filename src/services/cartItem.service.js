const userService = require("../services/user.service.js");
const CartItem = require("../models/cartItem.model.js");

async function updateCartItem(userId, cartItemId, cartItemData){
    try {
        const cartItem = await findCartItemById(cartItemId);
        if(!cartItem){
            throw new Error("Cart Item not Found: ", cartItemId);
        }
        const user = await userService.findUserById(cartItem.userId);
        if(!user){
            throw new Error("User not Found: ", userId);
        }
        // console.log(cartItem.product.price)
        if(user._id.toString() === userId.toString()){
            
            cartItem.quantity=cartItemData.quantity;
            cartItem.price= cartItem.quantity * cartItem.product.price ;
            cartItem.discountedPrice=cartItem.quantity * cartItem.product.discountedPrice;
            
            
            const updatedCartItem = await cartItem.save();
            return updatedCartItem;
        }
        else{
            throw new Error("You cant update this cart item");
        }
    } catch (error) {
        // console.log("HERE");
        throw new Error(error.message);
    }
}

async function removeCartItem(userId, cartItemId) {
    const cartItem = await CartItem.findById(cartItemId);
    const user = await userService.findUserById(userId);
    if(user._id.toString() === cartItem.userId.toString()){
      return await CartItem.findByIdAndDelete(cartItem);
    }
    else{
    throw new Error("YOu cant remove another User's Item");
    }
}

async function findCartItemById(cartItemId) {
    const cartItem = await CartItem.findById(cartItemId).populate("product");    
    if(cartItem){
        return cartItem;
    }
    else{
        throw new Error("Cart Item not found with ID: ", cartItemId);
    }
}

module.exports={updateCartItem, removeCartItem, findCartItemById}