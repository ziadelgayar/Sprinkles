// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css'; 
import { useLocation } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

const menus = {
  company: [
    { path: '/company/home', label: 'Home' },
    { path: '/company/internships', label: 'Internship Posts' },
    { path: '/company/applications', label: 'Applications' },
    { path: '/company/interns', label: 'Interns' },
    { path: '/company/evaluations', label: 'Evaluations' },
    { path: '/company/documents', label: 'Documents & Reports' },
    { path: '/company/profile', label: 'Profile & Settings' },
    { path: '/company/notifications', label: 'Notifications' },
  ],
  student: [
    { path: '/student/home', label: 'Home' },
    { path: '/student/internships', label: 'Browse Internships' },
    { path: '/student/applications', label: 'My Applications' },
    { path: '/student/profile', label: 'Profile & Settings' },
    { path: '/student/notifications', label: 'Notifications' },
    { path: '/student/documents', label: 'Documents' },
    { path: '/student/evaluations', label: 'My Evaluations' },
  ],
  PROstudent: [
    { path: '/PROstudent/home', label: 'Home' },
    { path: '/PROstudent/internships', label: 'Browse Internships' },
    { path: '/PROstudent/applications', label: 'My Applications' },
    { path: '/PROstudent/profile', label: 'Profile & Settings' },
    { path: '/PROstudent/notifications', label: 'Notifications' },
    { path: '/PROstudent/documents', label: 'Documents' },
    { path: '/PROstudent/evaluations', label: 'My Evaluations' },
    { path: '/PROstudent/workshops', label: 'Career Workshops' },
    { path: '/PROstudent/videocall', label: 'Video Call' },
  ],
  scad: [
    { path: '/scad/home', label: 'Home' },
    { path: '/scad/companies', label: 'Manage Companies' },
    { path: '/scad/internships', label: 'Manage Internships' },
    { path: '/scad/students', label: 'Manage Students' },
    { path: '/scad/reports', label: 'Reports' },
    { path: '/scad/profile-settings', label: 'Profile & Settings' },
    { path: '/scad/notifications', label: 'Notifications' },
    { path: '/scad/statistics', label: 'Statistics' },
  ],
  faculty: [
    { path: '/faculty/home', label: 'Home' },
    { path: '/faculty/internship-reports', label: 'Internship Reports' },
    { path: '/faculty/evaluation-reports', label: 'Evaluation Reports' },
    { path: '/faculty/statistics-reports', label: 'Statistics Reports' },
    { path: '/faculty/profile', label: 'Profile & Settings' },
    { path: '/faculty/notifications', label: 'Notifications' },
  ]
};


const Sidebar = ({ role }) => {
  const menu = menus[role];
  const location = useLocation();

  if (!menu) return null;

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <span>{role?.toUpperCase()}</span>
      </div>
      <div className="sidebar-menu">
        {menu.map(item => (
          <div
            key={item.path}
            className={`sidebar-menu-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <Link to={item.path}>{item.label}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;