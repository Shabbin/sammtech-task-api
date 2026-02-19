const router = require("express").Router();
const { auth } = require("../middlewares/auth.middleware");

// Protected test route
router.get("/me", auth, (req, res) => {
  res.json({
    message: "You are authenticated ✅",
    user: req.user,
  });
});

module.exports = router;
