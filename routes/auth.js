const router = require("express").Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../validation");

router.post("/register", async (req, res) => {
  // validate data and return error if not validated
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // return error if user already exists
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email already exists");

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // else create new user
  const user = new User({
    childName: req.body.childName,
    email: req.body.email,
    password: hashedPassword,
    contactNumber: req.body.contactNumber,
    childDob: req.body.childDob,
    gender: req.body.gender,
    languagePreference: req.body.languagePreference,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  // validate data and return error if not validated
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // return error if user already exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email is not registered");

  // check if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");

  // create and assign jwt token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
  return;

  res.send("Logged in!");
});

module.exports = router;
