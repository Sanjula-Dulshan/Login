import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import sendMail from "./sendMail.js";

//Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        msg: "Please fill all the fields",
      });
    }

    //Check if email already exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "User does not exist",
      });
    }
    //Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        msg: "Password is incorrect",
      });
    }
    //refresh token
    const refresh_token = createRefreshToken({ id: user._id });
    res.cookie("refreshtoken", refresh_token, {
      httpOnly: true,
      path: "/user/refresh_token",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      msg: "Login Success",
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

//Register user
export const registerUser = async (req, res) => {
  try {
    const { id, firstName, lastName, email, password, dateOfBirth, mobile } =
      req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !dateOfBirth ||
      !mobile
    ) {
      return res.status(400).json({
        msg: "Please fill all the fields",
      });
    }

    //Check if email is valid
    if (!validateEmail(email)) {
      return res.status(400).json({
        msg: "Please enter valid email",
      });
    }

    //Check if email already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        msg: "User already exists",
      });
    }

    //Hash the password
    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = {
      id,
      firstName,
      lastName,
      email,
      password: passwordHash,
      dateOfBirth,
      mobile,
    };
    const activation_token = createActivationToken(newUser);

    const url = `${process.env.CLIENT_URL}/user/activate/${activation_token}`;
    console.log("url", url);
    sendMail(email, url, "Verify your email address");
    res.json({
      msg: "Register Success! Please activate your email to start.",
    });
  } catch (err) {
    return res.status(400).json({
      msg: err,
    });
  }
};

//Activate user
export const activateEmail = async (req, res) => {
  try {
    const { activation_token } = req.body;
    const user = jwt.verify(
      activation_token,
      process.env.ACTIVATION_TOKEN_SECRET
    );

    const { id, firstName, lastName, email, password, dateOfBirth, mobile } =
      user;

    const check = await User.findOne({ email });
    if (check)
      return res.status(400).json({ msg: "This email already exists." });

    const newUser = new User({
      id,
      firstName,
      lastName,
      email,
      password,
      dateOfBirth,
      mobile,
    });

    await newUser.save();

    res.json({ msg: "Account has been activated!" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

//Forgot password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: "This email does not exist." });

    const access_token = createAccessToken({ id: user._id });
    const url = `${process.env.CLIENT_URL}/user/reset/${access_token}`;

    console.log("url", url);
    console.log("email", email);
    sendMail(email, url, "Reset your password");
    res.json({ msg: "Password reset link sent" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

//Reset password
export const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    console.log(password);
    const passwordHash = await bcrypt.hash(password, 12);

    await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        password: passwordHash,
      }
    );

    res.json({ msg: "Password successfully changed!" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

//Get all users
export const getAllUsersInfo = async (req, res) => {
  try {
    console.log("getAllUsersInfo", req.user);
    await User.find()
      .select("-password")
      .then((data) => {
        res.status(200).json(data);
      });
  } catch (err) {
    res.status(400).json(err);
  }
};

//Get user information
export const getUserInfo = async (req, res) => {
  console.log("getUserInfo", req.user);
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

//Logout user
export const logout = async (req, res) => {
  try {
    res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
    return res.json({ msg: "Logged out." });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

//get access token
export const getAccessToken = (req, res) => {
  try {
    const rf_token = req.cookies.refreshtoken;
    if (!rf_token) return res.status(400).json({ msg: "Please login now!" });

    jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(400).json({ msg: "Please login now!" });

      const access_token = createAccessToken({ id: user.id });
      res.json({ access_token });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
};

//Check if email is valid format
function validateEmail(email) {
  const regex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  console.log(regex.test(email));
  return regex.test(email);
}

//Create refresh token
const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

//Create access token
const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

//Create activation token
const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "5m",
  });
};
