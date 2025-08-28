import React from "react";
import { useSelector } from "react-redux";

function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 p-6 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full transform transition-all hover:scale-105 hover:shadow-2xl duration-300">
        {user ? (
          <>
            <div className="text-center">
              <h1 className="text-3xl font-extrabold text-gray-900 mb-6 tracking-tight">
                Welcome, {user.email.split("@")[0] || user.email || "User"}
              </h1>
              <div className="space-y-4">
                <p className="text-base text-gray-700">
                  <span className="font-semibold">Email:</span>{" "}
                  <span className="text-gray-600">{user.email}</span>
                </p>
                <p className="text-base text-gray-700">
                  <span className="font-semibold">Password:</span>{" "}
                  <span className="text-gray-400 font-medium">****</span>
                </p>
              </div>
              {user.image && (
                <img
                  src={user.image}
                  alt="Profile"
                  className="w-32 h-32 rounded-full mx-auto mt-6 object-cover border-4 border-blue-200 shadow-md"
                />
              )}
            </div>
            <div className="text-center mt-8">
              <p className="text-sm text-gray-500 italic">
                Update your profile image via the Profile section.
              </p>
            </div>
          </>
        ) : (
          <p className="text-center text-lg text-gray-600 font-medium">
            No user data found
          </p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;