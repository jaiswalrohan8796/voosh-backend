const User = require("../models/User.js");

async function checkUserExists(email) {
    let userExist = await User.findOne({ email: email });
    if (userExist) return userExist;
    return false;
}

async function checkUserIDExists(id) {
    let userExist = await User.findOne({ _id: id });
    if (userExist) return userExist;
    return false;
}

async function addUser(user_info) {
    let newUser = new User(user_info);
    let new_user = await newUser.save();
    if (!new_user) {
        throw new Error("User not saved");
    }
    return new_user;
}

module.exports = { checkUserExists, addUser, checkUserIDExists };
