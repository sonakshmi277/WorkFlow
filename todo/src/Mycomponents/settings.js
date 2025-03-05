import React, { useState } from "react";
import "./settings.css";
import axios from "axios";

export default function Settings() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmUsername, setConfirmUsername] = useState("");
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [showUsernamePrompt, setShowUsernamePrompt] = useState(false);

  const handleSave = async () => {
    if (!email && !username) {
      alert("Please enter an email or username to update.");
      return;
    }

    setShowUsernamePrompt(true);
    
    try {
      const response = await axios.post("http://localhost:5000/update_email_username", {
        email: email,
        userName: username,
      });

      alert(response.data.message || "Email & Username updated successfully!");
      setEmail("");
      setUsername("");
      setShowUsernamePrompt(false);
    } catch (error) {
      console.error("Error updating email and username:", error);
      alert(error.response?.data?.message || "Failed to update email/username.");
    }
  };

  const handleChangePassword = () => {
    setShowPasswordPrompt(true);
  };

  const handleConfirmPasswordChange = async () => {
    if (!confirmUsername || !newPassword) {
      alert("Please enter both username and new password.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/update_pass", {
        userName: confirmUsername,
        password: newPassword,
      });

      alert(response.data.message || "Password updated successfully!");
      setConfirmUsername("");
      setNewPassword("");
      setShowPasswordPrompt(false);
    } catch (error) {
      console.error("Error updating password:", error);
      alert(error.response?.data?.message || "Failed to update password.");
    }
  };

  return (
    <div className="settings-wrapper">
      <div className="settings-container">
        <div className="settings-header">Settings</div>
     <div className="input-group">
          <label>Change Email</label>
          <input
            type="email"
            value={email}
            placeholder="Enter new email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Change Username</label>
          <input
            type="text"
            value={username}
            placeholder="Enter new username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <button className="save-button" onClick={handleSave}>Save Changes</button>
        <button className="change-password-button" onClick={handleChangePassword}>
          Change Password
        </button>
        {showPasswordPrompt && (
          <div className="modal">
            <div className="modal-content">
              <h3>Change Password</h3>
              <input
                type="text"
                placeholder="Enter your username"
                value={confirmUsername}
                onChange={(e) => setConfirmUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button className="confirm-button" onClick={handleConfirmPasswordChange}>
                Confirm
              </button>
              <button className="cancel-button" onClick={() => setShowPasswordPrompt(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}
        {showUsernamePrompt && (
          <div className="modal">
            <div className="modal-content">
              <h3>Confirm Username Change</h3>
              <input
                type="password"
                placeholder="Enter your password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button className="confirm-button" onClick={handleSave}>
                Confirm
              </button>
              <button className="cancel-button" onClick={() => setShowUsernamePrompt(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
