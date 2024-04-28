const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");


const registerUser = async (req, res) => {
    const {name,email,phone , password } = req.body;
    if (!name || !phone || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please Fill Out All These Fields" });
    }
    //check if user exist
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res
        .status(400)
        .json({ message: "This User Is Aready Exist Try Again" });
  }
  
  const userExistWithPhone = await User.findOne({ phone });
if (userExistWithPhone) {
  return res
    .status(400)
    .json({ message: "A user with this phone number already exists" });
}
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({name,email,phone, password: hashedPassword });
    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        phone:user.phone,
        token: generateToken(user._id),
        message: "User created successfully",
      });
    } else {
      return res.status(400).json({ message: "Failed to create account" });
    }
  };

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please Fill Out All These Fields" });
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({
      message: "wrong username or password",
    });
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = { loginAdmin,registerUser };