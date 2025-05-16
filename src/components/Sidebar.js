// src/components/Sidebar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

const getHomePath = (role) => {
  switch (role) {
    case 'company': return '/company/home';
    case 'student': return '/student/home';
    case 'PROstudent': return '/PROstudent/home';
    case 'faculty': return '/faculty/home';
    case 'scad': return '/scad/home';
    default: return '/';
  }
};

const Sidebar = ({ role }) => {
  const menu = menus[role];
  const location = useLocation();
  const navigate = useNavigate();

  const handleBack = () => {
    const currentPath = location.pathname;
    const homePath = getHomePath(role);
    
    if (currentPath === homePath) {
      // If at home, go to login
      navigate('/login');
    } else if (currentPath === '/login') {
      // If at login, go to landing page
      navigate('/');
    } else {
      // Otherwise, go to home
      navigate(homePath);
    }
  };

  if (!menu) return null;

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <span>{role?.toUpperCase()}</span>
      </div>
      <div className="sidebar-menu">
        <div 
          className="sidebar-menu-item"
          onClick={handleBack}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </div>
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