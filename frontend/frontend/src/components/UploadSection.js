'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import './UploadSection.css';

function UploadSection() {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]); // { file, path }
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (fileList) => {
    const acceptedExtensions = ['.js', '.ts', '.jsx', '.tsx', '.json', '.py', '.java'];

    const newFiles = Array.from(fileList)
      .filter((file) =>
        acceptedExtensions.some((ext) => file.name.toLowerCase().endsWith(ext))
      )
      .map((file) => ({
        file,
        path: file.webkitRelativePath || file.name,
      }));

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleFileInput = (e) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    setUploading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay
    setUploading(false);
    console.log('Files ready for visualization:', files.map((f) => f.path));
    alert('Upload successful!');
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="upload-wrapper">
      <div className="upload-container">
        <div className="upload-header">
          <h1>Upload Your Project</h1>
          <p>Drop or select your project folder to begin</p>
        </div>

        <div
          className={`upload-dropzone ${dragActive ? 'active' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            webkitdirectory="true"
            directory=""
            onChange={handleFileInput}
            className="hidden-input"
          />

          <div className="upload-prompt">
            <div className="upload-icon">{dragActive ? '📂' : '📁'}</div>
            <h2>{dragActive ? 'Drop your folder here' : 'Drag & drop your folder here'}</h2>
            <p>
              or{' '}
              <button onClick={() => fileInputRef.current?.click()} className="upload-browse">
                Browse folder
              </button>
            </p>
            <div className="file-extensions">
              {['.js', '.ts', '.jsx', '.tsx', '.json', '.py', '.java'].map((ext) => (
                <span key={ext}>{ext}</span>
              ))}
            </div>
          </div>
        </div>

        {files.length > 0 && (
          <div className="file-list">
            <h3>Selected Files ({files.length})</h3>
            <div className="file-scroll">
              {files.map(({ file, path }, index) => (
                <div key={index} className="file-item">
                  <div className="file-details">
                    <span className="file-emoji">📄</span>
                    <div>
                      <p className="file-name">{path}</p>
                      <p className="file-size">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <button onClick={() => removeFile(index)} className="file-remove">
                    ✖
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {files.length > 0 && (
          <div className="upload-btn-wrapper">
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="upload-btn"
            >
              {uploading ? '⏳ Processing Files...' : '✨ Start Visualization'}
            </button>
          </div>
        )}

        <div className="upload-back">
          <Link href="#home">
            <span>← Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UploadSection;
