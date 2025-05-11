import React, { useState } from 'react';

const StudentApplications = () => {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState('all');

  return (
    <div className="student-applications">
      <div className="page-header">
        <h1>My Applications</h1>
        <div className="filter-tabs">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button 
            className={`filter-btn ${filter === 'accepted' ? 'active' : ''}`}
            onClick={() => setFilter('accepted')}
          >
            Accepted
          </button>
          <button 
            className={`filter-btn ${filter === 'rejected' ? 'active' : ''}`}
            onClick={() => setFilter('rejected')}
          >
            Rejected
          </button>
        </div>
      </div>

      <div className="applications-list">
        {applications.length === 0 ? (
          <div className="empty-state">
            <p>No applications found</p>
          </div>
        ) : (
          applications.map((application) => (
            <div key={application.id} className="application-card">
              <div className="application-header">
                <h3>{application.position}</h3>
                <span className={`status ${application.status}`}>
                  {application.status}
                </span>
              </div>

              <div className="company-info">
                <h4>{application.companyName}</h4>
                <p>{application.location}</p>
              </div>

              <div className="application-details">
                <p><strong>Applied Date:</strong> {application.appliedDate}</p>
                <p><strong>Last Updated:</strong> {application.lastUpdated}</p>
                <p><strong>Duration:</strong> {application.duration}</p>
                <p><strong>Type:</strong> {application.type}</p>
              </div>

              <div className="submitted-documents">
                <h4>Submitted Documents:</h4>
                <ul>
                  {application.documents.map((doc, index) => (
                    <li key={index}>
                      <a href={doc.url} target="_blank" rel="noopener noreferrer">
                        {doc.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {application.status === 'pending' && (
                <div className="application-actions">
                  <button className="withdraw-btn">Withdraw Application</button>
                  <button className="update-docs-btn">Update Documents</button>
                </div>
              )}

              {application.status === 'rejected' && (
                <div className="rejection-info">
                  <h4>Rejection Reason:</h4>
                  <p>{application.rejectionReason}</p>
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

export default StudentApplications;
