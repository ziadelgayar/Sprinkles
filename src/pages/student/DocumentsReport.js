import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

const DocumentsPage = () => {
  const [documents, setDocuments] = useState([
    { id: 1, name: 'My_CV.pdf', type: 'CV', date: '2025-01-15' },
    { id: 2, name: 'Cover_Letter_CompanyX.pdf', type: 'Cover Letter', date: '2025-02-20' },
    { id: 3, name: 'Certificate_CourseY.pdf', type: 'Certificate', date: '2025-03-10' },
  ]);
  const [filter, setFilter] = useState('all');
  const [newDocument, setNewDocument] = useState(null);

  const handleFilterChange = (type) => {
    setFilter(type);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewDocument(file);
    }
  };

  const addDocument = () => {
    if (newDocument) {
      const docType = determineDocumentType(newDocument.name);
      const newDoc = {
        id: documents.length + 1,
        name: newDocument.name,
        type: docType,
        date: new Date().toISOString().split('T')[0],
        file: newDocument
      };
      setDocuments([...documents, newDoc]);
      setNewDocument(null);
    }
  };

  const determineDocumentType = (filename) => {
    const lowerName = filename.toLowerCase();
    if (lowerName.includes('cv') || lowerName.includes('resume')) return 'CV';
    if (lowerName.includes('cover') || lowerName.includes('letter')) return 'Cover Letter';
    if (lowerName.includes('certif') || lowerName.includes('diploma')) return 'Certificate';
    return 'Other';
  };

  const downloadDocument = (document) => {
    // In a real app, this would download the actual file
    // For this demo, we'll generate a placeholder PDF
    const doc = new jsPDF();
    doc.text(`Document: ${document.name}`, 10, 10);
    doc.text(`Type: ${document.type}`, 10, 20);
    doc.text(`Uploaded: ${document.date}`, 10, 30);
    doc.text('This is a placeholder for the actual document content.', 10, 40);
    doc.save(document.name);
  };

  const removeDocument = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  return (
    <div className="documents-page">
      <h1>My Documents</h1>
      
      <div className="upload-section">
        <h2>Upload New Document</h2>
        <input 
          type="file" 
          onChange={handleFileUpload}
          accept=".pdf,.doc,.docx,.txt,.rtf" 
        />
        {newDocument && (
          <div className="upload-preview">
            <p>Selected: {newDocument.name}</p>
            <button onClick={addDocument}>Upload Document</button>
          </div>
        )}
      </div>

      <div className="filter-tabs">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => handleFilterChange('all')}
        >
          All Documents
        </button>
        <button
          className={`filter-btn ${filter === 'CV' ? 'active' : ''}`}
          onClick={() => handleFilterChange('CV')}
        >
          CV/Resume
        </button>
        <button
          className={`filter-btn ${filter === 'Cover Letter' ? 'active' : ''}`}
          onClick={() => handleFilterChange('Cover Letter')}
        >
          Cover Letters
        </button>
        <button
          className={`filter-btn ${filter === 'Certificate' ? 'active' : ''}`}
          onClick={() => handleFilterChange('Certificate')}
        >
          Certificates
        </button>
      </div>

      <div className="documents-list">
        {documents.length === 0 ? (
          <div className="empty-state">
            <p>No documents found. Upload your first document!</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Document Name</th>
                <th>Type</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents
                .filter(doc => filter === 'all' || doc.type === filter)
                .map(document => (
                  <tr key={document.id}>
                    <td>{document.name}</td>
                    <td>{document.type}</td>
                    <td>{document.date}</td>
                    <td className="actions">
                      <button onClick={() => downloadDocument(document)}>
                        Download
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => removeDocument(document.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DocumentsPage;