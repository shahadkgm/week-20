import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../Sources/reducer/AuthSlice";

function Profile({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [IsSubmitting, setIsSubmitting] = useState(false);

  // Prefill user data when modal opens
  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
      setPassword(user.password || "");
      setImage(user.image || null);
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  // Convert file to base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const userData = { ...user, email, password, image };
      dispatch(setUser(userData));
      alert("Profile updated successfully!");
      onClose();
    } catch (error) {
      alert("Failed to update profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-96 p-6 relative animate-fadeIn">

        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
          {/* Profile   */}
          <div className="flex flex-col items-center space-y-3">
            {image ? (
              <img
                src={image}
                alt="Preview"
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 shadow"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}

            <input
              type="file"
              id="fileInput"
              accept=".png,.jpeg,.jpg"
              onChange={handleImageChange}
              className="hidden"
            />
            <label
              htmlFor="fileInput"
              className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-full text-sm shadow hover:bg-blue-700 transition"
            >
              Upload Image
            </label>
          </div>

         
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Edit your email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

       
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Edit your password"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

      
          <button
            type="submit"
            disabled={IsSubmitting}
            className={`w-full py-3 rounded-lg font-medium text-white transition ${
              IsSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {IsSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </form>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default Profile;
