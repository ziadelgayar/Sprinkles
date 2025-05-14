import React, { useState, useEffect } from 'react';

const EvaluationReports = () => {
    const [evaluations, setEvaluations] = useState([]);
    const [filters, setFilters] = useState({
        major: 'all',
        status: 'all'
    });

    // Dummy data for demonstration
    useEffect(() => {
        setEvaluations([
            {
                id: 1,
                studentName: 'John Doe',
                major: 'Computer Science',
                company: 'Tech Corp',
                status: 'completed',
                submissionDate: '2024-03-15',
                evaluationUrl: '#'
            },
            {
                id: 2,
                studentName: 'Jane Smith',
                major: 'Data Science',
                company: 'Data Systems',
                status: 'pending',
                submissionDate: '2024-03-14',
                evaluationUrl: '#'
            },
            {
                id: 3,
                studentName: 'Mike Johnson',
                major: 'Computer Science',
                company: 'Design Studio',
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
            <div className="evaluation-reports">
                <h1>Evaluation Reports</h1>

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
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <h2>Reports</h2>

                <div className="evaluations-list">
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
                            {filteredEvaluations.map(evaluation => (
                                <tr key={evaluation.id}>
                                    <td>{evaluation.studentName}</td>
                                    <td>{evaluation.major}</td>
                                    <td>{evaluation.company}</td>
                                    <td>{evaluation.status.replace('_', ' ')}</td>
                                    <td>{evaluation.submissionDate}</td>
                                    <td>
                                        <button>View Details</button>
                                        <a href={evaluation.evaluationUrl} download>
                                            Download PDF
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EvaluationReports; 