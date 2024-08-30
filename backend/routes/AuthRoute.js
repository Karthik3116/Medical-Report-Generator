const { Signup, Login } = require("../controllers/AuthController");
const { userVerification } = require("../middlewares/AuthMiddleware")
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.get("/test", (req, res) =>{
    res.send("done");
})
router.post('/',userVerification);

module.exports = router;
