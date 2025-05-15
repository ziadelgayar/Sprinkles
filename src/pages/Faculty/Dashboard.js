import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
    const [notifications, setNotifications] = useState([]);
    const [statistics, setStatistics] = useState({
        cycle1: {
            accepted: 0,
            rejected: 0,
            flagged: 0
        },
        cycle2: {
            accepted: 0,
            rejected: 0,
            flagged: 0
        },
        averageReviewTime: 0,
        mostUsedCourses: [],
        topRatedCompanies: [],
        topCompaniesByInternship: []
    });
    const [isLoading, setIsLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState(null);

    // Simulate real-time data updates
    useEffect(() => {
        const fetchData = () => {
            setIsLoading(true);
            // In a real application, this would be an API call
            setTimeout(() => {
                setStatistics({
                    cycle1: {
                        accepted: 120,
                        rejected: 20,
                        flagged: 10
                    },
                    cycle2: {
                        accepted: 150,
                        rejected: 15,
                        flagged: 8
                    },
                    averageReviewTime: 3.2,
                    mostUsedCourses: [
                        { name: 'CS101 - Intro to Programming', count: 40 },
                        { name: 'DS201 - Data Analysis', count: 32 },
                        { name: 'UX301 - User Research', count: 28 }
                    ],
                    topRatedCompanies: [
                        { name: 'Tech Corp', rating: 4.9, evaluations: 25 },
                        { name: 'Data Systems', rating: 4.7, evaluations: 20 },
                        { name: 'Design Studio', rating: 4.6, evaluations: 18 }
                    ],
                    topCompaniesByInternship: [
                        { name: 'Tech Corp', count: 25, active: 15 },
                        { name: 'Data Systems', count: 20, active: 12 },
                        { name: 'Design Studio', count: 18, active: 10 }
                    ]
                });
                setLastUpdated(new Date());
                setIsLoading(false);
            }, 1000);
        };

        fetchData();
        // Update data every 5 minutes
        const interval = setInterval(fetchData, 5 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    // Dummy notifications data
    useEffect(() => {
        setNotifications([
            {
                id: 1,
                title: 'New Report Submitted',
                message: 'A new internship report has been submitted for review.',
                time: '2 hours ago',
                type: 'report',
                read: false
            },
            {
                id: 2,
                title: 'Evaluation Reminder',
                message: 'You have pending evaluations to complete.',
                time: '1 day ago',
                type: 'evaluation',
                read: true
            }
        ]);
    }, []);

    const handleMarkAsRead = (notificationId) => {
        setNotifications(prev =>
            prev.map(notification =>
                notification.id === notificationId
                    ? { ...notification, read: true }
                    : notification
            )
        );
    };

    const cycle1Data = {
        labels: ['Accepted', 'Rejected', 'Flagged'],
        datasets: [
            {
                label: 'Cycle 1 Reports',
                data: [
                    statistics.cycle1.accepted,
                    statistics.cycle1.rejected,
                    statistics.cycle1.flagged
                ],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(255, 206, 86, 0.6)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }
        ]
    };

    const cycle2Data = {
        labels: ['Accepted', 'Rejected', 'Flagged'],
        datasets: [
            {
                label: 'Cycle 2 Reports',
                data: [
                    statistics.cycle2.accepted,
                    statistics.cycle2.rejected,
                    statistics.cycle2.flagged
                ],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(255, 206, 86, 0.6)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Reports Status Distribution'
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of Reports'
                }
            }
        }
    };

    const handleExportPDF = () => {
        window.print();
    };

    const handleExportExcel = () => {
        // Create CSV content
        const csvContent = [
            ['Statistics Report', ''],
            ['Generated on', new Date().toLocaleString()],
            [''],
            ['Cycle 1 Reports'],
            ['Status', 'Count'],
            ['Accepted', statistics.cycle1.accepted],
            ['Rejected', statistics.cycle1.rejected],
            ['Flagged', statistics.cycle1.flagged],
            [''],
            ['Cycle 2 Reports'],
            ['Status', 'Count'],
            ['Accepted', statistics.cycle2.accepted],
            ['Rejected', statistics.cycle2.rejected],
            ['Flagged', statistics.cycle2.flagged],
            [''],
            ['Average Review Time', `${statistics.averageReviewTime} days`],
            [''],
            ['Most Used Courses'],
            ['Course', 'Count'],
            ...statistics.mostUsedCourses.map(course => [course.name, course.count]),
            [''],
            ['Top Rated Companies'],
            ['Company', 'Rating', 'Evaluations'],
            ...statistics.topRatedCompanies.map(company => [company.name, company.rating, company.evaluations]),
            [''],
            ['Top Companies by Internship Count'],
            ['Company', 'Total Internships', 'Active Internships'],
            ...statistics.topCompaniesByInternship.map(company => [company.name, company.count, company.active])
        ].map(row => row.join(',')).join('\n');

        // Create and download file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `statistics_report_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="faculty-dashboard">
            <div className="dashboard-header">
            <h1>Faculty Dashboard</h1>
                {lastUpdated && (
                    <p className="last-updated">
                        Last updated: {lastUpdated.toLocaleTimeString()}
                    </p>
                )}
            </div>
            
            <section className="notifications-section">
                <h2>Recent Notifications</h2>
                <div className="notifications-list">
                    {notifications.slice(0, 3).map(notification => (
                        <div
                            key={notification.id}
                            className={`notification-card ${notification.read ? 'read' : 'unread'}`}
                        >
                            <div className="notification-content">
                                <h3>{notification.title}</h3>
                                <p>{notification.message}</p>
                                <span className="notification-time">{notification.time}</span>
                            </div>
                            {!notification.read && (
                                <button
                                    className="mark-read-btn"
                                    onClick={() => handleMarkAsRead(notification.id)}
                                >
                                    Mark as Read
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            <section className="statistics-section">
                <h2>Statistics</h2>
                
                {isLoading ? (
                    <div className="loading">Loading statistics...</div>
                ) : (
                    <>
                        <div className="charts-container">
                            <div className="chart">
                                <h3>Cycle 1 Reports</h3>
                                <Bar data={cycle1Data} options={chartOptions} />
                            </div>
                            <div className="chart">
                                <h3>Cycle 2 Reports</h3>
                                <Bar data={cycle2Data} options={chartOptions} />
                            </div>
                        </div>

                        <div className="statistics-details">
                            <div className="stat-card">
                                <h3>Average Review Time</h3>
                                <p>{statistics.averageReviewTime} days</p>
                            </div>

                            <div className="stat-card">
                                <h3>Most Used Courses</h3>
                                <ol>
                                    {statistics.mostUsedCourses.map(course => (
                                        <li key={course.name}>
                                            {course.name} ({course.count} times)
                                        </li>
                                    ))}
                                </ol>
                            </div>

                            <div className="stat-card">
                                <h3>Top Rated Companies Based on Student Evaluations</h3>
                                <ol>
                                    {statistics.topRatedCompanies.map(company => (
                                        <li key={company.name}>
                                            {company.name} (Rating: {company.rating}, {company.evaluations} evaluations)
                                        </li>
                                    ))}
                                </ol>
                            </div>

                            <div className="stat-card">
                                <h3>Top Companies by Internship Count</h3>
                                <ol>
                                    {statistics.topCompaniesByInternship.map(company => (
                                        <li key={company.name}>
                                            {company.name} ({company.count} total, {company.active} active)
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>

                        <div className="export-section">
                            <h3>Export Reports</h3>
                            <div className="export-buttons">
                                <button onClick={handleExportPDF}>Export as PDF</button>
                                <button onClick={handleExportExcel}>Export as Excel (CSV)</button>
                            </div>
                            <p>Generate reports based on the real-time statistics above.</p>
                </div>
                    </>
                )}
            </section>
        </div>
    );
};

export default Dashboard; 