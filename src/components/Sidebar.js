// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

const menus = {
  company: [
    { path: '/company/Home', label: 'Home' },
    { path: '/company/Internships', label: 'Internship Posts' },
    { path: '/company/Applications', label: 'Applications' },
    { path: '/company/Interns', label: 'Interns' },
    { path: '/company/Evaluations', label: 'Evaluations' },
    { path: '/company/DocumentsReports', label: 'Documents & Reports' },
    { path: '/company/Profile', label: 'Profile & Settings' },
    { path: '/company/Notifications', label: 'Notifications' },
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
  ],
  scad: [
    { path: '/scad/home', label: 'Home' },
    { path: '/scad/companies', label: 'Manage Companies' },
    { path: '/scad/internships', label: 'Manage Internships' },
    { path: '/scad/students', label: 'Manage Students' },
    { path: '/scad/reports', label: 'Reports' },
    { path: '/scad/profile-settings', label: 'Profile & Settings' },
    { path: '/scad/notifications', label: 'Notifications' },
  ],
  faculty: [
    { path: '/faculty/home', label: 'Home' },
    { path: '/faculty/monitor-internships', label: 'Monitor Internships' },
    { path: '/faculty/reports', label: 'Reports' },
    { path: '/faculty/profile-settings', label: 'Profile & Settings' },
    { path: '/faculty/notifications', label: 'Notifications' },
  ]
}; 
const Sidebar = ({ role }) => {
    const menu = menus[role];
  
    if (!menu) return null; 
  
    return (
      <nav className="sidebar">
        <ul>
          {menu.map(item =>
            <li key={item.path}>
              <Link to={item.path}>{item.label}</Link>
            </li>
          )}
        </ul>
      </nav>
    );
  };
  
  export default Sidebar;