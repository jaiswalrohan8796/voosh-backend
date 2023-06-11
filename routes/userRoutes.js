const utils = require("../utils/utils.js");
const user_controller = require("../controllers/User.js");

const router = require("express").Router();

function getTokenFromHeader(req) {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.substring(7); // Remove "Bearer " prefix
        return token;
    }
    return null;
}
const authenticate_user = async (req, res, next) => {
    try {
        const token = getTokenFromHeader(req);
        if (!token) {
            throw new Error("Un-Authorized. Please Login");
        }
        const user = utils.verify_jwt_token(token);
        if (!user.email) {
            throw new Error("Authorization token incorrect");
        }
        const user_exist = user_controller.checkUserExists(user.email);
        if (!user_exist) {
            throw new Error("Authorization token incorrect");
        }
        let success_res = {
            success: true,
            data: user_exist,
            error: {},
        };
        res.json(success_res);
    } catch (err) {
        console.log(err);
        let error_res = {
            success: false,
            data: {},
            error: {
                code: 500,
                message: err.message,
            },
        };
        res.json(error_res);
    }
};

router.post("/add-user", async (req, res, next) => {
    try {
        const user_info = req.body;
        //check user
        let alreadyExists = await user_controller.checkUserExists(
            user_info.email
        );
        if (alreadyExists) {
            throw new Error(
                `User with Email : ${user_info.email} already exists!`
            );
        }
        //hash password
        user_info.password = await utils.hashPassword(user_info.password);
        //save new user
        let save_res = await user_controller.addUser(user_info);
        if (!save_res) {
            throw new Error(`Internal Server Error. User not saved`);
        }
        let succes_res = {
            success: true,
            data: save_res,
            error: {},
        };
        res.json(succes_res);
    } catch (err) {
        console.log(err);
        let error_res = {
            success: false,
            data: {},
            error: {
                code: 500,
                message: err.message,
            },
        };
        res.json(error_res);
    }
});

router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        //check user
        let user = await user_controller.checkUserExists(email);
        if (!user) {
            throw new Error("User not found. Please register");
        }
        //check password
        let passwordMatched = await utils.comparePassword(
            password,
            user.password
        );
        if (!passwordMatched) {
            throw new Error("Password Incorrect!");
        }
        const token = utils.create_jwt_token({ email: user.email });
        let success_res = {
            success: true,
            data: {
                token: token,
            },
            error: {},
        };
        res.json(success_res);
    } catch (err) {
        console.log(err);
        let error_res = {
            success: false,
            data: {},
            error: {
                code: 500,
                message: err.message,
            },
        };
        res.json(error_res);
    }
});

router.post("/add-order", (req, res, next) => {
    const { user_id, sub_total, phone_number } = req.body;
    res.json({ user_id, sub_total, phone_number });
});

router.get("/get-order", (req, res, next) => {
    const user_id = req.params.user_id;
    res.json({ user_id });
});

module.exports = router;
