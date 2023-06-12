const Order = require("../models/Order.js");

async function addOrder(order_details) {
    let new_order = new Order(order_details);
    let save_res = await new_order.save();
    if (!save_res) {
        throw new Error("Order not saved");
    }
    return save_res;
}

async function getOrder(user_id) {
    let order_details = await Order.findOne({ user_id: user_id });
    return order_details;
}

module.exports = { addOrder, getOrder };
