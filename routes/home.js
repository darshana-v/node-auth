const router = require("express").Router();
const verify = require("./verifyToken");

router.get("/", verify, (req, res) => {
  res.json({
    posts: { title: "Home Page", description: "Parents' dashboard" },
  });
});

module.exports = router;
