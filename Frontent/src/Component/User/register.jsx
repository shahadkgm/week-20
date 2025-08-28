import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../Sources/reducer/AuthSlice";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import imageCompression from "browser-image-compression"; // Install: npm install browser-image-compression

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);

  // Handle image upload with compression
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) { // Limit to 1MB before compression
        toast.error("Image size must be less than 1MB!");
        return;
      }
      const options = {
        maxSizeMB: 0.5, // Compress to max 0.5MB
        maxWidthOrHeight: 800, // Resize to max 800px
      };
      try {
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result); // Base64 for preview
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        toast.error("Failed to compress image!");
      }
    }
  };

  // Helper function to convert base64 to File
  const dataURLtoFile = (dataURL, filename) => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], filename, { type: mime });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const nameRegex = /^[A-Za-z\s]+$/;

    // Validation checks
    if (!name) {
      toast.error("Name is required!");
      return;
    } else if (!nameRegex.test(name)) {
      toast.error("Name can only contain letters and spaces!");
      return;
    }
    if (!emailRegex.test(email)) {
      toast.error("Please include an '@' in the email address!");
      return;
    }
    // if (!passwordRegex.test(password)) {
    //   toast.error("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character!");
    //   return;
    // }
    if (!image) {
      toast.error("Please upload an image!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    if (image) {
      const file = dataURLtoFile(image, "profile.jpg");
      formData.append("image", file);
    }

    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        body: formData, 
      });
      console.log(`Fetch response status: ${res.status}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || `Registration failed with status ${res.status}`);
      }
      // Store the token and update Redux state without password
      localStorage.setItem("token", data.token);
      dispatch(setUser({ name, email, image })); 
      setName("");
      setEmail("");
      setPassword("");
      setImage(null);
      toast.success("Registered successfully ✅", {
        onClose: () => navigate("/"),
      });
    } catch (error) {
      console.error("Error in POST /register:", error);
      toast.error(error.message || "An error occurred during registration");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter your name"
          
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // type="email"
            placeholder="Enter your email"
            
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
          
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="flex items-center space-x-2 cursor-pointer">
            <span className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600">
              Upload Image
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
          {image && (
            <img
              src={image}
              alt="Preview"
              className="w-16 h-16 object-cover rounded-full border mx-auto"
            />
          )}
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;