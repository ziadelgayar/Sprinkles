import React, { useState } from "react";
import jsPDF from "jspdf";

const dummyInternshipReports = [
  {
    id: 1,
    studentName: "John Doe",
    major: "Computer Science",
    company: "Tech Corp",
    supervisor: "Jane Smith",
    startDate: "2024-01-15",
    endDate: "2024-04-15",
    status: "pending",
    evaluation: {
      rating: 4.5,
      comments: "Excellent performance",
    },
  },
  {
    id: 2,
    studentName: "Alice Green",
    major: "Engineering",
    company: "BuildIt",
    supervisor: "Mark Johnson",
    startDate: "2024-02-01",
    endDate: "2024-05-01",
    status: "flagged",
    evaluation: {
      rating: 3.8,
      comments: "Good but needs improvement in communication",
    },
  },
];

const dummyEvaluationReports = [
  {
    id: 101,
    studentName: "John Doe",
    company: "Tech Corp",
    supervisor: "Jane Smith",
    internshipDates: "2024-01-15 to 2024-04-15",
    rating: 4.5,
    comments: "Excellent performance",
  },
  {
    id: 102,
    studentName: "Alice Green",
    company: "BuildIt",
    supervisor: "Mark Johnson",
    internshipDates: "2024-02-01 to 2024-05-01",
    rating: 3.8,
    comments: "Good but needs improvement in communication",
  },
];

const InternshipReports = () => {
  const [filters, setFilters] = useState({
    major: "",
    status: "",
  });

  const [activeTab, setActiveTab] = useState("internship"); // internship or evaluation
  const [internshipReports, setInternshipReports] = useState(dummyInternshipReports);
  const [evaluationReports] = useState(dummyEvaluationReports);
  const [selectedReport, setSelectedReport] = useState(null);
  const [clarificationInput, setClarificationInput] = useState("");

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStatusChange = (reportId, newStatus) => {
    setInternshipReports((prev) =>
      prev.map((report) =>
        report.id === reportId ? { ...report, status: newStatus } : report
      )
    );
  };

  const handleAddClarification = (reportId) => {
    setInternshipReports((prev) =>
      prev.map((report) =>
        report.id === reportId
          ? { ...report, clarification: clarificationInput }
          : report
      )
    );
    setClarificationInput("");
  };

  // Filter internship reports according to filters
  const filteredInternshipReports = internshipReports.filter((report) => {
    if (filters.major && report.major !== filters.major) return false;
    if (filters.status && report.status !== filters.status) return false;
    return true;
  });

  // Modal close
  const closeModal = () => {
    setSelectedReport(null);
    setClarificationInput("");
  };

  // Download as PDF using jsPDF
  const handleDownloadPDF = () => {
    try {
      if (!selectedReport) {
        console.error('No report selected');
        return;
      }
      
      console.log('Generating PDF for report:', selectedReport);
      
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      let yPos = 20;
      
      // Add title
      doc.setFontSize(20);
      doc.setTextColor(79, 209, 197); // SCAD theme color
      doc.text("Internship Report", pageWidth / 2, yPos, { align: "center" });
      
      // Add student info
      yPos += 20;
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0); // Black text for better PDF readability
      doc.text(`Student: ${selectedReport.studentName}`, margin, yPos);
      
      if (activeTab === "internship") {
        yPos += 10;
        doc.text(`Major: ${selectedReport.major}`, margin, yPos);
        yPos += 10;
        doc.text(`Company: ${selectedReport.company}`, margin, yPos);
        yPos += 10;
        doc.text(`Supervisor: ${selectedReport.supervisor}`, margin, yPos);
        yPos += 10;
        doc.text(`Duration: ${selectedReport.startDate} to ${selectedReport.endDate}`, margin, yPos);
        
        if (selectedReport.evaluation) {
          yPos += 15;
          doc.setFontSize(14);
          doc.text("Evaluation", margin, yPos);
          yPos += 10;
          doc.setFontSize(12);
          doc.text(`Rating: ${selectedReport.evaluation.rating}/5`, margin, yPos);
          yPos += 10;
          doc.text(`Comments: ${selectedReport.evaluation.comments}`, margin, yPos);
        }
        
        if (selectedReport.clarification) {
          yPos += 15;
          doc.setFontSize(14);
          doc.text("Clarification", margin, yPos);
          yPos += 10;
          doc.setFontSize(12);
          doc.text(selectedReport.clarification, margin, yPos);
        }
      } else {
        yPos += 10;
        doc.text(`Company: ${selectedReport.company}`, margin, yPos);
        yPos += 10;
        doc.text(`Supervisor: ${selectedReport.supervisor}`, margin, yPos);
        yPos += 10;
        doc.text(`Internship Dates: ${selectedReport.internshipDates}`, margin, yPos);
        yPos += 10;
        doc.text(`Rating: ${selectedReport.rating}/5`, margin, yPos);
        yPos += 10;
        doc.text(`Comments: ${selectedReport.comments}`, margin, yPos);
      }
      
      // Add footer
      const today = new Date();
      doc.setFontSize(10);
      doc.setTextColor(128, 128, 128); // Gray text color
      doc.text(`Generated on: ${today.toLocaleDateString()}`, pageWidth - margin, doc.internal.pageSize.getHeight() - 10, { align: "right" });
      
      // Save the PDF
      const fileName = `${selectedReport.studentName.replace(/\s+/g, '_')}_Report.pdf`;
      console.log('Saving PDF as:', fileName);
      doc.save(fileName);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('There was an error generating the PDF. Please try again.');
    }
  };

  return (
    <div className="main-content" style={{ 
      padding: '20px',
      marginLeft: '260px', // Add margin to account for sidebar width
      width: 'calc(100% - 260px)', // Subtract sidebar width from total width
      minHeight: '100vh',
      backgroundColor: '#1A202C',
      color: '#E2E8F0'
    }}>
      <h1 style={{ color: '#E2E8F0', fontSize: '24px', marginBottom: '20px' }}>Reports</h1>

      <div className="tabs" style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setActiveTab("internship")}
          style={{
            padding: "10px 20px",
            marginRight: 10,
            backgroundColor: activeTab === "internship" ? "#4FD1C5" : "#2D3748",
            color: "#E2E8F0",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            transition: "all 0.2s ease"
          }}
        >
          Internship Reports
        </button>
        <button
          onClick={() => setActiveTab("evaluation")}
          style={{
            padding: "10px 20px",
            backgroundColor: activeTab === "evaluation" ? "#4FD1C5" : "#2D3748",
            color: "#E2E8F0",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            transition: "all 0.2s ease"
          }}
        >
          Evaluation Reports
        </button>
      </div>

      {activeTab === "internship" && (
        <>
          <div className="filters" style={{ 
            marginBottom: '20px', 
            display: "flex", 
            gap: '15px',
            flexWrap: 'wrap'
          }}>
            <select
              name="major"
              value={filters.major}
              onChange={handleFilterChange}
              style={{
                flex: 1,
                minWidth: '200px',
                padding: '10px',
                backgroundColor: '#2D3748',
                color: '#E2E8F0',
                border: '1px solid #4A5568',
                borderRadius: '8px'
              }}
            >
              <option value="">All Majors</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Business Administration">Business Administration</option>
              <option value="Engineering">Engineering</option>
            </select>

            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              style={{
                flex: 1,
                minWidth: '200px',
                padding: '10px',
                backgroundColor: '#2D3748',
                color: '#E2E8F0',
                border: '1px solid #4A5568',
                borderRadius: '8px'
              }}
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="flagged">Flagged</option>
              <option value="rejected">Rejected</option>
              <option value="accepted">Accepted</option>
            </select>
          </div>

          <div className="reports-list">
            {filteredInternshipReports.length === 0 && (
              <p style={{ color: '#A0AEC0', textAlign: 'center', padding: '40px' }}>
                No internship reports match the selected filters.
              </p>
            )}

            {filteredInternshipReports.map((report) => (
              <div
                key={report.id}
                className="report-card"
                style={{
                  backgroundColor: '#2D3748',
                  border: '1px solid #4A5568',
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '20px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div
                  className="report-header"
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <h3 style={{ margin: 0, color: '#E2E8F0' }}>{report.studentName}</h3>
                  <span
                    className={`status ${report.status}`}
                    style={{
                      padding: "6px 12px",
                      borderRadius: 6,
                      backgroundColor:
                        report.status === "accepted"
                          ? "#48BB78"
                          : report.status === "pending"
                          ? "#ED8936"
                          : report.status === "flagged"
                          ? "#F56565"
                          : report.status === "rejected"
                          ? "#A0AEC0"
                          : "#4A5568",
                      color: "white",
                      textTransform: "capitalize",
                      fontWeight: "500",
                      fontSize: 14,
                    }}
                  >
                    {report.status}
                  </span>
                </div>

                <div style={{ marginTop: '15px', color: '#A0AEC0' }}>
                  <p><strong style={{ color: '#E2E8F0' }}>Major:</strong> {report.major}</p>
                  <p><strong style={{ color: '#E2E8F0' }}>Company:</strong> {report.company}</p>
                  <p><strong style={{ color: '#E2E8F0' }}>Supervisor:</strong> {report.supervisor}</p>
                  <p><strong style={{ color: '#E2E8F0' }}>Duration:</strong> {report.startDate} to {report.endDate}</p>
                </div>

                <div style={{ 
                  marginTop: '15px', 
                  display: "flex", 
                  gap: '8px', 
                  flexWrap: "wrap" 
                }}>
                  <button 
                    onClick={() => setSelectedReport(report)}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#4FD1C5',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      fontSize: '14px',
                      minWidth: '100px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      '&:hover': {
                        backgroundColor: '#38B2AC'
                      }
                    }}
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => handleStatusChange(report.id, "accepted")}
                    disabled={report.status === "accepted"}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: report.status === "accepted" ? '#4A5568' : '#48BB78',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: report.status === "accepted" ? "not-allowed" : "pointer",
                      transition: 'all 0.2s ease',
                      fontSize: '14px',
                      minWidth: '100px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: report.status === "accepted" ? 0.7 : 1,
                      '&:hover': {
                        backgroundColor: report.status === "accepted" ? '#4A5568' : '#38A169'
                      }
                    }}
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => handleStatusChange(report.id, "flagged")}
                    disabled={report.status === "flagged"}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: report.status === "flagged" ? '#4A5568' : '#F56565',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: report.status === "flagged" ? "not-allowed" : "pointer",
                      transition: 'all 0.2s ease',
                      fontSize: '14px',
                      minWidth: '100px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: report.status === "flagged" ? 0.7 : 1,
                      '&:hover': {
                        backgroundColor: report.status === "flagged" ? '#4A5568' : '#E53E3E'
                      }
                    }}
                  >
                    Flag
                  </button>

                  <button
                    onClick={() => handleStatusChange(report.id, "rejected")}
                    disabled={report.status === "rejected"}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: report.status === "rejected" ? '#4A5568' : '#A0AEC0',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: report.status === "rejected" ? "not-allowed" : "pointer",
                      transition: 'all 0.2s ease',
                      fontSize: '14px',
                      minWidth: '100px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: report.status === "rejected" ? 0.7 : 1,
                      '&:hover': {
                        backgroundColor: report.status === "rejected" ? '#4A5568' : '#718096'
                      }
                    }}
                  >
                    Reject
                  </button>

                  <button
                    onClick={() => {
                      setSelectedReport(report);
                      setTimeout(() => handleDownloadPDF(), 300);
                    }}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#4FD1C5',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      fontSize: '14px',
                      minWidth: '100px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      '&:hover': {
                        backgroundColor: '#38B2AC'
                      }
                    }}
                  >
                    Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === "evaluation" && (
        <div className="evaluation-reports" style={{ marginTop: '20px' }}>
          {evaluationReports.length === 0 && (
            <p style={{ color: '#A0AEC0', textAlign: 'center', padding: '40px' }}>
              No evaluation reports found.
            </p>
          )}
          {evaluationReports.map((evalReport) => (
            <div
              key={evalReport.id}
              style={{
                backgroundColor: '#2D3748',
                border: '1px solid #4A5568',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '20px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            >
              <h3 style={{ color: '#E2E8F0', marginBottom: '15px' }}>{evalReport.studentName}</h3>
              <div style={{ color: '#A0AEC0' }}>
                <p><strong style={{ color: '#E2E8F0' }}>Company:</strong> {evalReport.company}</p>
                <p><strong style={{ color: '#E2E8F0' }}>Supervisor:</strong> {evalReport.supervisor}</p>
                <p><strong style={{ color: '#E2E8F0' }}>Internship Dates:</strong> {evalReport.internshipDates}</p>
                <p><strong style={{ color: '#E2E8F0' }}>Rating:</strong> {evalReport.rating}/5</p>
                <p><strong style={{ color: '#E2E8F0' }}>Comments:</strong> {evalReport.comments}</p>
              </div>
              <button
                onClick={() => {
                  setSelectedReport(evalReport);
                  setTimeout(() => handleDownloadPDF(), 300);
                }}
                style={{
                  marginTop: '15px',
                  padding: '8px 16px',
                  backgroundColor: '#4FD1C5',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                Download PDF
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedReport && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
          onClick={closeModal}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#2D3748",
              padding: "24px",
              borderRadius: "12px",
              maxWidth: 600,
              width: "90%",
              maxHeight: "80vh",
              overflowY: "auto",
              boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
              color: "#E2E8F0"
            }}
          >
            <h2 style={{ color: '#E2E8F0', marginBottom: '20px' }}>Report Details</h2>
            <p style={{ color: '#A0AEC0' }}><strong style={{ color: '#E2E8F0' }}>Student:</strong> {selectedReport.studentName}</p>

            {activeTab === "internship" ? (
              <>
                <p style={{ color: '#A0AEC0' }}><strong style={{ color: '#E2E8F0' }}>Major:</strong> {selectedReport.major}</p>
                <p style={{ color: '#A0AEC0' }}><strong style={{ color: '#E2E8F0' }}>Company:</strong> {selectedReport.company}</p>
                <p style={{ color: '#A0AEC0' }}><strong style={{ color: '#E2E8F0' }}>Supervisor:</strong> {selectedReport.supervisor}</p>
                <p style={{ color: '#A0AEC0' }}><strong style={{ color: '#E2E8F0' }}>Duration:</strong> {selectedReport.startDate} to {selectedReport.endDate}</p>

                {selectedReport.evaluation && (
                  <>
                    <h4 style={{ color: '#E2E8F0', marginTop: '20px', marginBottom: '10px' }}>Evaluation</h4>
                    <p style={{ color: '#A0AEC0' }}><strong style={{ color: '#E2E8F0' }}>Rating:</strong> {selectedReport.evaluation.rating}/5</p>
                    <p style={{ color: '#A0AEC0' }}><strong style={{ color: '#E2E8F0' }}>Comments:</strong> {selectedReport.evaluation.comments}</p>
                  </>
                )}

                {["flagged", "rejected"].includes(selectedReport.status) && (
                  <>
                    <h4 style={{ color: '#E2E8F0', marginTop: '20px', marginBottom: '10px' }}>Submit Clarification</h4>
                    <textarea
                      rows={3}
                      value={clarificationInput}
                      onChange={(e) => setClarificationInput(e.target.value)}
                      style={{
                        width: "100%",
                        padding: '12px',
                        borderRadius: '8px',
                        backgroundColor: '#1A202C',
                        color: '#E2E8F0',
                        border: '1px solid #4A5568',
                        marginBottom: '10px'
                      }}
                      placeholder="Explain why the report was flagged or rejected..."
                    />
                    <button
                      onClick={() => {
                        handleAddClarification(selectedReport.id);
                        alert("Clarification submitted!");
                      }}
                      disabled={!clarificationInput.trim()}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#4FD1C5',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        opacity: !clarificationInput.trim() ? 0.5 : 1
                      }}
                    >
                      Submit Clarification
                    </button>
                  </>
                )}

                {selectedReport.clarification && (
                  <>
                    <h4 style={{ color: '#E2E8F0', marginTop: '20px', marginBottom: '10px' }}>Clarification</h4>
                    <p style={{ color: '#A0AEC0' }}>{selectedReport.clarification}</p>
                  </>
                )}
              </>
            ) : (
              <>
                <p style={{ color: '#A0AEC0' }}><strong style={{ color: '#E2E8F0' }}>Company:</strong> {selectedReport.company}</p>
                <p style={{ color: '#A0AEC0' }}><strong style={{ color: '#E2E8F0' }}>Supervisor:</strong> {selectedReport.supervisor}</p>
                <p style={{ color: '#A0AEC0' }}><strong style={{ color: '#E2E8F0' }}>Internship Dates:</strong> {selectedReport.internshipDates}</p>
                <p style={{ color: '#A0AEC0' }}><strong style={{ color: '#E2E8F0' }}>Rating:</strong> {selectedReport.rating}/5</p>
                <p style={{ color: '#A0AEC0' }}><strong style={{ color: '#E2E8F0' }}>Comments:</strong> {selectedReport.comments}</p>
              </>
            )}

            <button
              onClick={closeModal}
              style={{
                marginTop: '20px',
                padding: '6px 12px',
                backgroundColor: '#4FD1C5',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontSize: '14px',
                minWidth: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover': {
                  backgroundColor: '#38B2AC'
                }
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InternshipReports;
