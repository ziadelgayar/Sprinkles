import React, { useState, useEffect } from 'react';

const StatisticsReports = () => {
    const [statistics, setStatistics] = useState({
        totalInternships: 0,
        activeInternships: 0,
        completedInternships: 0,
        pendingEvaluations: 0,
        departmentStats: []
    });

    // Dummy data for demonstration
    useEffect(() => {
        setStatistics({
            totalInternships: 150,
            activeInternships: 75,
            completedInternships: 65,
            pendingEvaluations: 10,
            departmentStats: [
                {
                    department: 'Computer Science',
                    totalStudents: 45,
                    activeInternships: 25,
                    completedInternships: 20
                },
                {
                    department: 'Data Science',
                    totalStudents: 30,
                    activeInternships: 15,
                    completedInternships: 15
                },
                {
                    department: 'UI/UX Design',
                    totalStudents: 25,
                    activeInternships: 10,
                    completedInternships: 15
                }
            ]
        });
    }, []);

    return (
        <div className="statistics-reports">
            <h1>Statistics Reports</h1>

            <div className="overview-cards">
                <div className="stat-card">
                    <h3>Total Internships</h3>
                    <p className="stat-number">{statistics.totalInternships}</p>
                </div>
                <div className="stat-card">
                    <h3>Active Internships</h3>
                    <p className="stat-number">{statistics.activeInternships}</p>
                </div>
                <div className="stat-card">
                    <h3>Completed Internships</h3>
                    <p className="stat-number">{statistics.completedInternships}</p>
                </div>
                <div className="stat-card">
                    <h3>Pending Evaluations</h3>
                    <p className="stat-number">{statistics.pendingEvaluations}</p>
                </div>
            </div>

            <div className="department-stats">
                <h2>Department Statistics</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Department</th>
                            <th>Total Students</th>
                            <th>Active Internships</th>
                            <th>Completed Internships</th>
                        </tr>
                    </thead>
                    <tbody>
                        {statistics.departmentStats.map(dept => (
                            <tr key={dept.department}>
                                <td>{dept.department}</td>
                                <td>{dept.totalStudents}</td>
                                <td>{dept.activeInternships}</td>
                                <td>{dept.completedInternships}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="export-section">
                <h2>Export Reports</h2>
                <div className="export-buttons">
                    <button>Export as PDF</button>
                    <button>Export as Excel</button>
                </div>
            </div>
        </div>
    );
};

export default StatisticsReports; 