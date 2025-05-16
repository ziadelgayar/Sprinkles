import React, { useState, useEffect } from 'react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [settings, setSettings] = useState({
    email: true,
    application: true,
    messages: true,
    system: true
  });

  // Dummy data for demonstration
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

  const handleDelete = (notificationId) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== notificationId)
    );
  };

  const handleSettingChange = (setting) => {
    setSettings(prev => ({ ...prev, [setting]: !prev[setting] }));
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return true;
  });

  return (
    <div className="main-content">
      <div className="notifications-page">
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
        <div className="custom-box notification-settings">
          <h2>Notification Settings</h2>
          <div className="settings-form">
            <div className="setting-item">
              <label>Email Notifications</label>
              <input
                type="checkbox"
                checked={settings.email}
                onChange={() => handleSettingChange('email')}
              />
            </div>
            <div className="setting-item">
              <label>Application Updates</label>
              <input
                type="checkbox"
                checked={settings.application}
                onChange={() => handleSettingChange('application')}
              />
            </div>
            <div className="setting-item">
              <label>New Messages</label>
              <input
                type="checkbox"
                checked={settings.messages}
                onChange={() => handleSettingChange('messages')}
              />
            </div>
            <div className="setting-item">
              <label>System Updates</label>
              <input
                type="checkbox"
                checked={settings.system}
                onChange={() => handleSettingChange('system')}
              />
            </div>
          </div>
        </div>
        <div className="notifications-list">
          {filteredNotifications.length === 0 ? (
            <div className="empty-state">
              <p>No notifications</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`custom-box notification-card ${notification.read ? 'read' : 'unread'}`}
                style={!notification.read ? { borderLeft: '4px solid #4fd1c5' } : {}}
              >
                <div className="notification-icon">📩</div>
                <div className="notification-content">
                  <h3>{notification.title}</h3>
                  <p>{notification.message}</p>
                  <span className="notification-time">{notification.time}</span>
                </div>
                <div className="notification-actions">
                  {!notification.read && (
                    <button className="mark-read-btn" onClick={() => handleMarkAsRead(notification.id)}>
                      Mark as Read
                    </button>
                  )}
                  <button className="delete-btn" onClick={() => handleDelete(notification.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications; 