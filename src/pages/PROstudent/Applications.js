import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { useApplications } from '../../context/ApplicationsContext';

const StudentApplications = () => {
  const { applications = [], withdrawApplication, updateApplicationStatus } = useApplications();
  const [filter, setFilter] = useState('all');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [currentApplication, setCurrentApplication] = useState(null);
  const [newDocuments, setNewDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set loading to false once applications are loaded
    setIsLoading(false);
  }, [applications]);

  const filteredApplications = applications.filter(application => {
    return filter === 'all' || application.status === filter;
  });

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending': return 'Pending Review';
      case 'finalized': return 'Flagged';
      case 'accepted': return 'Accepted';
      case 'rejected': return 'Rejected';
      default: return status;
    }
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

    const updatedApplication = {
      ...currentApplication,
      documents: [...currentApplication.documents, ...newDocuments],
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    updateApplicationStatus(currentApplication.id, updatedApplication);
    setShowUpdateModal(false);
    alert('Documents updated successfully!');
  };

  const downloadDocumentAsPDF = (document) => {
    const doc = new jsPDF();
    doc.text(`Document: ${document.name}`, 10, 10);
    doc.text('Content:', 10, 20);
    
    const lines = doc.splitTextToSize(document.content, 180);
    doc.text(lines, 10, 30);
    
    doc.save(document.name);
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

      <div className="applications-list">
        {isLoading ? (
          <div className="loading-state">
            <p>Loading applications...</p>
          </div>
        ) : filteredApplications.length === 0 ? (
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

              <div className="application-documents">
                <h4>Submitted Documents:</h4>
                <ul>
                  {application.documents.map((doc, index) => (
                    <li key={index}>
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

              <div className="application-actions">
                {application.status === 'pending' && (
                  <>
                    <button
                      className="withdraw-btn"
                      onClick={() => withdrawApplication(application.id)}
                    >
                      Withdraw Application
                    </button>
                    <button 
                      className="update-btn"
                      onClick={() => handleUpdateClick(application)}
                    >
                      Update Documents
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {showUpdateModal && currentApplication && (
        <div className="modal-overlay">
          <div className="update-modal">
            <h2>Update Documents for {currentApplication.position}</h2>
            <p>at {currentApplication.companyName}</p>
            
            <div className="modal-content">
              <h3>Current Documents:</h3>
              <ul>
                {currentApplication.documents.map((doc, index) => (
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
                  className="submit-btn"
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