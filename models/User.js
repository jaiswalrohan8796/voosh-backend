const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    phone: {
        type: String,
        required: true,
    },
    oauth: {
        google: {
            googleID: String,
            displayName: String,
            profile: String,
        },
    },
});

module.exports = mongoose.model("User", UserSchema);
