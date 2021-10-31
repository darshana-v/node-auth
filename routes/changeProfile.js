const router = require("express").Router();
const verify = require("./verifyToken");

router.get("/", verify, (req, res) => {
  res.json({
    posts: { title: "Change Profile", description: "Edit Parents' dashboard" },
  });
});

module.exports = router;
