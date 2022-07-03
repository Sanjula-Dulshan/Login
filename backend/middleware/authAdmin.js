import User from "../models/createUser.js";

const authAdmin = async (req, res, next) => {
  try {
    console.log("user", req.user);
    const user = await User.findOne({ _id: req.user.id });

    if (user.accountType != "admin")
      return res.status(500).json({ msg: "Admin resources access denied." });

    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
};
export default authAdmin;
