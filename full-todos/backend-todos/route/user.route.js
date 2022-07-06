const { Router } = require("express");

const { userControllers } = require("../controller/user.controller");

const router = Router();

router.post("/user", userControllers.createUser);
router.post("/login", userControllers.login)
router.delete("/user/:id", userControllers.deleteUser);

module.exports = router;