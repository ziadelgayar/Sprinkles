import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend
);

const Dashboard = () => {
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

    useEffect(() => {
        setStatistics({
            reportsPerCycle: {
                accepted: 120,
                rejected: 20,
                flagged: 10
            },
            averageReviewTime: 3.2,
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

    const reportsBarData = {
        labels: ['Accepted ', 'Rejected ', 'Flagged '],
        datasets: [{
            label: 'Reports per Cycle',
            data: [
                statistics.reportsPerCycle.accepted,
                statistics.reportsPerCycle.rejected,
                statistics.reportsPerCycle.flagged
            ],
            backgroundColor: ['#4caf50', '#f44336', '#ff9800']
        }]
    };

    const coursePieData = {
        labels: statistics.mostUsedCourses.map(c => c.name),
        datasets: [{
            data: statistics.mostUsedCourses.map(c => c.count),
            backgroundColor: ['#3f51b5', '#2196f3', '#00bcd4']
        }]
    };

    return (
        <div className="main-content">
            <div className="p-6 max-w-4xl mx-auto space-y-8">
                <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

                {/* Summary Section */}
                <div className="custom-box mb-6">
                    <h2 className="text-xl font-bold mb-4">Report Summary Overview</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
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
                        <div className="stat-card text-center p-4">
                            <span className="block text-gray-500 mb-1">Avg. Review Time: </span>
                            <span className="text-2xl font-bold">{statistics.averageReviewTime} days</span>
                        </div>
                    </div>
                </div>

                {/* Chart Section */}
                <div className="custom-box mb-6">
                    <h2 className="text-xl font-bold mb-4">Reports Overview</h2>
                    <Bar data={reportsBarData} />
                </div>

                <div className="custom-box mb-6">
                    <h2 className="text-xl font-bold mb-4">Most Used Courses in Internships</h2>
                    <div style={{ width: 250, height: 250, margin: '0 auto' }}>
                        <Pie
                            data={coursePieData}
                            options={{
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: { position: 'bottom' }
                                }
                            }}
                        />
                    </div>
                </div>

                {/* Detailed Lists */}
                <div className="custom-box mb-6">
                    <h2 className="text-xl font-bold mb-4">Top Rated Companies</h2>
                    <ol className="list-decimal list-inside space-y-1">
                        {statistics.topRatedCompanies.map(company => (
                            <li key={company.name}>
                                {company.name} <span className="text-gray-500">(Rating: {company.rating})</span>
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="custom-box mb-6">
                    <h2 className="text-xl font-bold mb-4">Top Companies by Internship Count</h2>
                    <ol className="list-decimal list-inside space-y-1">
                        {statistics.topCompaniesByInternship.map(company => (
                            <li key={company.name}>
                                {company.name} <span className="text-gray-500">({company.count} internships)</span>
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="custom-box">
                    <h2 className="text-xl font-bold mb-4">Generate Reports</h2>
                    <div className="flex flex-wrap gap-2">
                        <button className="accept-btn">Export as PDF</button>
                        <button className="save-btn">Export as Excel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 