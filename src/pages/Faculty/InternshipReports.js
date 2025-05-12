import React, { useState, useEffect } from 'react';

const InternshipReports = () => {
    const [reports, setReports] = useState([]);
    const [filters, setFilters] = useState({
        major: 'all',
        status: 'all'
    });
    const [selectedReport, setSelectedReport] = useState(null);
    const [comment, setComment] = useState('');

    // Dummy data for demonstration
    useEffect(() => {
        setReports([
            {
                id: 1,
                studentName: 'John Doe',
                major: 'Computer Science',
                company: 'Tech Corp',
                status: 'pending',
                submissionDate: '2024-03-15',
                reportUrl: '#'
            },
            {
                id: 2,
                studentName: 'Jane Smith',
                major: 'Data Science',
                company: 'Data Systems',
                status: 'accepted',
                submissionDate: '2024-03-14',
                reportUrl: '#'
            },
            {
                id: 3,
                studentName: 'Mike Johnson',
                major: 'Computer Science',
                company: 'Design Studio',
                status: 'flagged',
                submissionDate: '2024-03-13',
                reportUrl: '#'
            }
        ]);
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleStatusUpdate = (reportId, newStatus) => {
        setReports(prev => prev.map(report => 
            report.id === reportId 
                ? { ...report, status: newStatus }
                : report
        ));
    };

    const handleCommentSubmit = (reportId) => {
        if (!comment.trim()) return;
        
        // In a real application, this would send the comment to the backend
        alert(`Comment submitted for report ${reportId}: ${comment}`);
        setComment('');
    };

    const filteredReports = reports.filter(report => {
        if (filters.major !== 'all' && report.major !== filters.major) return false;
        if (filters.status !== 'all' && report.status !== filters.status) return false;
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
                    <option value="all">All Majors</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Data Science">Data Science</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                </select>

                <select 
                    name="status" 
                    value={filters.status} 
                    onChange={handleFilterChange}
                >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                    <option value="flagged">Flagged</option>
                </select>
            </div>

            <div className="reports-container">
                <div className="reports-list">
                    <h2>Reports</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Major</th>
                                <th>Company</th>
                                <th>Status</th>
                                <th>Submission Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredReports.map(report => (
                                <tr key={report.id}>
                                    <td>{report.studentName}</td>
                                    <td>{report.major}</td>
                                    <td>{report.company}</td>
                                    <td>{report.status}</td>
                                    <td>{report.submissionDate}</td>
                                    <td>
                                        <button onClick={() => setSelectedReport(report)}>
                                            View Details
                                        </button>
                                        <a href={report.reportUrl} download>
                                            Download PDF
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {selectedReport && (
                    <div className="report-details">
                        <h2>Report Details</h2>
                        <div className="details-content">
                            <h3>{selectedReport.studentName}'s Report</h3>
                            <p><strong>Major:</strong> {selectedReport.major}</p>
                            <p><strong>Company:</strong> {selectedReport.company}</p>
                            <p><strong>Status:</strong> {selectedReport.status}</p>
                            <p><strong>Submission Date:</strong> {selectedReport.submissionDate}</p>

                            <div className="status-actions">
                                <h4>Update Status</h4>
                                <div className="status-buttons">
                                    <button 
                                        onClick={() => handleStatusUpdate(selectedReport.id, 'accepted')}
                                    >
                                        Accept
                                    </button>
                                    <button 
                                        onClick={() => handleStatusUpdate(selectedReport.id, 'rejected')}
                                    >
                                        Reject
                                    </button>
                                    <button 
                                        onClick={() => handleStatusUpdate(selectedReport.id, 'flagged')}
                                    >
                                        Flag
                                    </button>
                                </div>
                            </div>

                            <div className="comments-section">
                                <h4>Add Comment</h4>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Enter your comment here..."
                                />
                                <button onClick={() => handleCommentSubmit(selectedReport.id)}>
                                    Submit Comment
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InternshipReports; 