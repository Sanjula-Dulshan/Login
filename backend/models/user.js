import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    id: {
      type: Number,
      required: [true, "id is required"],
    },
    firstName: {
      type: String,
      required: [true, "First Name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of Birth is required"],
    },
    mobile: {
      type: Number,
      required: [true, "Mobile is required"],
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
