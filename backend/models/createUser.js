import mongoose from "mongoose";
const Schema = mongoose.Schema;

const createUserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    temPassword: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const CreateUser = mongoose.model("CreateUser", createUserSchema);
export default CreateUser;
