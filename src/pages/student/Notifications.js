import React, { useState } from 'react';

const StudentNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');

  return (
    <div className="student-notifications">
      <div className="page-header">
        <h1>Notifications</h1>
        <div className="filter-tabs">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filter === 'unread' ? 'active' : ''}`}
            onClick={() => setFilter('unread')}
          >
            Unread
          </button>
        </div>
      </div>

      <div className="notifications-list">
        {notifications.length === 0 ? (
          <div className="empty-state">
            <p>No notifications</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`notification-card ${notification.read ? 'read' : 'unread'}`}
            >
              <div className="notification-icon">
                {/* Icon will be based on notification type */}
              </div>
              
              <div className="notification-content">
                <h3>{notification.title}</h3>
                <p>{notification.message}</p>
                <span className="notification-time">{notification.time}</span>
              </div>

              <div className="notification-actions">
                {!notification.read && (
                  <button className="mark-read-btn">Mark as Read</button>
                )}
                <button className="delete-btn">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="notification-settings">
        <h2>Notification Settings</h2>
        <div className="settings-form">
          <div className="setting-item">
            <label>New Internship Cycle</label>
            <input type="checkbox" />
          </div>
          <div className="setting-item">
            <label>Application Status Updates</label>
            <input type="checkbox" />
          </div>
          <div className="setting-item">
            <label>Report Status Updates</label>
            <input type="checkbox" />
          </div>
          <div className="setting-item">
            <label>Comments on Reports</label>
            <input type="checkbox" />
          </div>
          <div className="setting-item">
            <label>System Updates</label>
            <input type="checkbox" />
          </div>
        </div>
      </div>

      <div className="pagination">
        <button className="prev-btn">Previous</button>
        <span className="page-info">Page 1 of 1</span>
        <button className="next-btn">Next</button>
      </div>
    </div>
  );
};

export default StudentNotifications;
