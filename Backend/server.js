import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Student from "./models/Student.js";
import dotenv from "dotenv";
import routes from "./Routes/userRoutes.js"
import multer from "multer";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; // Match this with the frontend's fetch URL
console.log("PORT:", process.env.PORT || 3000);



const storage=multer.memoryStorage();
const upload=multer({
  storage:storage,
  limits:{
    fileSize:5*1024*1024
  }
})

app.use(cors());
app.use(express.json({limit:"10mb"}));
app.use(express.urlencoded({extended:true,limit:"10mb"}))

app.use(upload.single("image"))
app.use("/",routes)



mongoose
  .connect("mongodb://localhost:27017/user-react", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to user-react");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});