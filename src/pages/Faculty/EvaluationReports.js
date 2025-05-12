import React, { useState, useEffect } from 'react';

const EvaluationReports = () => {
    const [evaluations, setEvaluations] = useState([]);
    const [selectedEvaluation, setSelectedEvaluation] = useState(null);

    // Dummy data for demonstration
    useEffect(() => {
        setEvaluations([
            {
                id: 1,
                studentName: 'John Doe',
                studentId: 'STU001',
                company: 'Tech Corp',
                supervisor: 'Sarah Wilson',
                startDate: '2024-01-15',
                endDate: '2024-03-15',
                evaluationUrl: '#',
                status: 'completed'
            },
            {
                id: 2,
                studentName: 'Jane Smith',
                studentId: 'STU002',
                company: 'Data Systems',
                supervisor: 'Michael Brown',
                startDate: '2024-02-01',
                endDate: '2024-04-01',
                evaluationUrl: '#',
                status: 'in-progress'
            }
        ]);
    }, []);

    return (
        <div className="evaluation-reports">
            <h1>Evaluation Reports</h1>

            <div className="evaluations-container">
                <div className="evaluations-list">
                    <h2>Evaluations</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Company</th>
                                <th>Supervisor</th>
                                <th>Duration</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {evaluations.map(evaluation => (
                                <tr key={evaluation.id}>
                                    <td>{evaluation.studentName}</td>
                                    <td>{evaluation.company}</td>
                                    <td>{evaluation.supervisor}</td>
                                    <td>
                                        {evaluation.startDate} to {evaluation.endDate}
                                    </td>
                                    <td>
                                        <span className={`status-badge ${evaluation.status}`}>
                                            {evaluation.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button onClick={() => setSelectedEvaluation(evaluation)}>
                                            View Details
                                        </button>
                                        <a href={evaluation.evaluationUrl} download>
                                            Download PDF
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {selectedEvaluation && (
                    <div className="evaluation-details">
                        <h2>Evaluation Details</h2>
                        <div className="details-content">
                            <h3>Student Information</h3>
                            <p><strong>Name:</strong> {selectedEvaluation.studentName}</p>
                            <p><strong>Student ID:</strong> {selectedEvaluation.studentId}</p>

                            <h3>Company Information</h3>
                            <p><strong>Company:</strong> {selectedEvaluation.company}</p>
                            <p><strong>Supervisor:</strong> {selectedEvaluation.supervisor}</p>

                            <h3>Internship Duration</h3>
                            <p><strong>Start Date:</strong> {selectedEvaluation.startDate}</p>
                            <p><strong>End Date:</strong> {selectedEvaluation.endDate}</p>

                            <div className="evaluation-actions">
                                <button className="download-btn">
                                    Download Full Evaluation
                                </button>
                                <button className="print-btn">
                                    Print Evaluation
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EvaluationReports; 