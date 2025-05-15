import React, { useState, useEffect } from 'react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');

  // Settings states
  const [settings, setSettings] = useState({
    report: true,
    evaluation: true,
    system: true,
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
      },
      {
        id: 3,
        title: 'System Update',
        message: 'New features have been added to the platform.',
        time: '2 days ago',
        type: 'system',
        read: false
      }
    ]);
  }, []);

  const handleSettingChange = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

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

  // Apply read/unread filter
  let filteredNotifications = notifications.filter((notif) =>
    filter === 'unread' ? !notif.read : true
  );

  // Apply settings filters (e.g., only show allowed types)
  filteredNotifications = filteredNotifications.filter((notif) => {
    if (notif.type === 'report' && !settings.report) return false;
    if (notif.type === 'evaluation' && !settings.evaluation) return false;
    if (notif.type === 'system' && !settings.system) return false;
    return true;
  });

  return (
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
            <label>Report Updates</label>
            <input
              type="checkbox"
              checked={settings.report}
              onChange={() => handleSettingChange('report')}
            />
          </div>
          <div className="setting-item">
            <label>Evaluation Updates</label>
            <input
              type="checkbox"
              checked={settings.evaluation}
              onChange={() => handleSettingChange('evaluation')}
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
  );
};

export default Notifications; 