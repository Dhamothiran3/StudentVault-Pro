import { useState } from "react";
import { Link } from "react-router-dom";
import "./MyFiles.css";

function MyFiles() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "table"
  const [sortBy, setSortBy] = useState("newest"); // "newest", "name", "size"
  const [previewFile, setPreviewFile] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const [files, setFiles] = useState([
    {
      id: 1,
      name: "Fall_2025_Official_Transcript.pdf",
      category: "Academic",
      size: "2.4 MB",
      sizeBytes: 2400000,
      date: "Jul 23, 2026",
      type: "pdf",
    },
    {
      id: 2,
      name: "Machine_Learning_Certification.pdf",
      category: "Certificates",
      size: "1.8 MB",
      sizeBytes: 1800000,
      date: "Jul 22, 2026",
      type: "pdf",
    },
    {
      id: 3,
      name: "University_Student_ID_Card.png",
      category: "Identity",
      size: "3.1 MB",
      sizeBytes: 3100000,
      date: "Jul 20, 2026",
      type: "img",
    },
    {
      id: 4,
      name: "Algorithms_Final_Assignment.docx",
      category: "Assignments",
      size: "850 KB",
      sizeBytes: 850000,
      date: "Jul 18, 2026",
      type: "doc",
    },
    {
      id: 5,
      name: "Scholarship_Award_Letter.pdf",
      category: "Certificates",
      size: "1.2 MB",
      sizeBytes: 1200000,
      date: "Jul 15, 2026",
      type: "pdf",
    },
    {
      id: 6,
      name: "Passport_Verification_Copy.pdf",
      category: "Identity",
      size: "4.5 MB",
      sizeBytes: 4500000,
      date: "Jul 12, 2026",
      type: "pdf",
    },
    {
      id: 7,
      name: "Operating_Systems_Lab_Report.pdf",
      category: "Academic",
      size: "2.1 MB",
      sizeBytes: 2100000,
      date: "Jul 10, 2026",
      type: "pdf",
    },
    {
      id: 8,
      name: "Database_Design_Project.xlsx",
      category: "Assignments",
      size: "1.6 MB",
      sizeBytes: 1600000,
      date: "Jul 05, 2026",
      type: "sheet",
    },
  ]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}" from your vault?`)) {
      setFiles((prev) => prev.filter((f) => f.id !== id));
      if (previewFile?.id === id) setPreviewFile(null);
      showToast(`Deleted "${name}"`);
    }
  };

  const handleDownload = (name) => {
    showToast(`Downloading "${name}"...`);
  };

  // Category file count calculator
  const getCategoryCount = (cat) => {
    if (cat === "All") return files.length;
    return files.filter((f) => f.category === cat).length;
  };

  // Filter & Search Logic
  const filteredFiles = files
    .filter((file) => {
      const matchesSearch = file.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || file.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "size") return b.sizeBytes - a.sizeBytes;
      return b.id - a.id; // Newest first
    });

  return (
    <div className="myfiles-page-wrapper">
      {/* Background Animated Glows */}
      <div className="myfiles-bg-glow myfiles-bg-glow-1"></div>
      <div className="myfiles-bg-glow myfiles-bg-glow-2"></div>
      <div className="myfiles-bg-glow myfiles-bg-glow-3"></div>

      {/* Navigation Header */}
      <header className="myfiles-navbar">
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
            <Link to="/myfiles" className="nav-link active">
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

      {/* Main Content Container */}
      <main className="myfiles-content">
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
        <section className="glass-card myfiles-header-card">
          <div>
            <h1 className="myfiles-page-title">My Encrypted Vault</h1>
            <p className="myfiles-page-subtitle">
              Browse, filter, view, and manage all your stored academic credentials and certificates.
            </p>
          </div>

          <div className="header-stats-row">
            <div className="mini-stat-badge">
              <span className="mini-stat-num">{files.length}</span>
              <span className="mini-stat-lbl">Documents</span>
            </div>
            <div className="mini-stat-badge">
              <span className="mini-stat-num">4.2 GB</span>
              <span className="mini-stat-lbl">Encrypted</span>
            </div>
          </div>
        </section>

        {/* Search & Filter Toolbar */}
        <section className="glass-card toolbar-card">
          <div className="toolbar-top-row">
            {/* Search Input */}
            <div className="search-input-wrapper">
              <span className="search-icon-left">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
              <input
                type="text"
                className="styled-search-input"
                placeholder="Search documents by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="clear-search-btn"
                  onClick={() => setSearchQuery("")}
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort & View Toggle Controls */}
            <div className="toolbar-controls-right">
              {/* Sort Selector */}
              <select
                className="styled-select-small"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Sort: Newest First</option>
                <option value="name">Sort: Name (A-Z)</option>
                <option value="size">Sort: File Size</option>
              </select>

              {/* Grid / Table View Switcher */}
              <div className="view-toggle-group">
                <button
                  className={`view-toggle-btn ${
                    viewMode === "grid" ? "active" : ""
                  }`}
                  onClick={() => setViewMode("grid")}
                  title="Grid View"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                  <span>Grid</span>
                </button>
                <button
                  className={`view-toggle-btn ${
                    viewMode === "table" ? "active" : ""
                  }`}
                  onClick={() => setViewMode("table")}
                  title="Table View"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" />
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                  <span>Table</span>
                </button>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="category-filter-bar">
            {["All", "Academic", "Certificates", "Identity", "Assignments"].map(
              (cat) => (
                <button
                  key={cat}
                  className={`cat-tab-btn ${
                    selectedCategory === cat ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  <span>{cat}</span>
                  <span className="cat-count-badge">
                    {getCategoryCount(cat)}
                  </span>
                </button>
              )
            )}
          </div>
        </section>

        {/* File Display Area */}
        {filteredFiles.length === 0 ? (
          /* Empty Search Results Card */
          <div className="glass-card empty-state-card">
            <svg
              className="empty-icon"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="9" y1="15" x2="15" y2="15" />
            </svg>
            <h3 className="empty-title">No documents found</h3>
            <p className="empty-desc">
              No files match your search query "{searchQuery}" or category filter.
            </p>
          </div>
        ) : viewMode === "grid" ? (
          /* Grid View Layout */
          <section className="files-grid-container">
            {filteredFiles.map((file) => (
              <div key={file.id} className="glass-card file-card">
                <div className="file-card-top">
                  <div
                    className={`file-icon-large ${
                      file.type === "pdf"
                        ? "icon-pdf"
                        : file.type === "img"
                        ? "icon-img"
                        : file.type === "doc"
                        ? "icon-doc"
                        : "icon-sheet"
                    }`}
                  >
                    {file.type.toUpperCase()}
                  </div>
                  <span className="category-tag">{file.category}</span>
                </div>

                <div className="file-card-body">
                  <div className="file-title">{file.name}</div>
                  <div className="file-submeta">
                    <span>{file.size}</span>
                    <span>•</span>
                    <span>{file.date}</span>
                  </div>
                </div>

                <div className="file-card-footer">
                  <div className="action-buttons-group">
                    {/* View Button */}
                    <button
                      className="btn-icon-action"
                      title="View Document Details"
                      onClick={() => setPreviewFile(file)}
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

                    {/* Download Button */}
                    <button
                      className="btn-icon-action"
                      title="Download Secure File"
                      onClick={() => handleDownload(file.name)}
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

                    {/* Delete Button */}
                    <button
                      className="btn-icon-action btn-icon-delete"
                      title="Delete File"
                      onClick={() => handleDelete(file.id, file.name)}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </section>
        ) : (
          /* Table View Layout */
          <section className="glass-card table-view-card">
            <table className="files-table">
              <thead>
                <tr>
                  <th>Document Name</th>
                  <th>Category</th>
                  <th>Size</th>
                  <th>Upload Date</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFiles.map((file) => (
                  <tr key={file.id}>
                    <td>
                      <div className="table-file-info">
                        <div
                          className={`table-icon ${
                            file.type === "pdf"
                              ? "icon-pdf"
                              : file.type === "img"
                              ? "icon-img"
                              : file.type === "doc"
                              ? "icon-doc"
                              : "icon-sheet"
                          }`}
                        >
                          {file.type.toUpperCase()}
                        </div>
                        <span className="table-filename">{file.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className="category-tag">{file.category}</span>
                    </td>
                    <td>{file.size}</td>
                    <td>{file.date}</td>
                    <td style={{ textAlign: "right" }}>
                      <div
                        className="action-buttons-group"
                        style={{ justifyContent: "flex-end" }}
                      >
                        <button
                          className="btn-icon-action"
                          title="View Document Details"
                          onClick={() => setPreviewFile(file)}
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
                          className="btn-icon-action"
                          title="Download Secure File"
                          onClick={() => handleDownload(file.name)}
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
                        <button
                          className="btn-icon-action btn-icon-delete"
                          title="Delete File"
                          onClick={() => handleDelete(file.id, file.name)}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </main>

      {/* Document View Preview Modal */}
      {previewFile && (
        <div className="modal-overlay" onClick={() => setPreviewFile(null)}>
          <div
            className="modal-glass-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3 className="modal-title">Document Inspection</h3>
              <button
                className="close-modal-btn"
                onClick={() => setPreviewFile(null)}
              >
                ✕
              </button>
            </div>

            <div className="modal-file-preview-box">
              <div
                className={`preview-file-icon ${
                  previewFile.type === "pdf"
                    ? "icon-pdf"
                    : previewFile.type === "img"
                    ? "icon-img"
                    : previewFile.type === "doc"
                    ? "icon-doc"
                    : "icon-sheet"
                }`}
              >
                {previewFile.type.toUpperCase()}
              </div>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#ffffff",
                }}
              >
                {previewFile.name}
              </div>
            </div>

            <div className="modal-meta-list">
              <div className="meta-row">
                <span>Category:</span>
                <span className="meta-val">{previewFile.category}</span>
              </div>
              <div className="meta-row">
                <span>File Size:</span>
                <span className="meta-val">{previewFile.size}</span>
              </div>
              <div className="meta-row">
                <span>Upload Date:</span>
                <span className="meta-val">{previewFile.date}</span>
              </div>
              <div className="meta-row">
                <span>Encryption:</span>
                <span className="meta-val" style={{ color: "#34d399" }}>
                  AES-256 Validated ✓
                </span>
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="modal-btn-download"
                onClick={() => {
                  handleDownload(previewFile.name);
                  setPreviewFile(null);
                }}
              >
                Download Encrypted File
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyFiles;