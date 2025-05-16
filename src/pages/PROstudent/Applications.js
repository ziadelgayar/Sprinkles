import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

const StudentApplications = () => {
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
        { name: 'Resume.pdf', content: 'John Doe - Resume\nSkills: UX Design, Figma, User Research' },
        { name: 'Cover_Letter_Google.pdf', content: 'Cover Letter for Google\nDear Hiring Manager...' }
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
        { name: 'Resume.pdf', content: 'John Doe - Resume\nSkills: JavaScript, React, Node.js' },
        { name: 'Transcript.pdf', content: 'SCAD Transcript\nGPA: 3.8\nCourses: Data Structures, Algorithms' }
      ],
      notes: 'You are currently a top candidate!'
    }
  ];

  const [applications, setApplications] = useState(sampleApplications);
  const [filter, setFilter] = useState('all');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [currentApplication, setCurrentApplication] = useState(null);
  const [newDocuments, setNewDocuments] = useState([]);

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

  const handleUpdateClick = (application) => {
    setCurrentApplication(application);
    setShowUpdateModal(true);
    setNewDocuments([]);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const documentPromises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve({
            name: file.name,
            content: e.target.result
          });
        };
        reader.readAsText(file);
      });
    });

    Promise.all(documentPromises).then(docs => {
      setNewDocuments(docs);
    });
  };

  const updateApplicationDocuments = () => {
    if (!currentApplication || newDocuments.length === 0) return;

    const updatedApplications = applications.map(app => {
      if (app.id === currentApplication.id) {
        return {
          ...app,
          documents: [...app.documents, ...newDocuments],
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return app;
    });

    setApplications(updatedApplications);
    setShowUpdateModal(false);
    alert('Documents updated successfully!');
  };

  const downloadDocumentAsPDF = (document) => {
    const doc = new jsPDF();
    doc.text(`Document: ${document.name}`, 10, 10);
    doc.text('Content:', 10, 20);
    
    // Split content into lines that fit the PDF width
    const lines = doc.splitTextToSize(document.content, 180);
    doc.text(lines, 10, 30);
    
    doc.save(document.name);
  };

  const updateApplicationStatus = (applicationId, newStatus) => {
    const updatedApplications = applications.map(app =>
      app.id === applicationId ? { ...app, status: newStatus } : app
    );
    setApplications(updatedApplications);
  };

  return (
    <div className="main-content">
      <div className="page-header">
        <h1>My Applications</h1>
        <p>Track the status of your internship applications</p>
      </div>
      <div className="filter-tabs">
        {['all', 'pending', 'finalized', 'accepted', 'rejected'].map((status) => (
          <button
            key={status}
            className={`filter-btn ${filter === status ? 'active' : ''}`}
            onClick={() => setFilter(status)}
          >
            {status === 'all' ? 'All Applications' : getStatusLabel(status)}
          </button>
        ))}
      </div>
      <div className="applications-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredApplications.length === 0 ? (
          <div className="custom-box" style={{ textAlign: 'center' }}>
            <p>No applications found matching your criteria</p>
            {filter !== 'all' && (
              <button className="cancel-btn" onClick={() => setFilter('all')}>View All Applications</button>
            )}
          </div>
        ) : (
          filteredApplications.map((application) => (
            <div key={application.id} className="custom-box" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ marginBottom: '6px' }}>
                <h3 style={{ marginBottom: '4px' }}>{application.position}</h3>
                <h4 style={{ color: '#b5b5b5', marginBottom: '2px' }}>Company: {application.companyName}</h4>
                <p style={{ color: '#b5b5b5', marginBottom: '2px' }}>
                  Status: {getStatusLabel(application.status)}
                </p>
                {application.notes && (
                  <p style={{ color: '#4fd1c5', marginBottom: '2px' }}>
                    Notes: {application.notes}
                  </p>
                )}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
                {application.status === 'pending' && (
                  <button
                    className="cancel-btn"
                    onClick={() => withdrawApplication(application.id)}
                  >
                    Withdraw
                  </button>
                )}
                <select
                  value={application.status}
                  onChange={(e) => updateApplicationStatus(application.id, e.target.value)}
                  style={{ border: '1px solid #4fd1c5', borderRadius: '8px', padding: '6px 12px', background: '#181c2a', color: '#fff' }}
                >
                  {['pending', 'finalized', 'accepted', 'rejected'].map((status) => (
                    <option key={status} value={status} style={{ color: '#181c2a' }}>
                      {getStatusLabel(status)}
                    </option>
                  ))}
                </select>
              </div>
              {application.documents && application.documents.length > 0 && (
                <div style={{ marginTop: '8px' }}>
                  <h4 style={{ color: '#4fd1c5', marginBottom: '4px' }}>Submitted Documents:</h4>
                  <ul style={{ paddingLeft: '18px' }}>
                    {application.documents.map((doc, index) => (
                      <li key={index} style={{ marginBottom: '4px' }}>
                        <button
                          className="document-btn"
                          onClick={() => downloadDocumentAsPDF(doc)}
                        >
                          {doc.name} (Download PDF)
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {application.status === 'pending' && (
                <div style={{ marginTop: '8px' }}>
                  <button
                    className="reject-btn"
                    onClick={() => handleUpdateClick(application)}
                  >
                    Update Documents
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      {/* Update Documents Modal */}
      {showUpdateModal && currentApplication && (
        <div className="modal-overlay">
          <div className="update-modal">
            <h2>Update Documents for {currentApplication.position}</h2>
            <p>at {currentApplication.companyName}</p>
            <div className="modal-content">
              <h3>Current Documents:</h3>
              <ul>
                {currentApplication.documents && currentApplication.documents.map((doc, index) => (
                  <li key={index}>{doc.name}</li>
                ))}
              </ul>
              <div className="file-upload">
                <h3>Add New Documents:</h3>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.txt"
                />
                {newDocuments.length > 0 && (
                  <div className="new-documents">
                    <h4>New files to upload:</h4>
                    <ul>
                      {newDocuments.map((doc, index) => (
                        <li key={index}>{doc.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="modal-actions">
                <button
                  className="cancel-btn"
                  onClick={() => setShowUpdateModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="reject-btn"
                  onClick={updateApplicationDocuments}
                  disabled={newDocuments.length === 0}
                >
                  Update Documents
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentApplications;