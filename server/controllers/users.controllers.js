//Imports
require("dotenv").config();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Controller Class
const generateTokens = async (user) => {
  const {
    REFRESH_SECRET,
    ACCESS_SECRET,
    REFRESH_EXPIRATION,
    ACCESS_EXPIRATION,
  } = process.env;

  const refreshToken = jwt.sign(user, REFRESH_SECRET, {
    expiresIn: REFRESH_EXPIRATION + "s",
  });
  const accessToken = jwt.sign(user, ACCESS_SECRET, {
    expiresIn: ACCESS_EXPIRATION + "s",
  });

  return { access: accessToken, refresh: refreshToken };
};

const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Enter all fields" });
  }

  let foundUser = await User.findOne({ email: email });
  if (foundUser) return res.status(400).json({ message: "User already exists" });

  let newUser = new User({ username, email, password });

  const salt = bcrypt.genSaltSync(10);
  const hash = await bcrypt.hash(newUser.password, salt);

  newUser.password = hash;
  const hUser = await newUser.save();
  
  const { access, refresh } = await generateTokens(userData);

  res.cookie("jwt_refresh", refresh, {
    httpOnly: true, //Accessible only by the web server
    secure: true,
    sameSite: "none",
    maxAge: Number(process.env.REFRESH_EXPIRATION) * 1000,
  });

  res.json({
    access,
    user: { id: hUser.id, username: hUser.username, email: hUser.email },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Missing Username or Password" });
  }

  let foundUser = await User.findOne({ email: email });
  if (!foundUser)
    return res.status(401).json({ message: "User does not exist exists" });

  //validate pass
  const isMatch = await bcrypt.compare(password, foundUser.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid Credentials" });
  } else {
    const userData = {
      id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email,
    };
    const { access, refresh } = await generateTokens(userData);
    res.cookie("jwt_refresh", refresh, {
      httpOnly: true, //Accessible only by the web server
      secure: true,
      sameSite: "none",
      maxAge: Number(process.env.REFRESH_EXPIRATION) * 1000,
    });
    res.json({ access, user: userData });
  }
};

const refresh = async (req, res) => {
  const cookies = req.cookies

  if (!cookies?.jwt_refresh) return res.status(401).json({ message: 'Unauthorized' })

  const refreshToken = cookies.jwt_refresh
  try {
   const decoded = jwt.verify( refreshToken, process.env.REFRESH_SECRET)
   
   let foundUser = await User.findOne({ email: decoded.email });

   if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

   const userData = {
    id: decoded.id,
    username: decoded.username,
    email: decoded.email,
  };

   const accessToken = jwt.sign(userData, process.env.ACCESS_SECRET, {
    expiresIn: process.env.ACCESS_EXPIRATION + "s",
  });

   res.json({ access: accessToken })
  } catch(err){
    return res.status(403).json({ message: 'Forbidden' })
  }
}

const logout = async (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt_refresh) return res.sendStatus(204) //No content
  res.clearCookie('jwt_refresh', { httpOnly: true, sameSite: 'None', secure: true })
  res.json({ message: 'Cookie cleared' })
}

module.exports = { login, register, refresh, logout};
