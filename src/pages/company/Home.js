import React, { useState } from 'react';

const CompanyHome = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="company-home">
      <div className="search-section">
        <h1>Find the Perfect Intern</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for internships..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-btn">Search</button>
        </div>
        <div className="quick-filters">
          <button>All Categories</button>
          <button>Location</button>
          <button>Duration</button>
          <button>Type</button>
        </div>
      </div>

      <div className="featured-section">
        <h2>Featured Internships</h2>
        <div className="featured-listings">
          {/* Featured internships will be mapped here */}
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <button className="post-slot-btn">Post New Internship</button>
          <button className="view-applications-btn">View Applications</button>
          <button className="manage-interns-btn">Manage Current Interns</button>
        </div>
      </div>

      <div className="stats-dashboard">
        <div className="stat-card">
          <h3>Active Listings</h3>
          <p>0</p>
        </div>
        <div className="stat-card">
          <h3>Pending Applications</h3>
          <p>0</p>
        </div>
        <div className="stat-card">
          <h3>Current Interns</h3>
          <p>0</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyHome;
