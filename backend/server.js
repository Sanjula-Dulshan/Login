import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./connectDB.js";

dotenv.config();
const app = express();

//server run in this port 8070
const PORT = 8070;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//Connect data base
connectDB();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
