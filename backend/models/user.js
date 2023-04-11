import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "temporary password is required"],
    },

    accountType: {
      type: String,
      default: "student",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
