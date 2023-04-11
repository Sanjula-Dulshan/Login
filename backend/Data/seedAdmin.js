import bcrypt from "bcrypt";
import Admin from "../models/user.js";

const temPasswordHash = await bcrypt.hash("12345678", 12);

const Admins = [
  {
    id: "1",
    name: "sanjula",
    email: "sdulshan10@gmail.com",
    accountType: "admin",
    password: temPasswordHash,
  },
];

const seedAdmin = async () => {
  try {
    await Admin.deleteOne({ accountType: "admin" });
    await Admin.create(Admins);
    console.log("Admin Created...");
  } catch (err) {
    console.log("Admin Creation Failed...", err.message);
  }
};

export default seedAdmin;
