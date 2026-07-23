import { useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const [profileData, setProfileData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@university.edu",
    department: "Computer Science & Engineering",
    studentId: "STU-8942-2026",
    university: "Stanford University / Tech Portal",
    academicLevel: "Senior (Class of 2026)",
    phone: "+1 (555) 234-5678",
  });

  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Edit Profile Form State
  const [editForm, setEditForm] = useState({ ...profileData });

  // Change Password Form State
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfileData({ ...editForm });
    setShowEditModal(false);
    showToast("Profile details updated successfully!");
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }
    setPasswordError("");
    setShowPasswordModal(false);
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    showToast("Password updated successfully!");
  };

  return (
    <div className="profile-page-wrapper">
      {/* Background Animated Glows */}
      <div className="profile-bg-glow profile-bg-glow-1"></div>
      <div className="profile-bg-glow profile-bg-glow-2"></div>
      <div className="profile-bg-glow profile-bg-glow-3"></div>

      {/* Navigation Header */}
      <header className="profile-navbar">
        <div className="nav-container">
          {/* Brand Logo */}
          <Link to="/dashboard" className="nav-brand">
            <div className="nav-brand-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <rect x="9" y="11" width="6" height="4" rx="1" />
              </svg>
            </div>
            <span className="nav-brand-title">Student Vault Pro</span>
            <span className="nav-brand-badge">PRO</span>
          </Link>

          {/* Nav Links */}
          <nav className="nav-links">
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
            <Link to="/myfiles" className="nav-link">
              My Files
            </Link>
            <Link to="/upload" className="nav-link">
              Upload
            </Link>
            <Link to="/profile" className="nav-link active">
              Profile
            </Link>
          </nav>

          {/* User Profile & Logout */}
          <div className="nav-user-profile">
            <div className="user-avatar">
              {profileData.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="user-info">
              <span className="user-name">{profileData.name}</span>
              <span className="user-role">{profileData.department}</span>
            </div>
            <Link to="/login" className="logout-btn" title="Sign Out">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span>Logout</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="profile-content">
        {/* Toast Notification */}
        {toastMessage && (
          <div
            style={{
              position: "fixed",
              bottom: "24px",
              right: "24px",
              zIndex: 1000,
              background: "rgba(15, 23, 42, 0.95)",
              border: "1px solid rgba(96, 165, 250, 0.4)",
              color: "#ffffff",
              padding: "12px 20px",
              borderRadius: "14px",
              fontSize: "14px",
              fontWeight: 600,
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#34d399"
              strokeWidth="2.5"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Page Banner Header */}
        <section className="glass-card profile-header-card">
          <div>
            <h1 className="profile-page-title">Account & Vault Profile</h1>
            <p className="profile-page-subtitle">
              Manage your personal student information, encryption credentials, and security preferences.
            </p>
          </div>

          <div className="verification-status-pill">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
            <span>Verified Student Account</span>
          </div>
        </section>

        {/* Main Grid: Student Hero Card & Info Sections */}
        <section className="profile-main-grid">
          {/* Left Column: Student Profile Hero Card */}
          <div className="glass-card profile-hero-card">
            {/* Avatar with Camera Overlay */}
            <div className="avatar-wrapper-large">
              <div className="large-avatar">
                {profileData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <button
                className="avatar-edit-badge"
                title="Change Avatar"
                onClick={() => showToast("Avatar upload feature opened.")}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </button>
            </div>

            {/* Profile Info */}
            <div>
              <h2 className="profile-hero-name">{profileData.name}</h2>
              <p className="profile-hero-email">{profileData.email}</p>
              <div className="profile-department-badge">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
                <span>{profileData.department}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="profile-actions-stack">
              <button
                className="btn-primary-action"
                onClick={() => {
                  setEditForm({ ...profileData });
                  setShowEditModal(true);
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                <span>Edit Profile</span>
              </button>

              <button
                className="btn-secondary-action"
                onClick={() => setShowPasswordModal(true)}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>Change Password</span>
              </button>
            </div>
          </div>

          {/* Right Column: Account Information, Storage & Security */}
          <div className="right-details-column">
            {/* Account Information Section */}
            <div className="glass-card section-card">
              <h3 className="section-card-title">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#60a5fa"
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>Account Information</span>
              </h3>

              <div className="info-items-grid">
                <div className="info-item-box">
                  <span className="info-item-label">Full Name</span>
                  <span className="info-item-value">{profileData.name}</span>
                </div>

                <div className="info-item-box">
                  <span className="info-item-label">Email Address</span>
                  <span className="info-item-value">{profileData.email}</span>
                </div>

                <div className="info-item-box">
                  <span className="info-item-label">Department / Major</span>
                  <span className="info-item-value">
                    {profileData.department}
                  </span>
                </div>

                <div className="info-item-box">
                  <span className="info-item-label">Student ID</span>
                  <span className="info-item-value">
                    {profileData.studentId}
                  </span>
                </div>

                <div className="info-item-box">
                  <span className="info-item-label">University / Institution</span>
                  <span className="info-item-value">
                    {profileData.university}
                  </span>
                </div>

                <div className="info-item-box">
                  <span className="info-item-label">Academic Status</span>
                  <span className="info-item-value">
                    {profileData.academicLevel}
                  </span>
                </div>
              </div>
            </div>

            {/* Storage Usage Section */}
            <div className="glass-card section-card">
              <h3 className="section-card-title">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
                <span>Storage Usage</span>
              </h3>

              <div className="storage-progress-container">
                <div className="storage-meta-row">
                  <span>Vault Storage Allocated</span>
                  <span style={{ color: "#60a5fa" }}>4.2 GB / 10.0 GB (42%)</span>
                </div>
                <div className="storage-bar-track">
                  <div
                    className="storage-bar-fill"
                    style={{ width: "42%" }}
                  ></div>
                </div>
              </div>

              <div className="storage-breakdown-grid">
                <div className="storage-breakdown-box">
                  <span className="breakdown-title">Academic Files</span>
                  <div className="breakdown-val">2.1 GB (50%)</div>
                </div>
                <div className="storage-breakdown-box">
                  <span className="breakdown-title">Certificates</span>
                  <div className="breakdown-val">1.2 GB (28%)</div>
                </div>
                <div className="storage-breakdown-box">
                  <span className="breakdown-title">Identity Docs</span>
                  <div className="breakdown-val">0.9 GB (22%)</div>
                </div>
              </div>
            </div>

            {/* Security Settings Section */}
            <div className="glass-card section-card">
              <h3 className="section-card-title">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#34d399"
                  strokeWidth="2"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>Security Settings</span>
              </h3>

              <div className="security-list">
                <div className="security-item-row">
                  <div className="security-left">
                    <div className="security-icon">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                    <div className="security-text">
                      <span className="security-title">
                        Two-Factor Authentication (2FA)
                      </span>
                      <span className="security-desc">
                        Require an authentication code for login
                      </span>
                    </div>
                  </div>
                  <button
                    className="toggle-switch-btn"
                    onClick={() => {
                      setIsTwoFactorEnabled(!isTwoFactorEnabled);
                      showToast(
                        `2FA turned ${!isTwoFactorEnabled ? "ON" : "OFF"}`
                      );
                    }}
                  >
                    {isTwoFactorEnabled ? "ENABLED ✓" : "DISABLED"}
                  </button>
                </div>

                <div className="security-item-row">
                  <div className="security-left">
                    <div className="security-icon">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="16" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12.01" y2="8" />
                      </svg>
                    </div>
                    <div className="security-text">
                      <span className="security-title">
                        AES-256 Vault Encryption
                      </span>
                      <span className="security-desc">
                        End-to-end cloud encryption key active
                      </span>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: "12.5px",
                      fontWeight: 700,
                      color: "#34d399",
                    }}
                  >
                    ACTIVE ✓
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div
            className="modal-glass-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3 className="modal-title">Edit Profile Information</h3>
              <button
                className="close-modal-btn"
                onClick={() => setShowEditModal(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="modal-form">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="styled-modal-input"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="styled-modal-input"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Department / Major</label>
                <input
                  type="text"
                  className="styled-modal-input"
                  value={editForm.department}
                  onChange={(e) =>
                    setEditForm({ ...editForm, department: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Student ID</label>
                <input
                  type="text"
                  className="styled-modal-input"
                  value={editForm.studentId}
                  onChange={(e) =>
                    setEditForm({ ...editForm, studentId: e.target.value })
                  }
                  required
                />
              </div>

              <button type="submit" className="modal-submit-btn">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowPasswordModal(false)}
        >
          <div
            className="modal-glass-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3 className="modal-title">Change Password</h3>
              <button
                className="close-modal-btn"
                onClick={() => setShowPasswordModal(false)}
              >
                ✕
              </button>
            </div>

            {passwordError && (
              <div
                style={{
                  background: "rgba(239, 68, 68, 0.2)",
                  border: "1px solid rgba(239, 68, 68, 0.4)",
                  color: "#fca5a5",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  fontSize: "13px",
                  marginBottom: "14px",
                }}
              >
                {passwordError}
              </div>
            )}

            <form onSubmit={handleChangePassword} className="modal-form">
              <div className="form-group">
                <label className="form-label">Current Password</label>
                <input
                  type="password"
                  className="styled-modal-input"
                  value={passwordForm.currentPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      currentPassword: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  className="styled-modal-input"
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      newPassword: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Confirm New Password</label>
                <input
                  type="password"
                  className="styled-modal-input"
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      confirmPassword: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <button type="submit" className="modal-submit-btn">
                Update Password
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;