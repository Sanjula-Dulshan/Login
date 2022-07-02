import mongoose from "mongoose";
import seedAdmin from "./Data/seedAdmin.js";

//Database connection
const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("MongoDB Connected...");
      seedAdmin();
    })
    .catch((err) => {
      console.log("MongoDB connection Failed...", err.message);
      process.exit();
    });
};
export default connectDB;
