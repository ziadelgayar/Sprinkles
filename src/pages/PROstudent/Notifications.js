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
          <button 
            className={`filter-btn ${filter === 'appointments' ? 'active' : ''}`}
            onClick={() => setFilter('appointments')}
          >
            Appointments
          </button>
          <button 
            className={`filter-btn ${filter === 'calls' ? 'active' : ''}`}
            onClick={() => setFilter('calls')}
          >
            Calls
          </button>
          <button 
            className={`filter-btn ${filter === 'workshops' ? 'active' : ''}`}
            onClick={() => setFilter('workshops')}
          >
            Workshops
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
                {notification.type === 'appointment' && (
                  <div className="appointment-actions">
                    <button className="accept-btn">Accept</button>
                    <button className="reject-btn">Reject</button>
                  </div>
                )}
                {notification.type === 'call' && (
                  <div className="call-actions">
                    <button className="accept-call-btn">Accept Call</button>
                    <button className="reject-call-btn">Reject Call</button>
                  </div>
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
            <label>Appointment Notifications</label>
            <input type="checkbox" />
          </div>
          <div className="setting-item">
            <label>Call Notifications</label>
            <input type="checkbox" />
          </div>
          <div className="setting-item">
            <label>Workshop Notifications</label>
            <input type="checkbox" />
          </div>
          <div className="setting-item">
            <label>Workshop Chat Messages</label>
            <input type="checkbox" />
          </div>
          <div className="setting-item">
            <label>Assessment Results</label>
            <input type="checkbox" />
          </div>
          <div className="setting-item">
            <label>Profile Views</label>
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
