import React, { useState } from "react";

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

  // Download as PDF simulation: just print the selected report's section
  const handleDownloadPDF = () => {
    if (!selectedReport) return;
    // Create a new window with report content for print
    const printWindow = window.open("", "", "width=600,height=600");
    printWindow.document.write("<html><head><title>Report PDF</title></head><body>");
    printWindow.document.write(`<h2>Report Details</h2>`);
    printWindow.document.write(`<p><strong>Student:</strong> ${selectedReport.studentName}</p>`);
    if (activeTab === "internship") {
      printWindow.document.write(`<p><strong>Major:</strong> ${selectedReport.major}</p>`);
      printWindow.document.write(`<p><strong>Company:</strong> ${selectedReport.company}</p>`);
      printWindow.document.write(`<p><strong>Supervisor:</strong> ${selectedReport.supervisor}</p>`);
      printWindow.document.write(`<p><strong>Duration:</strong> ${selectedReport.startDate} to ${selectedReport.endDate}</p>`);
      if (selectedReport.evaluation) {
        printWindow.document.write(`<p><strong>Evaluation Rating:</strong> ${selectedReport.evaluation.rating}/5</p>`);
        printWindow.document.write(`<p><strong>Evaluation Comments:</strong> ${selectedReport.evaluation.comments}</p>`);
      }
    } else {
      printWindow.document.write(`<p><strong>Company:</strong> ${selectedReport.company}</p>`);
      printWindow.document.write(`<p><strong>Supervisor:</strong> ${selectedReport.supervisor}</p>`);
      printWindow.document.write(`<p><strong>Internship Dates:</strong> ${selectedReport.internshipDates}</p>`);
      printWindow.document.write(`<p><strong>Rating:</strong> ${selectedReport.rating}/5</p>`);
      printWindow.document.write(`<p><strong>Comments:</strong> ${selectedReport.comments}</p>`);
    }
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="main-content" style={{ padding: 20, maxWidth: 900, margin: "auto" }}>
      <h1>Reports</h1>

      <div className="tabs" style={{ marginBottom: 20 }}>
        <button
          onClick={() => setActiveTab("internship")}
          style={{
            padding: "8px 16px",
            marginRight: 10,
            backgroundColor: activeTab === "internship" ? "#1976d2" : "#eee",
            color: activeTab === "internship" ? "white" : "#333",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Internship Reports
        </button>
        <button
          onClick={() => setActiveTab("evaluation")}
          style={{
            padding: "8px 16px",
            backgroundColor: activeTab === "evaluation" ? "#1976d2" : "#eee",
            color: activeTab === "evaluation" ? "white" : "#333",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Evaluation Reports
        </button>
      </div>

      {activeTab === "internship" && (
        <>
          <div className="filters" style={{ marginBottom: 15, display: "flex", gap: 10 }}>
            <select
              name="major"
              value={filters.major}
              onChange={handleFilterChange}
              style={{ flex: 1, padding: 8 }}
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
              style={{ flex: 1, padding: 8 }}
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="flagged">Flagged</option>
              <option value="rejected">Rejected</option>
              <option value="accepted">Accepted</option>
            </select>
          </div>

          <div className="reports-list" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {filteredInternshipReports.length === 0 && (
              <p>No internship reports match the selected filters.</p>
            )}

            {filteredInternshipReports.map((report) => (
              <div
                key={report.id}
                className="report-card"
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 6,
                  padding: 12,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                }}
              >
                <div
                  className="report-header"
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <h3 style={{ margin: 0 }}>{report.studentName}</h3>
                  <span
                    className={`status ${report.status}`}
                    style={{
                      padding: "4px 8px",
                      borderRadius: 4,
                      backgroundColor:
                        report.status === "accepted"
                          ? "#4caf50"
                          : report.status === "pending"
                          ? "#ff9800"
                          : report.status === "flagged"
                          ? "#f44336"
                          : report.status === "rejected"
                          ? "#9e9e9e"
                          : "#ccc",
                      color: "white",
                      textTransform: "capitalize",
                      fontWeight: "bold",
                      fontSize: 12,
                    }}
                  >
                    {report.status}
                  </span>
                </div>

                <div className="report-details" style={{ marginTop: 8 }}>
                  <p><strong>Major:</strong> {report.major}</p>
                  <p><strong>Company:</strong> {report.company}</p>
                  <p><strong>Supervisor:</strong> {report.supervisor}</p>
                  <p><strong>Duration:</strong> {report.startDate} to {report.endDate}</p>
                </div>

                <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button onClick={() => setSelectedReport(report)} style={{ cursor: "pointer" }}>
                    View Details
                  </button>

                  <button
                    onClick={() => handleStatusChange(report.id, "accepted")}
                    disabled={report.status === "accepted"}
                    style={{ cursor: report.status === "accepted" ? "not-allowed" : "pointer" }}
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => handleStatusChange(report.id, "flagged")}
                    disabled={report.status === "flagged"}
                    style={{ cursor: report.status === "flagged" ? "not-allowed" : "pointer" }}
                  >
                    Flag
                  </button>

                  <button
                    onClick={() => handleStatusChange(report.id, "rejected")}
                    disabled={report.status === "rejected"}
                    style={{ cursor: report.status === "rejected" ? "not-allowed" : "pointer" }}
                  >
                    Reject
                  </button>

                  <button
                    onClick={() => {
                      setSelectedReport(report);
                      setTimeout(() => handleDownloadPDF(), 300);
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
        <div className="evaluation-reports" style={{ marginTop: 20 }}>
          {evaluationReports.length === 0 && <p>No evaluation reports found.</p>}
          {evaluationReports.map((evalReport) => (
            <div
              key={evalReport.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: 6,
                padding: 12,
                marginBottom: 10,
              }}
            >
              <h3>{evalReport.studentName}</h3>
              <p><strong>Company:</strong> {evalReport.company}</p>
              <p><strong>Supervisor:</strong> {evalReport.supervisor}</p>
              <p><strong>Internship Dates:</strong> {evalReport.internshipDates}</p>
              <p><strong>Rating:</strong> {evalReport.rating}/5</p>
              <p><strong>Comments:</strong> {evalReport.comments}</p>
              <button
                onClick={() => {
                  setSelectedReport(evalReport);
                  setTimeout(() => handleDownloadPDF(), 300);
                }}
              >
                Download PDF
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal for viewing details + clarifications */}
      {selectedReport && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
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
              backgroundColor: "white",
              padding: 20,
              borderRadius: 8,
              maxWidth: 600,
              width: "90%",
              maxHeight: "80vh",
              overflowY: "auto",
              boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
            }}
          >
            <h2>Report Details</h2>
            <p><strong>Student:</strong> {selectedReport.studentName}</p>

            {activeTab === "internship" ? (
              <>
                <p><strong>Major:</strong> {selectedReport.major}</p>
                <p><strong>Company:</strong> {selectedReport.company}</p>
                <p><strong>Supervisor:</strong> {selectedReport.supervisor}</p>
                <p><strong>Duration:</strong> {selectedReport.startDate} to {selectedReport.endDate}</p>

                {selectedReport.evaluation && (
                  <>
                    <h4>Evaluation</h4>
                    <p><strong>Rating:</strong> {selectedReport.evaluation.rating}/5</p>
                    <p><strong>Comments:</strong> {selectedReport.evaluation.comments}</p>
                  </>
                )}

                {["flagged", "rejected"].includes(selectedReport.status) && (
                  <>
                    <h4>Submit Clarification</h4>
                    <textarea
                      rows={3}
                      value={clarificationInput}
                      onChange={(e) => setClarificationInput(e.target.value)}
                      style={{ width: "100%", padding: 8, borderRadius: 4, borderColor: "#ccc" }}
                      placeholder="Explain why the report was flagged or rejected..."
                    />
                    <button
                      onClick={() => {
                        handleAddClarification(selectedReport.id);
                        alert("Clarification submitted!");
                      }}
                      disabled={!clarificationInput.trim()}
                      style={{ marginTop: 8 }}
                    >
                      Submit Clarification
                    </button>
                  </>
                )}

                {selectedReport.clarification && (
                  <>
                    <h4>Clarification</h4>
                    <p>{selectedReport.clarification}</p>
                  </>
                )}
              </>
            ) : (
              <>
                <p><strong>Company:</strong> {selectedReport.company}</p>
                <p><strong>Supervisor:</strong> {selectedReport.supervisor}</p>
                <p><strong>Internship Dates:</strong> {selectedReport.internshipDates}</p>
                <p><strong>Rating:</strong> {selectedReport.rating}/5</p>
                <p><strong>Comments:</strong> {selectedReport.comments}</p>
              </>
            )}

            <button
              onClick={closeModal}
              style={{ marginTop: 20, padding: "8px 16px", cursor: "pointer" }}
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
