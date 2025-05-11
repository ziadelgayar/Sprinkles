import React, { useState } from 'react';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [selectedInternship, setSelectedInternship] = useState('all');

  return (
    <div className="applications-page">
      <div className="page-header">
        <h1>Internship Applications</h1>
        <select 
          value={selectedInternship}
          onChange={(e) => setSelectedInternship(e.target.value)}
        >
          <option value="all">All Internships</option>
          {/* Internship options will be mapped here */}
        </select>
      </div>

      <div className="applications-filters">
        <button className="filter-btn active">All</button>
        <button className="filter-btn">Pending</button>
        <button className="filter-btn">Accepted</button>
        <button className="filter-btn">Rejected</button>
      </div>

      <div className="applications-list">
        {applications.length === 0 ? (
          <div className="empty-state">
            <p>No applications received yet</p>
          </div>
        ) : (
          applications.map((application) => (
            <div key={application.id} className="application-card">
              <div className="applicant-info">
                <h3>{application.applicantName}</h3>
                <p>Position: {application.position}</p>
                <p>Applied: {application.appliedDate}</p>
              </div>
              
              <div className="application-status">
                <span className={`status ${application.status}`}>
                  {application.status}
                </span>
              </div>

              <div className="application-actions">
                <button className="view-profile-btn">View Profile</button>
                <button className="view-resume-btn">View Resume</button>
                <button className="accept-btn">Accept</button>
                <button className="reject-btn">Reject</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Applications;
