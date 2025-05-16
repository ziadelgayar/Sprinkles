import React, { useState, useEffect } from 'react';

const EvaluationReports = () => {
    const [evaluations, setEvaluations] = useState([]);
    const [filters, setFilters] = useState({
        major: 'all',
        status: 'all'
    });
    const [selectedEvaluation, setSelectedEvaluation] = useState(null);

    // Dummy data including mainSupervisor, startDate, endDate
    useEffect(() => {
        setEvaluations([
            {
                id: 1,
                studentName: 'John Doe',
                major: 'Computer Science',
                company: 'Tech Corp',
                mainSupervisor: 'Alice Johnson',
                startDate: '2024-01-01',
                endDate: '2024-03-01',
                status: 'completed',
                submissionDate: '2024-03-15',
                evaluationUrl: '#'
            },
            {
                id: 2,
                studentName: 'Jane Smith',
                major: 'Data Science',
                company: 'Data Systems',
                mainSupervisor: 'Bob Williams',
                startDate: '2024-02-01',
                endDate: '2024-04-01',
                status: 'pending',
                submissionDate: '2024-03-14',
                evaluationUrl: '#'
            },
            {
                id: 3,
                studentName: 'Mike Johnson',
                major: 'Computer Science',
                company: 'Design Studio',
                mainSupervisor: 'Carol Davis',
                startDate: '2024-01-15',
                endDate: '2024-03-15',
                status: 'in_progress',
                submissionDate: '2024-03-13',
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

    const filteredEvaluations = evaluations.filter(evaluation => {
        if (filters.major !== 'all' && evaluation.major !== filters.major) return false;
        if (filters.status !== 'all' && evaluation.status !== filters.status) return false;
        return true;
    });

    return (
        <div className="main-content">
            <div className="p-6 max-w-5xl mx-auto space-y-8">
                <h1 className="text-2xl font-bold mb-4">Evaluation Reports</h1>

                <div className="custom-box mb-6 flex flex-wrap gap-4 items-center">
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
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <div className="custom-box mb-6">
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
                                {filteredEvaluations.map((evaluation) => (
                                    <tr key={evaluation.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-2">{evaluation.studentName}</td>
                                        <td className="px-4 py-2">{evaluation.major}</td>
                                        <td className="px-4 py-2">{evaluation.company}</td>
                                        <td className="px-4 py-2 capitalize">{evaluation.status.replace('_', ' ')}</td>
                                        <td className="px-4 py-2">{evaluation.submissionDate}</td>
                                        <td className="px-4 py-2 flex flex-wrap gap-2">
                                            <button
                                                onClick={() => setSelectedEvaluation(evaluation)}
                                                className="accept-btn"
                                            >
                                                View Details
                                            </button>
                                            <a
                                                href={evaluation.evaluationUrl}
                                                download
                                                className="purple-btn"
                                            >
                                                Download PDF
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                                {filteredEvaluations.length === 0 && (
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

                {selectedEvaluation && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                        <div className="custom-box max-w-lg w-full p-6 relative">
                            <button
                                onClick={() => setSelectedEvaluation(null)}
                                className="cancel-btn absolute top-4 right-4"
                            >
                                Close
                            </button>
                            <h2 className="text-xl font-bold mb-4">Evaluation Details</h2>
                            <div className="space-y-2">
                                <p><strong>Student Name:</strong> {selectedEvaluation.studentName}</p>
                                <p><strong>Major:</strong> {selectedEvaluation.major}</p>
                                <p><strong>Company:</strong> {selectedEvaluation.company}</p>
                                <p><strong>Main Supervisor:</strong> {selectedEvaluation.mainSupervisor}</p>
                                <p><strong>Internship Start Date:</strong> {selectedEvaluation.startDate}</p>
                                <p><strong>Internship End Date:</strong> {selectedEvaluation.endDate}</p>
                                <p><strong>Status:</strong> {selectedEvaluation.status.replace('_', ' ')}</p>
                                <p><strong>Submission Date:</strong> {selectedEvaluation.submissionDate}</p>
                                <div className="w-full flex justify-end mt-4">
                                    <a
                                        href={selectedEvaluation.evaluationUrl}
                                        download
                                        className="purple-btn"
                                    >
                                        Download PDF
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EvaluationReports; 