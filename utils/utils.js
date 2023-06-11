const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

async function comparePassword(password, hashedPassword) {
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    return passwordsMatch;
}

function create_jwt_token(payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY,
    });
    return token;
}

function verify_jwt_token(token) {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return user;
}

module.exports = {
    hashPassword,
    comparePassword,
    create_jwt_token,
    verify_jwt_token,
};
