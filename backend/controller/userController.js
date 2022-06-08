const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = "key1";
const signup = async (req, res, next) => {
  const { username, email, password, selectedRole, selectedFile } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
  }
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashedPassword = bcrypt.hashSync(password);
  const user = new User({
    username: username,
    email: email,
    password: hashedPassword,
    selectedRole: selectedRole,
    blogs: [],
    posts: [],
    selectedFile: selectedFile,
  });
  try {
    await user.save();
  } catch (error) {
    console.log(error);
  }
  return res.status(201).json({ user });
};
const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return new Error(err);
  }

  if (!existingUser) {
    return res.status(400).json({ message: "user not found.signup please" });
  }
  const isPasswordCorrect = bcrypt.compare(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "invalid email/password" });
  }
  const token = jwt.sign({ id: existingUser._id }, secretKey, {
    expiresIn: "24h",
  });
  if (req.cookies[`${existingUser._id}`]) {
    req.cookies[`${existingUser._id}`] = "";
  }

  console.log("login", token);
  console.log("\n\n", req.cookies[`${existingUser._id}`], "\n\n");
  return res
    .cookie(String(existingUser._id), token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      httpOnly: true,
    })

    .status(200)
    .json({ message: "successfully logged in", user: existingUser, token });
};

const verifyToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  console.log("ths is cookies", cookies);
  const token = cookies.split("=")[1];
  console.log("this is the token", token);
  if (!token) {
    res.status(404).json({ message: "not found" });
  }
  jwt.verify(String(token), secretKey, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ message: "invalid token" });
    }
    console.log("verify", user.id);
    req.id = user.id;
  });
  next();
};
const getUser = async (req, res, next) => {
  // const userId = req.id;
  const userId = req.id;
  console.log("this is the userid", userId);
  let user;
  try {
    user = await User.findById(userId, "-password");
  } catch (err) {
    return new Error(err);
  }
  if (!user) {
    return res.status(404).json({ message: " user not found" });
  }
  return res.status(200).json({ user });
};
const getAnotherUser = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findById(id);
  } catch (error) {
    return console.log(error);
  }
  if (!user) {
    return res.status(404).json({ message: "no user found" });
  }
  return res.status(200).json({ user });
};

/*const refreshToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  //console.log(cookies);
  const prevToken = cookies.split("=")[1];
  if (!prevToken) {
    return res.status(400).json({ message: "couldn't find token" });
  }
  jwt.verify(String(prevToken), secretKey, (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Authentication failed" });
    }
    res.clearCookie(`${user.id}`);
    req.cookies[`${user.id}`] = "";
    const token = jwt.sign({ id: user.id }, secretKey, {
      expiresIn: "24h",
    });
    res.cookie(String(user.id), token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 23),
    });
    req.id = user.id;
    next();
  });
};*/
const logout = (req, res, next) => {
  const cookies = req.headers.cookie;
  console.log(cookies);
  const prevToken = cookies.split("=")[1];
  if (!prevToken) {
    return res.status(400).json({ message: "could not find token" });
  }
  jwt.verify(String(prevToken), secretKey, (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Authentication failed" });
    }
    res.clearCookie(`${user.id}`);
    req.cookies[`${user.id}`] = "";
    res.status(200).json({ message: "successfully logout" });
  });
};
const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(error);
  }
  //console.log(users);
  if (!users) {
    return res.status(404).json({ message: "no user found" });
  }
  return res.status(200).json({ users });
};

exports.signup = signup;
exports.login = login;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
//exports.refreshToken = refreshToken;
exports.logout = logout;
exports.getAllUser = getAllUser;
exports.getAnotherUser = getAnotherUser;
