import React, { useState, useEffect } from 'react';

const InternshipReports = () => {
    const [reports, setReports] = useState([]);
    const [filters, setFilters] = useState({
        major: 'all',
        status: 'all'
    });
    const [selectedReport, setSelectedReport] = useState(null);
    const [comment, setComment] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                reportUrl: '#', // Replace with actual PDF URL
                comments: []
            },
            {
                id: 2,
                studentName: 'Jane Smith',
                major: 'Data Science',
                company: 'Data Systems',
                status: 'accepted',
                submissionDate: '2024-03-14',
                reportUrl: '#',
                comments: []
            },
            {
                id: 3,
                studentName: 'Mike Johnson',
                major: 'Computer Science',
                company: 'Design Studio',
                status: 'flagged',
                submissionDate: '2024-03-13',
                reportUrl: '#',
                comments: []
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
        setIsModalOpen(false);
    };

    const handleCommentSubmit = (reportId) => {
        if (!comment.trim()) return;

        setReports(prev => prev.map(report => 
            report.id === reportId 
                ? { 
                    ...report, 
                    comments: [...report.comments, {
                        id: Date.now(),
                        text: comment,
                        timestamp: new Date().toISOString()
                    }]
                }
                : report
        ));
        setComment('');
    };

    const filteredReports = reports.filter(report => {
        if (filters.major !== 'all' && report.major !== filters.major) return false;
        if (filters.status !== 'all' && report.status !== filters.status) return false;
        return true;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'accepted': return 'bg-green-100 text-green-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            case 'flagged': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="main-content">
            <div className="p-6 max-w-7xl mx-auto space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Internship Reports</h1>
                </div>

                <div className="custom-box p-4">
                    <div className="flex flex-wrap gap-4">
                        <select 
                            name="major" 
                            value={filters.major} 
                            onChange={handleFilterChange}
                            className="p-2 border rounded bg-white text-gray-900"
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
                            className="p-2 border rounded bg-white text-gray-900"
                        >
                            <option value="all">All Statuses</option>
                            <option value="pending">Pending</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                            <option value="flagged">Flagged</option>
                        </select>
                    </div>
                </div>

                <div className="custom-box">
                    <h2 className="text-xl font-bold mb-4">Reports</h2>
                    <style>{`.purple-btn { background: #8b5cf6 !important; color: #fff !important; border-radius: 0.375rem; padding: 0.5rem 1rem; text-align: center; display: inline-block; transition: background 0.2s; } .purple-btn:hover { background: #7c3aed !important; }`}</style>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-200 rounded-lg">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 border-b">Student</th>
                                    <th className="px-4 py-2 border-b">Major</th>
                                    <th className="px-4 py-2 border-b">Company</th>
                                    <th className="px-4 py-2 border-b">Status</th>
                                    <th className="px-4 py-2 border-b">Submission Date</th>
                                    </tr>
                            </thead>
                            <tbody>
                                {filteredReports.map((report) => (
                                    <tr key={report.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-2">{report.studentName}</td>
                                        <td className="px-4 py-2">{report.major}</td>
                                        <td className="px-4 py-2">{report.company}</td>
                                        <td className="px-4 py-2 capitalize">{report.status.replace('_', ' ')}</td>
                                        <td className="px-4 py-2">{report.submissionDate}</td>
                                        <td className="px-4 py-2 flex flex-wrap gap-2">
                                            <button
                                                onClick={() => {
                                                    setSelectedReport(report);
                                                    setIsModalOpen(true);
                                                }}
                                                className="accept-btn"
                                            >
                                                View Details
                                            </button>
                                            <a
                                                href={report.reportUrl}
                                                download={`Report_${report.studentName.replace(/\s/g, '_')}.pdf`}
                                                className="purple-btn"
                                            >
                                                Download PDF
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                                {filteredReports.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="text-center py-8 text-gray-500">
                                            No reports found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {isModalOpen && selectedReport && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                        <div className="custom-box max-w-2xl w-full p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">Report Details</h2>
                                <button 
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="font-semibold">Student Name</p>
                                        <p>{selectedReport.studentName}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Major</p>
                                        <p>{selectedReport.major}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Company</p>
                                        <p>{selectedReport.company}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Submission Date</p>
                                        <p>{selectedReport.submissionDate}</p>
                                    </div>
                                </div>

                                <div className="border-t pt-4">
                                    <h3 className="font-semibold mb-2">Update Status</h3>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => handleStatusUpdate(selectedReport.id, 'accepted')}
                                            className="accept-btn"
                                        >
                                            Accept
                                        </button>
                                        <button 
                                            onClick={() => handleStatusUpdate(selectedReport.id, 'rejected')}
                                            className="reject-btn"
                                        >
                                            Reject
                                        </button>
                                        <button 
                                            onClick={() => handleStatusUpdate(selectedReport.id, 'flagged')}
                                            className="save-btn"
                                        >
                                            Flag
                                        </button>
                                    </div>
                                </div>

                                <div className="border-t pt-4">
                                    <h3 className="font-semibold mb-2">Comments</h3>
                                    <div className="space-y-2 mb-4">
                                        {selectedReport.comments.map(comment => (
                                            <div key={comment.id} className="bg-gray-50 p-2 rounded">
                                                <p className="text-sm">{comment.text}</p>
                                                <p className="text-xs text-gray-500">{new Date(comment.timestamp).toLocaleString()}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <textarea
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="Enter your comment here..."
                                        className="w-full p-2 border rounded mb-2"
                                        rows="3"
                                    />
                                    <button 
                                        onClick={() => handleCommentSubmit(selectedReport.id)}
                                        className="accept-btn"
                                    >
                                        Submit Comment
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InternshipReports; 