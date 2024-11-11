const { Signup, Login,Logout} = require("../controllers/AuthContoller");
const {userVerification} = require("../middlewares/AuthMiddleware");
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/logout",Logout)
router.post("/dashboard",userVerification);
module.exports = router;
