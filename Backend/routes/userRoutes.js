const { signUp, signIn } = require("../controllers/authController");

const router = require("express").Router();

router.post('/signUp', signUp);
router.post('/signIn', signIn);

module.exports = router;