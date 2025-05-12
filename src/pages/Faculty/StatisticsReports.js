import React, { useState, useEffect } from 'react';

const StatisticsReports = () => {
    const [statistics, setStatistics] = useState({
        reportsPerCycle: {
            accepted: 0,
            rejected: 0,
            flagged: 0
        },
        averageReviewTime: 0,
        mostUsedCourses: [],
        topRatedCompanies: [],
        topCompaniesByInternship: []
    });

    // Dummy data for demonstration
    useEffect(() => {
        setStatistics({
            reportsPerCycle: {
                accepted: 120,
                rejected: 20,
                flagged: 10
            },
            averageReviewTime: 3.2, // days
            mostUsedCourses: [
                { name: 'CS101 - Intro to Programming', count: 40 },
                { name: 'DS201 - Data Analysis', count: 32 },
                { name: 'UX301 - User Research', count: 28 }
            ],
            topRatedCompanies: [
                { name: 'Tech Corp', rating: 4.9 },
                { name: 'Data Systems', rating: 4.7 },
                { name: 'Design Studio', rating: 4.6 }
            ],
            topCompaniesByInternship: [
                { name: 'Tech Corp', count: 25 },
                { name: 'Data Systems', count: 20 },
                { name: 'Design Studio', count: 18 }
            ]
        });
    }, []);

    return (
        <div className="statistics-reports">
            <h1>Statistics Reports</h1>

            {/* 1. Number of accepted/rejected/flagged reports per cycle */}
            <section>
                <h2>Number of accepted/rejected/flagged reports per cycle</h2>
                <ul>
                    <li>Accepted: {statistics.reportsPerCycle.accepted}</li>
                    <li>Rejected: {statistics.reportsPerCycle.rejected}</li>
                    <li>Flagged: {statistics.reportsPerCycle.flagged}</li>
                </ul>
            </section>

            {/* 2. Average review time */}
            <section>
                <h2>Average review time</h2>
                <p>{statistics.averageReviewTime} days</p>
            </section>

            {/* 3. Most frequently used courses in internships */}
            <section>
                <h2>Most frequently used courses in internships</h2>
                <ol>
                    {statistics.mostUsedCourses.map(course => (
                        <li key={course.name}>{course.name} ({course.count} times)</li>
                    ))}
                </ol>
            </section>

            {/* 4. Top rated companies based on student evaluations */}
            <section>
                <h2>Top rated companies based on student evaluations</h2>
                <ol>
                    {statistics.topRatedCompanies.map(company => (
                        <li key={company.name}>{company.name} (Rating: {company.rating})</li>
                    ))}
                </ol>
            </section>

            {/* 5. Top companies by internship count */}
            <section>
                <h2>Top companies by internship count</h2>
                <ol>
                    {statistics.topCompaniesByInternship.map(company => (
                        <li key={company.name}>{company.name} ({company.count} internships)</li>
                    ))}
                </ol>
            </section>

            {/* Generate reports section remains as before */}
            <div className="export-section">
                <h2>Generate Reports</h2>
                <div className="export-buttons">
                    <button>Export as PDF</button>
                    <button>Export as Excel</button>
                </div>
                <p>Generate reports based on the real-time statistics above.</p>
            </div>
        </div>
    );
};

export default StatisticsReports; 