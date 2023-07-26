const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/auth");

const { login, logeado, logout } = require("../controllers/auth.Controller");

router.post("/login", login);
router.get("/logeado", authenticate, logeado);
router.post("/logout", logout);

module.exports = router;
