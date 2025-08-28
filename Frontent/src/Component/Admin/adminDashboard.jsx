import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddButton from "../../assets/AddButton.png";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get("http://localhost:3000/api/getStudent")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/api/updateStudent/${editUser._id}`, {
        name: editName,
        password: editPassword,
      });
      setEditUser(null);
      fetchUsers();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const DeleteStudent = async (id) => {
    if (!window.confirm("do you really want to delete")) return;

    try {
      await axios.delete(`http://localhost:3000/api/deleteStudent/${id}`);
      setUsers(users.filter((user) => user._id !== id));
      toast.success("deleted succusfully");
    } catch (error) {
      console.error("error from admindashboard fetch issue", error);
      toast.error("error in deleting");
    }
  };

  const handleCreate = () => {
    try {
      navigate("/create");
    } catch (error) {
      console.error("error from handle create", error);
    }
    console.log("in handle create");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 p-6">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Users List
          </h2>
          <button onClick={handleCreate} className="focus:outline-none">
            <img
              src={AddButton}
              alt="Add User"
              className="w-8 h-8 transform hover:scale-110 transition-transform duration-200"
            />
          </button>
        </div>

        {editUser && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Edit User</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                  onClick={() => setEditUser(null)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  onClick={handleUpdate}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {users.length === 0 ? (
          <p className="text-center text-lg text-gray-600 font-medium">
            Loading users...
          </p>
        ) : (
          <div className="overflow-x-auto shadow-lg rounded-xl">
            <table className="w-full bg-white border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-4 font-semibold text-gray-700">Name</th>
                  <th className="p-4 font-semibold text-gray-700">Email</th>
                  <th className="p-4 font-semibold text-gray-700">Profile</th>
                  <th className="p-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-t hover:bg-gray-50">
                    <td className="p-4">{user.name || "N/A"}</td>
                    <td className="p-4">{user.email || "N/A"}</td>
                    <td className="p-4">
                      {user.image ? (
                        <img
                          src={`data:image/png;base64,${user.image}`}
                          alt="profile"
                          className="w-14 h-14 rounded-full object-cover border-2 border-blue-200"
                        />
                      ) : (
                        <span className="text-gray-500">No Image</span>
                      )}
                    </td>
                    <td className="p-4 flex space-x-2">
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition"
                        onClick={() => {
                          setEditUser(user);
                          setEditName(user.name);
                          setEditPassword("");
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                        onClick={() => DeleteStudent(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;