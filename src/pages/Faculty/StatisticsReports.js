import React, { useState, useEffect } from 'react';

const StatisticsReports = () => {
    const [statistics, setStatistics] = useState({
        reports: {
            accepted: 0,
            rejected: 0,
            flagged: 0,
            pending: 0
        },
        averageReviewTime: '0 days',
        topCourses: [],
        topCompanies: [],
        companyRatings: []
    });

    const [selectedCycle, setSelectedCycle] = useState('current');

    // Dummy data for demonstration
    useEffect(() => {
        setStatistics({
            reports: {
                accepted: 25,
                rejected: 5,
                flagged: 3,
            },
            averageReviewTime: '3.5 days',
            topCourses: [
                { name: 'Web Development', count: 15 },
                { name: 'Data Science', count: 12 },
                { name: 'UI/UX Design', count: 10 }
            ],
            topCompanies: [
                { name: 'Tech Corp', internships: 20 },
                { name: 'Design Studio', internships: 15 },
                { name: 'Data Systems', internships: 12 }
            ],
            companyRatings: [
                { name: 'Tech Corp', rating: 4.8 },
                { name: 'Design Studio', rating: 4.7 },
                { name: 'Data Systems', rating: 4.5 }
            ]
        });
    }, []);

    const generateReport = (type) => {
        const reportData = {
            statistics: {
                title: 'Statistics Report',
                data: {
                    reports: statistics.reports,
                    averageReviewTime: statistics.averageReviewTime,
                    cycle: selectedCycle
                }
            },
            courses: {
                title: 'Courses Report',
                data: {
                    topCourses: statistics.topCourses,
                    cycle: selectedCycle
                }
            },
            companies: {
                title: 'Companies Report',
                data: {
                    topCompanies: statistics.topCompanies,
                    companyRatings: statistics.companyRatings,
                    cycle: selectedCycle
                }
            }
        };

        // In a real application, this would generate and download a PDF/Excel file
        console.log(`Generating ${reportData[type].title} for ${selectedCycle} cycle:`, reportData[type].data);
        alert(`${reportData[type].title} generated successfully!`);
    };

    return (
        <div className="statistics-reports">
            <h1>Statistics Reports</h1>

            <section className="statistics-overview">
                <h2>Reports Overview</h2>
                <div className="cycle-selector">
                    <label>Select Cycle:</label>
                    <select 
                        value={selectedCycle} 
                        onChange={(e) => setSelectedCycle(e.target.value)}
                    >
                        <option value="current">Current Cycle</option>
                        <option value="previous">Previous Cycle</option>
                        <option value="all">All Time</option>
                    </select>
                </div>
                <div className="stats-grid">
                    <div className="stat-card">
                        <h3>Accepted</h3>
                        <p>{statistics.reports.accepted}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Rejected</h3>
                        <p>{statistics.reports.rejected}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Flagged</h3>
                        <p>{statistics.reports.flagged}</p>
                    </div>
                </div>
            </section>

            <section className="review-metrics">
                <h2>Review Metrics</h2>
                <p>Average Review Time: {statistics.averageReviewTime}</p>
            </section>

            <section className="top-courses">
                <h2>Most Used Courses in Internships</h2>
                <ul>
                    {statistics.topCourses.map((course, index) => (
                        <li key={index}>
                            {course.name}: {course.count} internships
                        </li>
                    ))}
                </ul>
            </section>

            <section className="company-stats">
                <h2>Company Statistics</h2>
                <div className="company-grid">
                    <div className="company-list">
                        <h3>Top Companies by Internship Count</h3>
                        <ul>
                            {statistics.topCompanies.map((company, index) => (
                                <li key={index}>
                                    {company.name}: {company.internships} internships
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="company-ratings">
                        <h3>Top Rated Companies</h3>
                        <ul>
                            {statistics.companyRatings.map((company, index) => (
                                <li key={index}>
                                    {company.name}: {company.rating}/5.0
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <section className="report-generation">
                <h2>Generate Reports</h2>
                <div className="report-buttons">
                    <button onClick={() => generateReport('statistics')}>
                        Download Statistics Report
                    </button>
                    <button onClick={() => generateReport('courses')}>
                        Download Courses Report
                    </button>
                    <button onClick={() => generateReport('companies')}>
                        Download Companies Report
                    </button>
                </div>
            </section>
        </div>
    );
};

export default StatisticsReports;

 