import React, { useState } from 'react';

const StudentApplications = () => {
  // Sample application data
  const sampleApplications = [
    {
      id: 1,
      position: 'UX Design Intern',
      companyName: 'Google',
      location: 'Remote',
      appliedDate: '2025-03-10',
      lastUpdated: '2025-03-15',
      status: 'pending',
      documents: [
        { name: 'Resume.pdf', url: '#' },
        { name: 'Cover_Letter_Google.pdf', url: '#' }
      ]
    },
    {
      id: 2,
      position: 'Software Engineering Intern',
      companyName: 'Microsoft',
      location: 'Redmond, WA',
      appliedDate: '2025-02-28',
      lastUpdated: '2025-03-20',
      status: 'finalized',
      documents: [
        { name: 'Resume.pdf', url: '#' },
        { name: 'Transcript.pdf', url: '#' }
      ],
      notes: 'You are currently a top candidate!'
    },
    {
      id: 3,
      position: 'Marketing Intern',
      companyName: 'Nike',
      location: 'Portland, OR',
      appliedDate: '2025-01-15',
      lastUpdated: '2025-02-01',
      status: 'accepted',
      documents: [
        { name: 'Resume.pdf', url: '#' },
        { name: 'Writing_Sample.pdf', url: '#' }
      ],
      startDate: '2025-06-01'
    },
    {
      id: 4,
      position: 'Graphic Design Intern',
      companyName: 'Apple',
      location: 'Cupertino, CA',
      appliedDate: '2025-02-20',
      lastUpdated: '2025-03-10',
      status: 'rejected',
      documents: [
        { name: 'Resume.pdf', url: '#' },
        { name: 'Portfolio.pdf', url: '#' }
      ],
      rejectionReason: 'Position filled by internal candidate'
    }
  ];

  const [applications, setApplications] = useState(sampleApplications);
  const [filter, setFilter] = useState('all');

  // Filter applications based on status
  const filteredApplications = applications.filter(application => {
    return filter === 'all' || application.status === filter;
  });

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending': return 'Pending Review';
      case 'finalized': return 'Top Applicant';
      case 'accepted': return 'Accepted';
      case 'rejected': return 'Rejected';
      default: return status;
    }
  };

  const withdrawApplication = (applicationId) => {
    if (window.confirm('Are you sure you want to withdraw this application?')) {
      setApplications(applications.filter(app => app.id !== applicationId));
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="student-applications">
      <div className="page-header">
        <h1>My Applications</h1>
        <p>Track the status of your internship applications</p>
      </div>

      <div className="filter-tabs">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Applications
        </button>
        <button 
          className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button 
          className={`filter-btn ${filter === 'finalized' ? 'active' : ''}`}
          onClick={() => setFilter('finalized')}
        >
          Finalized
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

      <div className="applications-list">
        {filteredApplications.length === 0 ? (
          <div className="empty-state">
            <p>No applications found matching your criteria</p>
            {filter !== 'all' && (
              <button onClick={() => setFilter('all')}>View All Applications</button>
            )}
          </div>
        ) : (
          filteredApplications.map((application) => (
            <div key={application.id} className={`application-card status-${application.status}`}>
              <div className="application-header">
                <div>
                  <h3>{application.position}</h3>
                  <h4>{application.companyName}</h4>
                </div>
                <span className={`status ${application.status}`}>
                  {getStatusLabel(application.status)}
                </span>
              </div>

              <div className="application-details">
                <div className="detail-group">
                  <span className="detail-label">Location:</span>
                  <span>{application.location}</span>
                </div>
                <div className="detail-group">
                  <span className="detail-label">Applied:</span>
                  <span>{formatDate(application.appliedDate)}</span>
                </div>
                <div className="detail-group">
                  <span className="detail-label">Last Updated:</span>
                  <span>{formatDate(application.lastUpdated)}</span>
                </div>
              </div>

              {application.status === 'accepted' && (
                <div className="status-info accepted">
                  <p>Congratulations! Your internship starts on {formatDate(application.startDate)}</p>
                </div>
              )}

              {application.status === 'finalized' && (
                <div className="status-info finalized">
                  <p>{application.notes || 'You are being strongly considered for this position!'}</p>
                </div>
              )}

              {application.status === 'rejected' && (
                <div className="status-info rejected">
                  <p><strong>Reason:</strong> {application.rejectionReason}</p>
                </div>
              )}

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

              <div className="application-actions">
                {application.status === 'pending' && (
                  <>
                    <button 
                      className="withdraw-btn"
                      onClick={() => withdrawApplication(application.id)}
                    >
                      Withdraw Application
                    </button>
                    <button className="update-btn">
                      Update Documents
                    </button>
                  </>
                )}
                {application.status === 'accepted' && (
                  <button className="accept-btn">
                    Confirm Acceptance
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudentApplications;