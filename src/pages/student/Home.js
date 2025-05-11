import React, { useState } from 'react';

const StudentHome = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    industry: '',
    duration: '',
    type: ''
  });

  return (
    <div className="student-home">
      <div className="search-section">
        <h1>Find Your Perfect Internship</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search internships by title or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-btn">Search</button>
        </div>
        <div className="quick-filters">
          <select 
            value={filters.industry}
            onChange={(e) => setFilters({...filters, industry: e.target.value})}
          >
            <option value="">All Industries</option>
            <option value="tech">Technology</option>
            <option value="design">Design</option>
            <option value="business">Business</option>
            <option value="legal">Legal</option>
            <option value="pharmaceutical">Pharmaceutical</option>

          </select>
          <select 
            value={filters.duration}
            onChange={(e) => setFilters({...filters, duration: e.target.value})}
          >
            <option value="">All Durations</option>
            <option value="3 months">3 months</option>
            <option value="6 months">6 months</option>
            <option value="12 months+">12 months+</option>
          </select>
          <select 
            value={filters.type}
            onChange={(e) => setFilters({...filters, type: e.target.value})}
          >
            <option value="">All Types</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>
      </div>

      <div className="suggested-companies">
        <h2>Suggested Companies</h2>
        <div className="companies-list">
          {/* Suggested companies will be mapped here */}
        </div>
      </div>

      <div className="featured-internships">
        <h2>Featured Internships</h2>
        <div className="internships-list">
          {/* Featured internships will be mapped here */}
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <button className="view-applications-btn">View My Applications</button>
          <button className="view-internships-btn">View My Internships</button>
          <button className="update-profile-btn">Update Profile</button>
        </div>
      </div>

      <div className="stats-dashboard">
        <div className="stat-card">
          <h3>Active Applications</h3>
          <p>0</p>
        </div>
        <div className="stat-card">
          <h3>Current Internships</h3>
          <p>0</p>
        </div>
        <div className="stat-card">
          <h3>Completed Internships</h3>
          <p>0</p>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
