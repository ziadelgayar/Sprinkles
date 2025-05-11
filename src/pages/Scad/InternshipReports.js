import React, { useState } from 'react';

const InternshipReports = () => {
  const [filters, setFilters] = useState({
    major: '',
    status: ''
  });

  const [reports, setReports] = useState([
    {
      id: 1,
      studentName: 'John Doe',
      major: 'Computer Science',
      company: 'Tech Corp',
      supervisor: 'Jane Smith',
      startDate: '2024-01-15',
      endDate: '2024-04-15',
      status: 'pending',
      evaluation: {
        rating: 4.5,
        comments: 'Excellent performance'
      }
    },
    // Add more dummy data as needed
  ]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStatusChange = (reportId, newStatus) => {
    setReports(prev => prev.map(report => 
      report.id === reportId ? { ...report, status: newStatus } : report
    ));
  };

  const handleAddClarification = (reportId, clarification) => {
    setReports(prev => prev.map(report => 
      report.id === reportId ? { 
        ...report, 
        clarification: clarification 
      } : report
    ));
  };

  const filteredReports = reports.filter(report => {
    if (filters.major && report.major !== filters.major) return false;
    if (filters.status && report.status !== filters.status) return false;
    return true;
  });

  return (
    <div className="internship-reports">
      <h1>Internship Reports</h1>

      <div className="filters">
        <select 
          name="major" 
          value={filters.major} 
          onChange={handleFilterChange}
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
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="flagged">Flagged</option>
          <option value="rejected">Rejected</option>
          <option value="accepted">Accepted</option>
        </select>
      </div>

      <div className="reports-list">
        {filteredReports.map(report => (
          <div key={report.id} className="report-card">
            <div className="report-header">
              <h3>{report.studentName}</h3>
              <span className={`status ${report.status}`}>
                {report.status}
              </span>
            </div>

            <div className="report-details">
              <p><strong>Major:</strong> {report.major}</p>
              <p><strong>Company:</strong> {report.company}</p>
              <p><strong>Supervisor:</strong> {report.supervisor}</p>
              <p><strong>Duration:</strong> {report.startDate} to {report.endDate}</p>
              
              {report.evaluation && (
                <div className="evaluation">
                  <p><strong>Rating:</strong> {report.evaluation.rating}/5</p>
                  <p><strong>Comments:</strong> {report.evaluation.comments}</p>
                </div>
              )}

              {report.clarification && (
                <div className="clarification">
                  <p><strong>Clarification:</strong> {report.clarification}</p>
                </div>
              )}
            </div>

            <div className="report-actions">
              <button onClick={() => handleStatusChange(report.id, 'accepted')}>
                Accept
              </button>
              <button onClick={() => handleStatusChange(report.id, 'flagged')}>
                Flag
              </button>
              <button onClick={() => handleStatusChange(report.id, 'rejected')}>
                Reject
              </button>
              <button onClick={() => window.location.href = `/scad/reports/${report.id}`}>
                View Details
              </button>
              <button onClick={() => window.print()}>
                Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InternshipReports; 