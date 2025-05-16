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
        <div className="main-content">
            <div className="p-6 max-w-4xl mx-auto space-y-8">
                <h1 className="text-2xl font-bold mb-4">Statistics Reports</h1>

                {/* 1. Number of accepted/rejected/flagged reports per cycle */}
                <div className="custom-box mb-6">
                    <h2 className="text-xl font-bold mb-4">Reports per Cycle</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="stat-card text-center p-4">
                            <span className="block text-gray-500 mb-1">Accepted: </span>
                            <span className="text-2xl font-bold">{statistics.reportsPerCycle.accepted}</span>
                        </div>
                        <div className="stat-card text-center p-4">
                            <span className="block text-gray-500 mb-1">Rejected: </span>
                            <span className="text-2xl font-bold">{statistics.reportsPerCycle.rejected}</span>
                        </div>
                        <div className="stat-card text-center p-4">
                            <span className="block text-gray-500 mb-1">Flagged: </span>
                            <span className="text-2xl font-bold">{statistics.reportsPerCycle.flagged}</span>
                        </div>
                    </div>
                </div>

                {/* 2. Average review time */}
                <div className="custom-box mb-6">
                    <h2 className="text-xl font-bold mb-4">Average Review Time</h2>
                    <p className="text-2xl font-bold text-center">{statistics.averageReviewTime} days</p>
                </div>

                {/* 3. Most frequently used courses in internships */}
                <div className="custom-box mb-6">
                    <h2 className="text-xl font-bold mb-4">Most Frequently Used Courses in Internships</h2>
                    <ol className="list-decimal list-inside space-y-1">
                        {statistics.mostUsedCourses.map(course => (
                            <li key={course.name}>{course.name} <span className="text-gray-500">({course.count} times)</span></li>
                        ))}
                    </ol>
                </div>

                {/* 4. Top rated companies based on student evaluations */}
                <div className="custom-box mb-6">
                    <h2 className="text-xl font-bold mb-4">Top Rated Companies</h2>
                    <ol className="list-decimal list-inside space-y-1">
                        {statistics.topRatedCompanies.map(company => (
                            <li key={company.name}>{company.name} <span className="text-gray-500">(Rating: {company.rating})</span></li>
                        ))}
                    </ol>
                </div>

                {/* 5. Top companies by internship count */}
                <div className="custom-box mb-6">
                    <h2 className="text-xl font-bold mb-4">Top Companies by Internship Count</h2>
                    <ol className="list-decimal list-inside space-y-1">
                        {statistics.topCompaniesByInternship.map(company => (
                            <li key={company.name}>{company.name} <span className="text-gray-500">({company.count} internships)</span></li>
                        ))}
                    </ol>
                </div>

                {/* Generate reports section remains as before */}
                <div className="custom-box">
                    <h2 className="text-xl font-bold mb-4">Generate Reports</h2>
                    <div className="flex flex-wrap gap-2 mb-2">
                        <button className="accept-btn">Export as PDF</button>
                        <button className="save-btn">Export as Excel</button>
                    </div>
                    <p className="text-gray-500">Generate reports based on the real-time statistics above.</p>
                </div>
            </div>
        </div>
    );
};

export default StatisticsReports; 