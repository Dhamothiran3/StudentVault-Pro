import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./Upload.css";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

function Upload() {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Academic");
  const [toastMessage, setToastMessage] = useState("");
  const fileInputRef = useRef(null);

  // Active Uploads Queue (Simulating Progress)
  const [uploadQueue, setUploadQueue] = useState([
    {
      id: 101,
      name: "Fall_2025_Official_Transcript.pdf",
      size: "2.4 MB",
      progress: 100,
      status: "completed",
      category: "Academic",
    },
    {
      id: 102,
      name: "Machine_Learning_Certificate.pdf",
      size: "1.8 MB",
      progress: 78,
      status: "uploading",
      category: "Certificates",
    },
  ]);

  // Recent Uploads Preview Data
  const [recentUploads, setRecentUploads] = useState([
    {
      id: 1,
      name: "University_Student_ID_Card.png",
      size: "3.1 MB",
      type: "img",
      date: "Jul 20, 2026",
    },
    {
      id: 2,
      name: "Algorithms_Assignment_Final.docx",
      size: "850 KB",
      type: "doc",
      date: "Jul 18, 2026",
    },
    {
      id: 3,
      name: "Passport_Verification_Scan.pdf",
      size: "4.5 MB",
      type: "pdf",
      date: "Jul 15, 2026",
    },
  ]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // Drag and Drop Handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      processFiles(files);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      processFiles(files);
    }
  };

  const processFiles = (files) => {
    const newItems = files.map((file, idx) => ({
      id: Date.now() + idx,
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(1) + " MB",
      progress: 15,
      status: "uploading",
      category: selectedCategory,
    }));

    setUploadQueue((prev) => [...newItems, ...prev]);
    showToast(`Uploading ${files.length} file(s) to ${selectedCategory}...`);

    // Simulate progress completion
    newItems.forEach((item) => {
      let currentProgress = 15;
      const interval = setInterval(() => {
        currentProgress += 25;
        if (currentProgress >= 100) {
          currentProgress = 100;
          clearInterval(interval);
          setUploadQueue((prev) =>
            prev.map((q) =>
              q.id === item.id ? { ...q, progress: 100, status: "completed" } : q
            )
          );

          // Add to recent uploads list once completed
          setRecentUploads((prev) => [
            {
              id: item.id,
              name: item.name,
              size: item.size,
              type: item.name.toLowerCase().endsWith(".pdf")
                ? "pdf"
                : item.name.toLowerCase().match(/\.(jpg|png|webp)$/)
                ? "img"
                : "doc",
              date: "Just now",
            },
            ...prev,
          ]);
        } else {
          setUploadQueue((prev) =>
            prev.map((q) =>
              q.id === item.id ? { ...q, progress: currentProgress } : q
            )
          );
        }
      }, 400);
    });
  };

  return (
    <div className="upload-page-wrapper">
      {/* Background Animated Glows */}
      <div className="upload-bg-glow upload-bg-glow-1"></div>
      <div className="upload-bg-glow upload-bg-glow-2"></div>
      <div className="upload-bg-glow upload-bg-glow-3"></div>

      {/* Navigation Header */}
      <header className="upload-navbar">
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
            <Link to="/upload" className="nav-link active">
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

      {/* Main Upload Content */}
      <main className="upload-content">
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

        {/* Page Header Banner */}
        <section className="glass-card upload-header-card">
          <div>
            <div className="header-badge">
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
              <span>AES-256 Cloud Encryption Active</span>
            </div>
            <h1 className="upload-page-title">Upload Academic Credentials</h1>
            <p className="upload-page-subtitle">
              Securely upload and store your official transcripts, certificates, student IDs, and project files with end-to-end encryption.
            </p>
          </div>

          <div className="vault-security-pill">
            <div className="security-pill-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div className="security-pill-text">
              <span className="security-pill-title">Zero-Knowledge Storage</span>
              <span className="security-pill-sub">Protected & Private</span>
            </div>
          </div>
        </section>

        {/* Main Grid: Upload Dropzone & Info Sidebar */}
        <section className="upload-main-grid">
          {/* Left Column: Dropzone & Upload Progress */}
          <div className="left-upload-column">
            {/* Drag and Drop Zone */}
            <div
              className={`glass-card dropzone-card ${
                isDragging ? "dragging" : ""
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="dropzone-icon-circle">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>

              <h2 className="dropzone-title">
                Drag & Drop your documents here
              </h2>
              <p className="dropzone-subtext">
                Supports PDF, Images, Word Documents & Spreadsheets (up to 25 MB per file)
              </p>

              {/* Category Selector */}
              <div className="category-select-group">
                <label className="category-select-label">
                  Target Category
                </label>
                <select
                  className="styled-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="Academic">Academic Transcripts & Marksheets</option>
                  <option value="Certificates">Certificates & Diplomas</option>
                  <option value="Identity">Identity & Passport Docs</option>
                  <option value="Assignments">Assignments & Research Papers</option>
                </select>
              </div>

              {/* Browse Files Button */}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden-file-input"
                multiple
                accept=".pdf,.png,.jpg,.jpeg,.docx,.xlsx"
                onChange={handleFileSelect}
              />
              <button
                type="button"
                className="browse-files-btn"
                onClick={() => fileInputRef.current?.click()}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  <line x1="12" y1="11" x2="12" y2="17" />
                  <line x1="9" y1="14" x2="15" y2="14" />
                </svg>
                <span>Browse Files</span>
              </button>
            </div>

            {/* Upload Progress Section */}
            <div className="glass-card upload-progress-card">
              <div className="card-title-row">
                <h3 className="card-title">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#60a5fa"
                    strokeWidth="2"
                  >
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                  <span>Upload Progress</span>
                </h3>
                <span className="progress-count-tag">
                  {uploadQueue.length} File(s)
                </span>
              </div>

              <div className="progress-items-list">
                {uploadQueue.map((item) => (
                  <div key={item.id} className="progress-item-box">
                    <div className="item-info-row">
                      <div className="item-left">
                        <div className="item-icon">
                          {item.name.split(".").pop().toUpperCase()}
                        </div>
                        <div className="item-name-meta">
                          <span className="item-filename">{item.name}</span>
                          <span className="item-filesize">
                            {item.size} • Category: {item.category}
                          </span>
                        </div>
                      </div>

                      <div className="item-status-text">
                        {item.status === "completed" ? (
                          <span className="status-completed">
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            Encrypted & Saved
                          </span>
                        ) : (
                          <span className="status-encrypting">
                            Encrypting... ({item.progress}%)
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Progress Bar Track */}
                    <div className="progress-bar-track">
                      <div
                        className="progress-bar-fill"
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Supported Types & Recent Preview */}
          <div className="right-upload-column">
            {/* Supported File Types Card */}
            <div className="glass-card supported-types-card">
              <h3 className="card-title">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                <span>Supported Formats</span>
              </h3>

              <div className="types-grid">
                <div className="type-box">
                  <div className="type-header">
                    <span>📄 PDF Files</span>
                  </div>
                  <span className="type-ext">.pdf (Transcripts & Marksheets)</span>
                </div>

                <div className="type-box">
                  <div className="type-header">
                    <span>🖼️ Images</span>
                  </div>
                  <span className="type-ext">.png, .jpg, .webp (IDs & Scans)</span>
                </div>

                <div className="type-box">
                  <div className="type-header">
                    <span>📝 Documents</span>
                  </div>
                  <span className="type-ext">.docx, .txt (Research & Essays)</span>
                </div>

                <div className="type-box">
                  <div className="type-header">
                    <span>📊 Sheets</span>
                  </div>
                  <span className="type-ext">.xlsx, .csv (Grades & Data)</span>
                </div>
              </div>

              {/* File Size Info Box */}
              <div className="file-size-info-box">
                <svg
                  className="size-info-icon"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <span>
                  <strong>Size Limit:</strong> Max 25 MB per file. Storage available: <strong>5.8 GB free</strong>.
                </span>
              </div>
            </div>

            {/* Recent Uploads Preview */}
            <div className="glass-card recent-preview-card">
              <div className="card-title-row">
                <h3 className="card-title">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>Recent Uploads</span>
                </h3>
                <Link
                  to="/myfiles"
                  style={{
                    color: "#60a5fa",
                    fontSize: "12.5px",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  View All
                </Link>
              </div>

              <div className="recent-mini-list">
                {recentUploads.map((file) => (
                  <div key={file.id} className="recent-mini-item">
                    <div className="mini-item-left">
                      <div
                        className={`mini-item-icon ${
                          file.type === "pdf"
                            ? "mini-pdf"
                            : file.type === "img"
                            ? "mini-img"
                            : "mini-doc"
                        }`}
                      >
                        {file.type.toUpperCase()}
                      </div>
                      <div>
                        <div className="mini-item-name">{file.name}</div>
                        <div className="mini-item-size">
                          {file.size} • {file.date}
                        </div>
                      </div>
                    </div>

                    <span className="mini-encrypted-tag">Encrypted ✓</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Upload;