import { error } from "console";
import Student from "../models/Student.js";
import jwt from "jsonwebtoken"
export const loginStudent = async (req, res) => {
  try {
    console.log("Raw request body:", req.body);
    console.log("the post method from frontend came");
    const { email, password } = req.body;
    console.log("EMAIL from server", email, password);
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    const student=await Student.findOne({email})
    if(!student){
      return res.status(401).json({error:"User not found"})
    }
    const isMatch=await student.comparePassword(password)
    if(!isMatch){
      return res.status(401).json({error:"invalid credentiols"})
    }
    const token=jwt.sign(
      {id:student._id,email:student.email},
      process.env.JWT_SECRET,
      {expiresIn:"1h"}

    )
    res.json({ message: "login successfully",token, student });
  } catch (err) {
    console.error("Error in POST /api/loginstudent:", err.message);
    res.status(500).json({ error: err.message });
  }
};

export const getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id);
    if (!student) return res.status(404).json({ error: "User not found" });
    res.json({ name: student.name, email: student.email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const registerStudent = async (req, res) => {
  console.log("from register");
  try {
    const { name, email, password } = req.body;
    console.log("name from register",name)
    const image = req.file ? req.file.buffer.toString("base64") : null; 
    if (!email || !name || !password) {
      return res.status(400).json({ error: "Name, email, and password didn't come" });
    }
    const student = new Student({ name, email, password, image });
    console.log("student from register",student )
    await student.save();
    res.json({ message: "Registration successful", student });
  } catch (error) {
    console.error("Error in POST /register:", error.message);
    res.status(500).json({ error: error.message }); 
  }
};