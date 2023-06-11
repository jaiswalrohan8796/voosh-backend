const User = require("../models/User.js");

async function checkUserExists(email) {
    let userExist = await User.findOne({ email: email });
    if (userExist) return userExist;
    return false;
}

async function addUser(user_info) {
    let newUser = new User(user_info);
    let new_id = await newUser.save();
    if (!new_id) {
        throw new Error("User not saved");
    }
    return new_id;
}

module.exports = { checkUserExists, addUser };
