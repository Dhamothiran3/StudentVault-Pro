import { useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("All");
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const sampleFiles = [
    {
      id: 1,
      name: "Fall_2025_Official_Transcript.pdf",
      category: "Academic",
      size: "2.4 MB",
      date: "2 hours ago",
      type: "pdf",
    },
    {
      id: 2,
      name: "Machine_Learning_Certification.pdf",
      category: "Certificates",
      size: "1.8 MB",
      date: "Yesterday",
      type: "pdf",
    },
    {
      id: 3,
      name: "University_Student_ID_Card.png",
      category: "Identity",
      size: "3.1 MB",
      date: "Jul 20, 2026",
      type: "img",
    },
    {
      id: 4,
      name: "Algorithms_Final_Assignment.docx",
      category: "Academic",
      size: "850 KB",
      date: "Jul 18, 2026",
      type: "doc",
    },
    {
      id: 5,
      name: "Scholarship_Award_Letter.pdf",
      category: "Certificates",
      size: "1.2 MB",
      date: "Jul 15, 2026",
      type: "pdf",
    },
  ];

  const filteredFiles =
    activeTab === "All"
      ? sampleFiles
      : sampleFiles.filter((f) => f.category === activeTab);

  return (
    <div className="dashboard-page-wrapper">
      {/* Background Animated Glows */}
      <div className="dashboard-bg-glow dashboard-bg-glow-1"></div>
      <div className="dashboard-bg-glow dashboard-bg-glow-2"></div>
      <div className="dashboard-bg-glow dashboard-bg-glow-3"></div>

      {/* Navigation Header */}
      <header className="dashboard-navbar">
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
            <Link to="/dashboard" className="nav-link active">
              Dashboard
            </Link>
            <Link to="/myfiles" className="nav-link">
              My Files
            </Link>
            <Link to="/upload" className="nav-link">
              Upload
            </Link>
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
          </nav>

          {/* User Profile & Logout */}
          <div className="nav-user-profile">
            <div className="user-avatar">AJ</div>
            <div className="user-info">
              <span className="user-name">Alex Johnson</span>
              <span className="user-role">Computer Science</span>
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

      {/* Main Dashboard Content */}
      <main className="dashboard-content">
        {/* Toast Notification */}
        {toastMessage && (
          <div
            style={{
              position: "fixed",
              bottom: "24px",
              right: "24px",
              zIndex: 1000,
              background: "rgba(15, 23, 42, 0.9)",
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

        {/* Welcome Card Section */}
        <section className="glass-card welcome-hero-card">
          <div className="welcome-text-content">
            <div className="welcome-pill-tag">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>Student Vault Pro • Verified Academic Portal</span>
            </div>
            <h1 className="welcome-title">Welcome back, Alex! 👋</h1>
            <p className="welcome-subtitle">
              Your academic vault is active & updated. All your transcripts, diplomas, and ID cards are securely encrypted with AES-256 storage.
            </p>
            <div className="welcome-hero-actions">
              <Link to="/upload" className="primary-hero-btn">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <span>Upload New File</span>
              </Link>
              <Link to="/myfiles" className="secondary-hero-btn">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                </svg>
                <span>Browse Vault</span>
              </Link>
            </div>
          </div>

          <div className="welcome-hero-badge">
            <div className="security-status-card">
              <div className="status-label">Vault Security</div>
              <div className="status-val">
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
                <span>Encrypted & Safe</span>
              </div>
            </div>

            <div className="security-status-card">
              <div className="status-label">Storage Capacity</div>
              <div
                className="status-val"
                style={{ color: "#60a5fa" }}
              >
                <span>4.2 GB / 10 GB (42%)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Metrics Cards Grid */}
        <section className="stats-cards-grid">
          {/* Total Files Card */}
          <div className="glass-card glass-card-hover stat-card">
            <div className="stat-card-header">
              <div className="stat-icon-wrapper icon-blue">
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
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <div className="stat-trend trend-up">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <polyline points="18 15 12 9 6 15" />
                </svg>
                <span>+3 this week</span>
              </div>
            </div>
            <div className="stat-card-body">
              <div className="stat-number">24</div>
              <div className="stat-label">Total Files</div>
              <div className="stat-subtext">All verified documents in vault</div>
            </div>
          </div>

          {/* Categories Card */}
          <div className="glass-card glass-card-hover stat-card">
            <div className="stat-card-header">
              <div className="stat-icon-wrapper icon-cyan">
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
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div className="stat-trend trend-neutral">
                <span>4 Active Types</span>
              </div>
            </div>
            <div className="stat-card-body">
              <div className="stat-number">4</div>
              <div className="stat-label">Categories</div>
              <div className="category-pills-row">
                <span className="cat-pill">
                  <span className="cat-dot cat-dot-blue"></span> Academic (10)
                </span>
                <span className="cat-pill">
                  <span className="cat-dot cat-dot-emerald"></span> Certificates (8)
                </span>
                <span className="cat-pill">
                  <span className="cat-dot cat-dot-amber"></span> Identity (4)
                </span>
                <span className="cat-pill">
                  <span className="cat-dot cat-dot-purple"></span> Others (2)
                </span>
              </div>
            </div>
          </div>

          {/* Storage & Encryption Card */}
          <div className="glass-card glass-card-hover stat-card">
            <div className="stat-card-header">
              <div className="stat-icon-wrapper icon-emerald">
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
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </div>
              <div className="stat-trend trend-up">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>Synced</span>
              </div>
            </div>
            <div className="stat-card-body">
              <div className="stat-number">4.2 GB</div>
              <div className="stat-label">Storage Used</div>
              <div className="stat-subtext">5.8 GB remaining in cloud tier</div>
            </div>
          </div>
        </section>

        {/* Main Content Grid: Recent Uploads & Quick Actions */}
        <section className="dashboard-main-grid">
          {/* Recent Uploads Card */}
          <div className="glass-card recent-uploads-card">
            <div className="card-header-row">
              <div className="section-title-group">
                <svg
                  className="section-icon"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <div>
                  <h2 className="section-title">Recent Uploads</h2>
                  <div className="section-subtitle">
                    Latest credentials added to your vault
                  </div>
                </div>
              </div>
              <Link to="/myfiles" className="view-all-link">
                <span>View All Files</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            </div>

            {/* Filter Tabs */}
            <div className="filter-tabs-row">
              {["All", "Academic", "Certificates", "Identity"].map((tab) => (
                <button
                  key={tab}
                  className={`filter-tab ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* File List */}
            <div className="files-list">
              {filteredFiles.map((file) => (
                <div key={file.id} className="file-item-row">
                  <div className="file-info-left">
                    <div
                      className={`file-type-icon ${
                        file.type === "pdf"
                          ? "file-pdf"
                          : file.type === "img"
                          ? "file-img"
                          : "file-doc"
                      }`}
                    >
                      {file.type.toUpperCase()}
                    </div>
                    <div className="file-details">
                      <span className="file-name">{file.name}</span>
                      <div className="file-meta">
                        <span className="file-category-badge">
                          {file.category}
                        </span>
                        <span>{file.size}</span>
                        <span>•</span>
                        <span>{file.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="file-actions-right">
                    <button
                      className="icon-action-btn"
                      title="Preview Document"
                      onClick={() => showToast(`Opening preview for ${file.name}`)}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </button>
                    <button
                      className="icon-action-btn"
                      title="Download Secure File"
                      onClick={() => showToast(`Downloading ${file.name}`)}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Column: Quick Actions & Security Checklist */}
          <div className="sidebar-column">
            {/* Quick Actions Section */}
            <div className="glass-card quick-actions-card">
              <h2 className="quick-actions-title">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#60a5fa"
                  strokeWidth="2.5"
                >
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                <span>Quick Actions</span>
              </h2>

              <div className="quick-buttons-list">
                {/* Upload Files Button */}
                <Link
                  to="/upload"
                  className="quick-action-btn quick-btn-primary"
                >
                  <div className="quick-btn-left">
                    <div
                      className="quick-btn-icon"
                      style={{ background: "rgba(255, 255, 255, 0.15)" }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                    </div>
                    <div className="quick-btn-text">
                      <span className="quick-btn-label">Upload Files</span>
                      <span className="quick-btn-desc">
                        Add & encrypt new documents
                      </span>
                    </div>
                  </div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>

                {/* View My Files Button */}
                <Link
                  to="/myfiles"
                  className="quick-action-btn quick-btn-secondary"
                >
                  <div className="quick-btn-left">
                    <div
                      className="quick-btn-icon"
                      style={{
                        background: "rgba(56, 189, 248, 0.15)",
                        color: "#38bdf8",
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                      </svg>
                    </div>
                    <div className="quick-btn-text">
                      <span className="quick-btn-label">View My Files</span>
                      <span className="quick-btn-desc">
                        Browse all 24 documents
                      </span>
                    </div>
                  </div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>

                {/* Manage Profile */}
                <Link
                  to="/profile"
                  className="quick-action-btn quick-btn-secondary"
                >
                  <div className="quick-btn-left">
                    <div
                      className="quick-btn-icon"
                      style={{
                        background: "rgba(168, 85, 247, 0.15)",
                        color: "#c084fc",
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <div className="quick-btn-text">
                      <span className="quick-btn-label">Account Profile</span>
                      <span className="quick-btn-desc">
                        Security & preferences
                      </span>
                    </div>
                  </div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Security Status Checklist Card */}
            <div className="glass-card security-checklist-card">
              <h3 className="checklist-title">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>Vault Protection</span>
              </h3>

              <div className="checklist-items">
                <div className="check-item">
                  <span className="check-icon">✓</span>
                  <span>AES-256 End-to-End Encryption</span>
                </div>
                <div className="check-item">
                  <span className="check-icon">✓</span>
                  <span>Two-Factor Authentication Active</span>
                </div>
                <div className="check-item">
                  <span className="check-icon">✓</span>
                  <span>Automatic Cloud Backup</span>
                </div>
                <div className="check-item">
                  <span className="check-icon">✓</span>
                  <span>Verified Student ID Credentials</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;