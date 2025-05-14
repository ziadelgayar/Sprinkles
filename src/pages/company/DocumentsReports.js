import React, { useState } from 'react';

const DocumentsReports = () => {
  const [documents, setDocuments] = useState([]);
  const [reports, setReports] = useState([]);

  return (
    <div className="main-content">
      <div className="documents-reports-page">
        <div className="page-header">
          <h1>Documents & Reports</h1>
        </div>

        <div className="documents-section">
          <h2>Company Documents</h2>
          <div className="upload-section">
            <button className="upload-btn">Upload New Document</button>
          </div>
          
          <div className="documents-list">
            {documents.length === 0 ? (
              <p>No documents available</p>
            ) : (
              documents.map((doc) => (
                <div key={doc.id} className="document-card">
                  <div className="document-info">
                    <h3>{doc.title}</h3>
                    <p>Type: {doc.type}</p>
                    <p>Last Updated: {doc.lastUpdated}</p>
                  </div>
                  <div className="document-actions">
                    <button className="view-btn">View</button>
                    <button className="download-btn">Download</button>
                    <button className="delete-btn">Delete</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="reports-section">
          <h2>Reports</h2>
          <div className="reports-filters">
            <select>
              <option>All Reports</option>
              <option>Internship Reports</option>
              <option>Application Reports</option>
              <option>Evaluation Reports</option>
            </select>
            <input type="date" placeholder="Select Date Range" />
          </div>

          <div className="reports-list">
            {reports.length === 0 ? (
              <p>No reports available</p>
            ) : (
              reports.map((report) => (
                <div key={report.id} className="report-card">
                  <h3>{report.title}</h3>
                  <p>Generated: {report.generatedDate}</p>
                  <button className="generate-btn">Generate Report</button>
                  <button className="download-btn">Download</button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsReports;
