const utils = require("../utils/utils.js");
const user_controller = require("../controllers/User.js");

const router = require("express").Router();

router.post("/signup", async (req, res, next) => {
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

router.post("/add-user", (req, res, next) => {
    const { name, phone_number, password } = req.body;
    res.json({ name, phone_number, password });
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

        let success_res = {
            success: true,
            data: {
                token: "hellojwttokenexample",
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
