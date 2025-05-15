import React, { useState, useEffect } from 'react';

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [evaluations, setEvaluations] = useState([]);
    const [filters, setFilters] = useState({
        major: 'all',
        status: 'all',
        type: 'all' // 'all', 'internship', 'evaluation'
    });
    const [selectedReport, setSelectedReport] = useState(null);
    const [clarification, setClarification] = useState('');

    // Dummy data for demonstration
    useEffect(() => {
        setReports([
            {
                id: 1,
                type: 'internship',
                studentName: 'John Doe',
                major: 'Computer Science',
                company: 'Tech Corp',
                supervisor: 'Jane Smith',
                startDate: '2024-01-15',
                endDate: '2024-03-15',
                status: 'pending',
                submissionDate: '2024-03-15',
                reportUrl: '#'
            },
            {
                id: 2,
                type: 'internship',
                studentName: 'Jane Smith',
                major: 'Data Science',
                company: 'Data Systems',
                supervisor: 'Mike Johnson',
                startDate: '2024-01-20',
                endDate: '2024-03-20',
                status: 'accepted',
                submissionDate: '2024-03-14',
                reportUrl: '#'
            }
        ]);

        setEvaluations([
            {
                id: 1,
                type: 'evaluation',
                studentName: 'John Doe',
                major: 'Computer Science',
                company: 'Tech Corp',
                status: 'completed',
                submissionDate: '2024-03-15',
                evaluationUrl: '#'
            },
            {
                id: 2,
                type: 'evaluation',
                studentName: 'Jane Smith',
                major: 'Data Science',
                company: 'Data Systems',
                status: 'pending',
                submissionDate: '2024-03-14',
                evaluationUrl: '#'
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

    const handleStatusUpdate = (id, newStatus) => {
        if (selectedReport.type === 'internship') {
            setReports(prev =>
                prev.map(report =>
                    report.id === id
                        ? { ...report, status: newStatus }
                        : report
                )
            );
        } else {
            setEvaluations(prev =>
                prev.map(evaluation =>
                    evaluation.id === id
                        ? { ...evaluation, status: newStatus }
                        : evaluation
                )
            );
        }
        setSelectedReport(prev => ({ ...prev, status: newStatus }));
    };

    const handleClarificationSubmit = () => {
        if (selectedReport && clarification.trim()) {
            // TODO: Implement clarification submission
            alert('Clarification submitted: ' + clarification);
            setClarification('');
        }
    };

    const allItems = [...reports, ...evaluations];
    const filteredItems = allItems.filter(item => {
        if (filters.major !== 'all' && item.major !== filters.major) return false;
        if (filters.status !== 'all' && item.status !== filters.status) return false;
        if (filters.type !== 'all' && item.type !== filters.type) return false;
        return true;
    });

    return (
        <div className="reports-page">
            <h1>Reports</h1>

            <div className="filters">
                <select 
                    name="type" 
                    value={filters.type} 
                    onChange={handleFilterChange}
                >
                    <option value="all">All Types</option>
                    <option value="internship">Internship Reports</option>
                    <option value="evaluation">Evaluation Reports</option>
                </select>

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
                    <option value="completed">Completed</option>
                </select>
            </div>

            <div className="reports-container">
                <div className="reports-list">
                    <h2>Reports</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Student</th>
                                <th>Major</th>
                                <th>Company</th>
                                <th>Status</th>
                                <th>Submission Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredItems.map(item => (
                                <tr key={item.id}>
                                    <td>{item.type === 'internship' ? 'Internship' : 'Evaluation'}</td>
                                    <td>{item.studentName}</td>
                                    <td>{item.major}</td>
                                    <td>{item.company}</td>
                                    <td>{item.status}</td>
                                    <td>{item.submissionDate}</td>
                                    <td>
                                        <button onClick={() => setSelectedReport(item)}>
                                            View Details
                                        </button>
                                        <a href={item.type === 'internship' ? item.reportUrl : item.evaluationUrl} download>
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
                            <h3>{selectedReport.studentName}'s {selectedReport.type === 'internship' ? 'Internship' : 'Evaluation'} Report</h3>
                            <p><strong>Major:</strong> {selectedReport.major}</p>
                            <p><strong>Company:</strong> {selectedReport.company}</p>
                            <p><strong>Status:</strong> {selectedReport.status}</p>
                            <p><strong>Submission Date:</strong> {selectedReport.submissionDate}</p>

                            {selectedReport.type === 'internship' && (
                                <>
                                    <p><strong>Supervisor:</strong> {selectedReport.supervisor}</p>
                                    <p><strong>Start Date:</strong> {selectedReport.startDate}</p>
                                    <p><strong>End Date:</strong> {selectedReport.endDate}</p>
                                </>
                            )}

                            <div className="status-actions">
                                <h4>Update Status</h4>
                                <div className="status-buttons">
                                    <button 
                                        className={selectedReport.status === 'accepted' ? 'active' : ''}
                                        onClick={() => handleStatusUpdate(selectedReport.id, 'accepted')}
                                    >
                                        Accept
                                    </button>
                                    <button 
                                        className={selectedReport.status === 'rejected' ? 'active' : ''}
                                        onClick={() => handleStatusUpdate(selectedReport.id, 'rejected')}
                                    >
                                        Reject
                                    </button>
                                    <button 
                                        className={selectedReport.status === 'flagged' ? 'active' : ''}
                                        onClick={() => handleStatusUpdate(selectedReport.id, 'flagged')}
                                    >
                                        Flag
                                    </button>
                                </div>
                            </div>

                            {(selectedReport.status === 'rejected' || selectedReport.status === 'flagged') && (
                                <div className="clarification-section">
                                    <h4>Add Clarification</h4>
                                    <textarea
                                        value={clarification}
                                        onChange={(e) => setClarification(e.target.value)}
                                        placeholder="Enter your clarification here..."
                                        rows="4"
                                    />
                                    <button onClick={handleClarificationSubmit}>
                                        Submit Clarification
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reports; 