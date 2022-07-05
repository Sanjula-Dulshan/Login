import mongoose from "mongoose";
const Schema = mongoose.Schema;

const createUserSchema = new Schema(
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
      required: [true, "Account Type is required"],
    },
    isFirstLogin: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const CreateUser = mongoose.model("CreateUser", createUserSchema);
export default CreateUser;
