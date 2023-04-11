import User from "../models/user.js";

const authAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    console.log("user", user);

    if (user?.accountType != "admin")
      return res.status(500).json({ msg: "Admin resources access denied." });

    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
};
export default authAdmin;
