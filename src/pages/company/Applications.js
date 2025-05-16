import React, { useState } from 'react';

const Applications = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      applicantName: 'Alice',
      position: 'Frontend Developer',
      appliedDate: '2025-05-01',
      status: 'pending',
      internshipId: 1,
      resume: 'alice_resume.pdf',
      profile: 'alice_profile.pdf',
    },
    {
      id: 2,
      applicantName: 'Bob',
      position: 'Marketing Intern',
      appliedDate: '2025-05-03',
      status: 'pending',
      internshipId: 2,
      resume: 'bob_resume.pdf',
      profile: 'bob_profile.pdf',
    },
  ]);
  const [selectedInternship, setSelectedInternship] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  const internshipOptions = [
    { id: 1, title: 'Frontend Developer Internship' },
    { id: 2, title: 'Marketing Internship' },
  ];

  // Filter applications based on selected internship and status
  const filteredApplications = applications.filter((application) => {
    const matchesInternship =
      selectedInternship === 'all' || application.internshipId === parseInt(selectedInternship);
    const matchesStatus =
      statusFilter === 'all' || application.status === statusFilter;
    return matchesInternship && matchesStatus;
  });

  const handleStatusChange = (applicationId, status) => {
    const updatedApplications = applications.map((application) =>
      application.id === applicationId ? { ...application, status } : application
    );
    setApplications(updatedApplications);
  };

  return (
    <div className="main-content">
      <div className="applications-page">
        <div className="page-header">
          <h1>Internship Applications</h1>
          <select
            value={selectedInternship}
            onChange={(e) => setSelectedInternship(e.target.value)}
          >
            <option value="all">All Internships</option>
            {internshipOptions.map((internship) => (
              <option key={internship.id} value={internship.id}>
                {internship.title}
              </option>
            ))}
          </select>
        </div>

        <div className="applications-filters">
          <button
            className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => setStatusFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${statusFilter === 'pending' ? 'active' : ''}`}
            onClick={() => setStatusFilter('pending')}
          >
            Pending
          </button>
          <button
            className={`filter-btn ${statusFilter === 'accepted' ? 'active' : ''}`}
            onClick={() => setStatusFilter('accepted')}
          >
            Accepted
          </button>
          <button
            className={`filter-btn ${statusFilter === 'rejected' ? 'active' : ''}`}
            onClick={() => setStatusFilter('rejected')}
          >
            Rejected
          </button>
          <button
            className={`filter-btn ${statusFilter === 'currentIntern' ? 'active' : ''}`}
            onClick={() => setStatusFilter('currentIntern')}
          >
            Current Interns
          </button>
          <button
            className={`filter-btn ${statusFilter === 'internshipComplete' ? 'active' : ''}`}
            onClick={() => setStatusFilter('internshipComplete')}
          >
            Internship Complete
          </button>
        </div>

        <div className="applications-list">
          {filteredApplications.length === 0 ? (
            <div className="empty-state">
              <p>No applications received yet</p>
            </div>
          ) : (
            filteredApplications.map((application) => (
              <div key={application.id} className="application-card">
                <div className="applicant-info">
                  <h3>{application.applicantName}</h3>
                  <p>Position: {application.position}</p>
                  <p>Applied: {application.appliedDate}</p>
                </div>

                <div className="application-status">
                  <span className={`status ${application.status}`}>{application.status}</span>
                </div>

                <div className="application-actions">
                  <button
                    className="view-profile-btn"
                    onClick={() => setSelectedApplication(application)}
                  >
                    View Profile
                  </button>
                  <button
                    className="view-resume-btn"
                    onClick={() => alert(`Viewing resume: ${application.resume}`)}
                  >
                    View Resume
                  </button>
                  <button
                    className="accept-btn"
                    onClick={() => handleStatusChange(application.id, 'accepted')}
                  >
                    Accept
                  </button>

                  <button
                    className="finalize-btn"
                    onClick={() => handleStatusChange(application.id, 'finalized')}
                  >
                    Finalize
                  </button>

                  <button
                    className="reject-btn"
                    onClick={() => handleStatusChange(application.id, 'rejected')}
                  >
                    Reject
                  </button>
                  <button
                    className="start-internship-btn"
                    onClick={() => handleStatusChange(application.id, 'currentIntern')}
                  >
                    Start Internship
                  </button>
                  <button
                    className="complete-internship-btn"
                    onClick={() => handleStatusChange(application.id, 'internshipComplete')}
                  >
                    Complete Internship
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {selectedApplication && (
          <div className="application-detail-modal">
            <h2>Applicant Profile</h2>
            <p>Name: {selectedApplication.applicantName}</p>
            <p>Position: {selectedApplication.position}</p>
            <p>Applied On: {selectedApplication.appliedDate}</p>
            <p>Status: {selectedApplication.status}</p>
            <button onClick={() => setSelectedApplication(null)}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;
