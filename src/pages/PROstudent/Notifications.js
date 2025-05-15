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
      read: false,
      type: 'report',
    },
    {
      id: 3,
      title: 'Appointment Accepted',
      message: 'Your appointment with SCAD Officer has been accepted for tomorrow at 2:00 PM.',
      time: 'Today at 9:15 AM',
      read: false,
      type: 'appointment',
    },
    {
      id: 4,
      title: 'Upcoming Workshop',
      message: 'Reminder: "Resume Building Workshop" is scheduled for tomorrow at 3:00 PM.',
      time: 'Yesterday',
      read: false,
      type: 'workshop',
    },
    {
      id: 5,
      title: 'Incoming Call',
      message: 'You have an incoming call from SCAD Officer.',
      time: 'Just now',
      read: false,
      type: 'call',
    },
    {
      id: 6,
      title: 'Workshop Message',
      message: 'New message in "Resume Building Workshop": "Great presentation!"',
      time: '2 minutes ago',
      read: false,
      type: 'workshop_message',
    }
  ]);

  const [filter, setFilter] = useState('all');

  const [settings, setSettings] = useState({
    cycle: true,
    report: true,
    appointment: true,
    workshop: true,
    call: true,
    workshop_message: true
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
            <label>Internship Cycles</label>
            <input
              type="checkbox"
              checked={settings.cycle}
              onChange={() => handleSettingChange('cycle')}
            />
          </div>
          <div className="setting-item">
            <label>Report Status Updates</label>
            <input
              type="checkbox"
              checked={settings.report}
              onChange={() => handleSettingChange('report')}
            />
          </div>
          <div className="setting-item">
            <label>Appointment Updates</label>
            <input
              type="checkbox"
              checked={settings.appointment}
              onChange={() => handleSettingChange('appointment')}
            />
          </div>
          <div className="setting-item">
            <label>Workshop Updates</label>
            <input
              type="checkbox"
              checked={settings.workshop}
              onChange={() => handleSettingChange('workshop')}
            />
          </div>
          <div className="setting-item">
            <label>Call Notifications</label>
            <input
              type="checkbox"
              checked={settings.call}
              onChange={() => handleSettingChange('call')}
            />
          </div>
          <div className="setting-item">
            <label>Workshop Messages</label>
            <input
              type="checkbox"
              checked={settings.workshop_message}
              onChange={() => handleSettingChange('workshop_message')}
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
  );
};

export default Notifications;
