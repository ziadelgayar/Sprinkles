import React, { useState } from 'react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Internship Cycle',
      message: 'A new internship cycle has just started. Explore available opportunities now!',
      time: '5 minutes ago',
      read: false,
      type: 'cycle',
    },
    {
      id: 2,
      title: 'Internship Report Status',
      message: 'Your internship report status has been set to "Under Review".',
      time: '1 hour ago',
      read: true,
      type: 'report',
    },
    {
      id: 3,
      title: 'Report Comment',
      message: 'Your report was flagged for missing company signature. Please review the comments.',
      time: 'Today at 9:15 AM',
      read: false,
      type: 'comment',
    },
    {
      id: 4,
      title: 'Appeal Submitted',
      message: 'Your appeal message has been submitted and will be reviewed soon.',
      time: 'Yesterday',
      read: true,
      type: 'appeal',
    },
  ]);

  const [filter, setFilter] = useState('all');

  const [settings, setSettings] = useState({
    cycle: true,
    report: true,
    comment: true,
    appeal: true,
  });

  const handleSettingChange = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Filter based on unread toggle
  let filteredNotifications = notifications.filter((notif) =>
    filter === 'unread' ? !notif.read : true
  );

  // Filter based on settings
  filteredNotifications = filteredNotifications.filter((notif) => settings[notif.type]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

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
                    <button className="mark-read-btn" onClick={() => markAsRead(notification.id)}>
                      Mark as Read
                    </button>
                  )}
                  <button className="delete-btn" onClick={() => deleteNotification(notification.id)}>
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
