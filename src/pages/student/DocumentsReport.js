import React, { useState } from 'react';

const StudentDocumentsReport = () => {
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState('all');

  return (
    <div className="student-documents-report">
      <div className="page-header">
        <h1>Internship Reports & Documents</h1>
        <div className="filter-tabs">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filter === 'draft' ? 'active' : ''}`}
            onClick={() => setFilter('draft')}
          >
            Drafts
          </button>
          <button 
            className={`filter-btn ${filter === 'submitted' ? 'active' : ''}`}
            onClick={() => setFilter('submitted')}
          >
            Submitted
          </button>
          <button 
            className={`filter-btn ${filter === 'flagged' ? 'active' : ''}`}
            onClick={() => setFilter('flagged')}
          >
            Flagged
          </button>
        </div>
      </div>

      <div className="reports-list">
        {reports.length === 0 ? (
          <div className="empty-state">
            <p>No reports found</p>
          </div>
        ) : (
          reports.map((report) => (
            <div key={report.id} className="report-card">
              <div className="report-header">
                <h3>{report.title}</h3>
                <span className={`status ${report.status}`}>
                  {report.status}
                </span>
              </div>

              <div className="internship-info">
                <h4>{report.companyName}</h4>
                <p><strong>Position:</strong> {report.position}</p>
                <p><strong>Period:</strong> {report.period}</p>
              </div>

              {report.status === 'draft' && (
                <div className="report-form">
                  <div className="form-group">
                    <label>Title</label>
                    <input type="text" placeholder="Enter report title" />
                  </div>

                  <div className="form-group">
                    <label>Introduction</label>
                    <textarea 
                      placeholder="Write your introduction..."
                      rows="4"
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label>Body</label>
                    <textarea 
                      placeholder="Write your report body..."
                      rows="8"
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label>Relevant Courses</label>
                    <select multiple>
                      {/* Course options will be mapped here */}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Supporting Documents</label>
                    <input type="file" multiple />
                  </div>

                  <div className="report-actions">
                    <button className="save-draft-btn">Save Draft</button>
                    <button className="submit-btn">Submit Report</button>
                  </div>
                </div>
              )}

              {report.status === 'submitted' && (
                <div className="submitted-report">
                  <div className="report-content">
                    <h4>Report Content</h4>
                    <p>{report.content}</p>
                  </div>

                  <div className="relevant-courses">
                    <h4>Relevant Courses</h4>
                    <ul>
                      {report.courses.map((course, index) => (
                        <li key={index}>{course}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="supporting-documents">
                    <h4>Supporting Documents</h4>
                    <ul>
                      {report.documents.map((doc, index) => (
                        <li key={index}>
                          <a href={doc.url} target="_blank" rel="noopener noreferrer">
                            {doc.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="report-actions">
                    <button className="download-btn">Download PDF</button>
                    <button className="edit-btn">Edit Report</button>
                  </div>
                </div>
              )}

              {report.status === 'flagged' && (
                <div className="flagged-report">
                  <div className="flag-reason">
                    <h4>Flag Reason</h4>
                    <p>{report.flagReason}</p>
                  </div>

                  <div className="comments">
                    <h4>Comments</h4>
                    <p>{report.comments}</p>
                  </div>

                  <div className="report-actions">
                    <button className="appeal-btn">Appeal Decision</button>
                    <button className="edit-btn">Edit Report</button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="pagination">
        <button className="prev-btn">Previous</button>
        <span className="page-info">Page 1 of 1</span>
        <button className="next-btn">Next</button>
      </div>
    </div>
  );
};

export default StudentDocumentsReport;
