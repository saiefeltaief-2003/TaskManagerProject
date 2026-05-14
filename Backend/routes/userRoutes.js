const { signUp, signIn, getCurrentUser } = require("../controllers/authController");
const { authenticateToken } = require("../middlewares/authGuard");

const router = require("express").Router();

router.post('/signUp', signUp);
router.post('/signIn', signIn);
router.get('/me', authenticateToken, getCurrentUser);

module.exports = router;