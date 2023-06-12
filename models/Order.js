const mongoose = require("mongoose");
const OrderSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    sub_total: {
        type: Number,
        required: true,
    },
    phone_number: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Order", OrderSchema);
