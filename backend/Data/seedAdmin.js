import Admin from "../models/createUser.js";

const Admins = [
  {
    name: "Sanjula",
    email: "sdulshan10@gmail.com",
    status: true,
    temPassword: "12345678",
  },
  {
    name: "Dilsha",
    email: "dilsha99t@gmail.com",
    status: true,
    temPassword: "12345678",
  },
];

const seedAdmin = async () => {
  try {
    await Admin.deleteMany({});
    await Admin.create(Admins);
    console.log("Admin Created...");
  } catch (err) {
    console.log("Admin Creation Failed...", err.message);
  }
};

export default seedAdmin;
