import React, { useState } from 'react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Application Received',
      message: 'John Doe applied to your Frontend Developer internship.',
      time: '2 minutes ago',
      read: false,
      type: 'application',
    },
    {
      id: 2,
      title: 'System Update',
      message: 'Your internship listing has been approved.',
      time: '1 hour ago',
      read: true,
      type: 'system',
    },
    {
      id: 3,
      title: 'New Application Received',
      message: 'Sara Ali applied to your Marketing Intern position.',
      time: 'Today at 10:30 AM',
      read: false,
      type: 'application',
    },
  ]);

  const [filter, setFilter] = useState('all');

  // Settings states
  const [settings, setSettings] = useState({
    email: true,
    application: true,
    messages: false,
    system: true,
  });

  const handleSettingChange = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Apply read/unread filter
  let filteredNotifications = notifications.filter((notif) =>
    filter === 'unread' ? !notif.read : true
  );

  // Apply settings filters (e.g., only show allowed types)
  filteredNotifications = filteredNotifications.filter((notif) => {
    if (notif.type === 'application' && !settings.application) return false;
    if (notif.type === 'system' && !settings.system) return false;
    return true;
  });

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

        <div className="notification-settings">
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
                className={`notification-card ${notification.read ? 'read' : 'unread'}`}
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
