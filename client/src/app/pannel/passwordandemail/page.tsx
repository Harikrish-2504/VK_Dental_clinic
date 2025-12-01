
"use client";
import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-hot-toast";
import { apiClient } from "@/src/utlis/apiClinet";

export default function PasswordAndEmail() {
  const [showChangeCredentialsForm, setShowChangeCredentialsForm] =
    useState(false);
  const [showCreateUserForm, setShowCreateUserForm] = useState(false);
  const [userRole, setUserRole] = useState("");

  // Change Credentials State
  const [oldEmail, setOldEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loadingChange, setLoadingChange] = useState(false);

  // Create User State
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loadingCreate, setLoadingCreate] = useState(false);

  useEffect(() => {
    // Get user role from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserRole(user.role);
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }
  }, []);

  const handleChangeCredentials = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoadingChange(true);
      const response = await apiClient(`/auth/update-credentials`, {
        method: "PUT",
        body: JSON.stringify({
          oldEmail,
          oldPassword,
          newEmail,
          newPassword,
        }),
      });

      setLoadingChange(false);

      if (response.success) {
        toast.success("Email and Password updated successfully");
        setShowChangeCredentialsForm(false);
        // Reset form
        setOldEmail("");
        setOldPassword("");
        setNewEmail("");
        setNewPassword("");

        // Update localStorage with new email
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const user = JSON.parse(storedUser);
          user.email = newEmail;
          localStorage.setItem("user", JSON.stringify(user));
        }
      } else {
        toast.error(response.message || "Failed to update credentials");
      }
    } catch (error) {
      console.error(error);
      setLoadingChange(false);
      toast.error("Server error. Try again later.");
    }
  };

  const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoadingCreate(true);
      const response = await apiClient(`/auth/create-user`, {
        method: "POST",
        body: JSON.stringify({
          name: userName,
          email: userEmail,
          password: userPassword,
        }),
      });

      setLoadingCreate(false);

      if (response.success) {
        toast.success("User created successfully");
        setShowCreateUserForm(false);
        // Reset form
        setUserName("");
        setUserEmail("");
        setUserPassword("");
      } else {
        toast.error(response.message || "Failed to create user");
      }
    } catch (error) {
      console.error(error);
      setLoadingCreate(false);
      toast.error("Server error. Try again later.");
    }
  };

  return (
    <div className="lg:ml-60 px-4 relative min-h-screen">
      {/* Action Buttons */}
      <div className="flex justify-end gap-4 my-6 flex-wrap">
        <button
          className="bg-[#44BBEE] text-white font-medium lg:text-lg text-sm py-3 px-7 rounded-xl hover:bg-[#3aa5d8] transition-colors"
          onClick={() => setShowChangeCredentialsForm(true)}
        >
          Change Password & Email
        </button>

        {userRole === "superadmin" && (
          <button
            className="bg-[#E68120] text-white font-medium lg:text-lg text-sm py-3 px-7 rounded-xl hover:bg-[#d17316] transition-colors"
            onClick={() => setShowCreateUserForm(true)}
          >
            Create New User
          </button>
        )}
      </div>

      {/* Welcome Section */}
      <div className="px-4 h-[calc(100vh-150px)] flex flex-col justify-center items-center gap-5">
        <h1 className="text-4xl font-semibold text-[#E68120] text-center">
          Welcome to Admin Panel
        </h1>
        <p className="text-2xl font-medium text-[#44BBEE]">VKV Dental Clinic</p>
      </div>

      {/* Change Credentials Modal */}
      {showChangeCredentialsForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <form
            onSubmit={handleChangeCredentials}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative max-h-[90vh] overflow-y-auto"
          >
            <button
              type="button"
              onClick={() => setShowChangeCredentialsForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <IoMdClose className="text-2xl" />
            </button>

            <h2 className="text-2xl font-semibold text-[#E68120] mb-6">
              Update Credentials
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-[#ce7b00] font-medium text-sm">
                  Old Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E68120] focus:border-transparent"
                  value={oldEmail}
                  onChange={(e) => setOldEmail(e.target.value)}
                  placeholder="Enter old email"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-[#ce7b00] font-medium text-sm">
                  Old Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E68120] focus:border-transparent"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Enter old password"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-[#ce7b00] font-medium text-sm">
                  New Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E68120] focus:border-transparent"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Enter new email"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-[#ce7b00] font-medium text-sm">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E68120] focus:border-transparent"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => setShowChangeCredentialsForm(false)}
                className="flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loadingChange}
                className="flex-1 bg-[#18a000] text-white px-6 py-3 rounded-xl font-medium disabled:opacity-70 disabled:cursor-not-allowed hover:bg-[#159000] transition-colors"
              >
                {loadingChange ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Create User Modal (Super Admin Only) */}
      {showCreateUserForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <form
            onSubmit={handleCreateUser}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative"
          >
            <button
              type="button"
              onClick={() => setShowCreateUserForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <IoMdClose className="text-2xl" />
            </button>

            <h2 className="text-2xl font-semibold text-[#E68120] mb-6">
              Create New User
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-[#ce7b00] font-medium text-sm">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E68120] focus:border-transparent"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter user name"
                  required
                  maxLength={50}
                />
              </div>

              <div>
                <label className="block mb-2 text-[#ce7b00] font-medium text-sm">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E68120] focus:border-transparent"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="Enter user email"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-[#ce7b00] font-medium text-sm">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E68120] focus:border-transparent"
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => setShowCreateUserForm(false)}
                className="flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loadingCreate}
                className="flex-1 bg-[#18a000] text-white px-6 py-3 rounded-xl font-medium disabled:opacity-70 disabled:cursor-not-allowed hover:bg-[#159000] transition-colors"
              >
                {loadingCreate ? "Creating..." : "Create User"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
