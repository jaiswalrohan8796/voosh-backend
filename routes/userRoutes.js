const router = require("express").Router();

router.post("/add-user", (req, res, next) => {
    const { name, phone_number, password } = req.body;
    res.json({ name, phone_number, password });
});

router.post("/login-user", (req, res, next) => {
    const { phone_number, password, login_by } = req.body;
    res.json({ phone_number, password, login_by });
});

router.post("/add-order", (req, res, next) => {
    const { user_id, sub_total, phone_number } = req.body;
    res.json({ user_id, sub_total, phone_number });
});

router.get("/get-order", (req, res, next) => {
    const user_id = req.params.user_id;
    res.json({ user_id });
});

export default router;
