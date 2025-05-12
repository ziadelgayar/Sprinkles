import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [notifications, setNotifications] = useState([]);

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

    return (
        <div className="faculty-dashboard">
            <h1>Faculty Dashboard</h1>
            
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

            <section className="quick-actions">
                <h2>Quick Actions</h2>
                <div className="action-buttons">
                    <Link to="/faculty/StatisticsReports" className="action-button">
                        View Statistics Reports
                    </Link>
                    <Link to="/faculty/InternshipReports" className="action-button">
                        Review Internship Reports
                    </Link>
                    <Link to="/faculty/EvaluationReports" className="action-button">
                        View Evaluation Reports
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Dashboard; 