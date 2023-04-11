import express from "express";
import {
  activateEmail,
  forgotPassword,
  getAccessToken,
  getAllUsersInfo,
  getUserInfo,
  loginUser,
  logout,
  registerUser,
  resetPassword,
} from "../controllers/userCtrl.js";
import auth from "../middleware/auth.js";
import authAdmin from "../middleware/authAdmin.js";
const router = express.Router();

router.post("/login", loginUser);
router.post("/refresh_token", getAccessToken);
router.post("/forgot", forgotPassword);
router.post("/reset", auth, resetPassword);
router.post("/register", registerUser);
router.post("/activation", activateEmail);
router.get("/allUsers", auth, authAdmin, getAllUsersInfo);
router.get("/information", auth, getUserInfo);
router.get("/logout", logout);

export default router;
