import express from "express";
const router = express.Router();
import {
  createUser,
  firstLogin,
  loginUser,
  getAccessToken,
  resetPassword,
  registerUser,
  getAllUsersInfo,
  getUserInfo,
  logout,
} from "../controllers/userCtrl.js";
import auth from "../middleware/auth.js";
import authAdmin from "../middleware/authAdmin.js";

router.post("/create", createUser);
router.post("/firstLogin", firstLogin);
router.post("/login", loginUser);
router.post("/refresh_token", getAccessToken);
router.post("/reset", auth, resetPassword);
router.post("/register", registerUser);
router.get("/allUsers", auth, authAdmin, getAllUsersInfo);
router.get("/information", auth, getUserInfo);
router.get("/logout", logout);

export default router;
