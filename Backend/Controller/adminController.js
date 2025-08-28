import jwt from "jsonwebtoken"
import Student from "../models/Student.js"
import { error } from "console"

export const GetForAdmin=async(req,res)=>{
  try {
    const student=await Student.find()
    console.log("student",student)
    res.status(200).json(student)
  } catch (error) {
    console.error("error from backend ",error)
    res.status(500).json({message:"internal from dash"})
  }
}

export const AdminLogin = async (req, res) => {
  console.log("reached in adminlogin controller");
  const { email, password } = req.body;

  if (email === "admin@gmail.com" && password === "admin123") {
    try {
      const token = jwt.sign(
        { email: email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // ✅ Send token to frontend
      return res.json({ success: true, token });
    } catch (err) {
      console.error("JWT error:", err);
      return res.status(500).json({ success: false, message: "Token generation failed" });
    }
  } else {
    return res.status(401).json({ success: false, message: "Invalid admin credentials" });
  }
};

export const UpdateStudent=async(req,res)=>{
    try {
        const {name,password}=req.body;
        const student=await Student.findById(req.params.id)
        if(!student){
            return res.status(404).json({error:"student not found"})
        }
        if(name)student.name=name;
        if(password)student.password=password;
        await student.save()
        res.json({message:"student updated succesfully",student})
        
    } catch (error) {
        res.status(500).json({error:err.message})
    }

}

 export const DeleteStudent=async(req,res)=>{
    try {
        const {id} =req.params
        console.log("id from deletestuden",id)
        const deletedstudent=await Student.findByIdAndDelete(id)
        if(!deletedstudent){
            return res.status(404).json({message:"student not found"})
        }
        return res.status(200).json({message:"student deleted succesfully"})
        
    } catch (error) {
        console.error("error from deletestudent",error)
        return res.status(500).json({message:"server error"})
        
    }
 }

 export const CreateStudent = async (req, res) => {
   console.log("from register");
   try {
     const { name, email, password } = req.body;
     console.log("name from register",name)
     const image = req.file ? req.file.buffer.toString("base64") : null; // Fixed typo
     if (!email || !name || !password) {
       return res.status(400).json({ error: "Name, email, and password didn't come" });
     }
     const student = new Student({ name, email, password, image });
     console.log("student from register",student )
     await student.save();
     res.json({ message: "Registration successful", student });
   } catch (error) {
     console.error("Error in POST /register:", error.message);
     res.status(500).json({ error: error.message }); // Fixed to use error
   }
 };