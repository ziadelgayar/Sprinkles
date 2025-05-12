import React, { useState } from 'react';

const ScadDashboard = () => {
  const [stats, setStats] = useState({
    acceptedReports: 45,
    rejectedReports: 12,
    flaggedReports: 8,
    averageReviewTime: '2.5 days',
    topCourses: [
      { name: 'Computer Science', count: 25 },
      { name: 'Business Administration', count: 20 },
      { name: 'Engineering', count: 15 }
    ],
    topCompanies: [
      { name: 'Tech Corp', rating: 4.8, internships: 30 },
      { name: 'Global Solutions', rating: 4.7, internships: 28 },
      { name: 'Innovation Labs', rating: 4.6, internships: 25 }
    ]
  });

  return (
    <div className="scad-dashboard">
      <h1>SCAD Office Dashboard</h1>
      
      <div className="stats-overview">
        <div className="stat-card">
          <h3>Report Status</h3>
          <div className="stat-numbers">
            <div className="stat-item">
              <span className="stat-value">{stats.acceptedReports}</span>
              <span className="stat-label">Accepted</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{stats.rejectedReports}</span>
              <span className="stat-label">Rejected</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{stats.flaggedReports}</span>
              <span className="stat-label">Flagged</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <h3>Performance Metrics</h3>
          <div className="stat-numbers">
            <div className="stat-item">
              <span className="stat-value">{stats.averageReviewTime}</span>
              <span className="stat-label">Avg. Review Time</span>
            </div>
          </div>
        </div>
      </div>

      <div className="top-lists">
        <div className="list-card">
          <h3>Top Courses</h3>
          <ul>
            {stats.topCourses.map((course, index) => (
              <li key={index}>
                <span>{course.name}</span>
                <span>{course.count} internships</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="list-card">
          <h3>Top Companies</h3>
          <ul>
            {stats.topCompanies.map((company, index) => (
              <li key={index}>
                <span>{company.name}</span>
                <span>Rating: {company.rating}</span>
                <span>{company.internships} internships</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="action-buttons">
        <button onClick={() => window.location.href = '/scad/reports'}>
          View All Reports
        </button>
        <button onClick={() => window.location.href = '/scad/statistics'}>
          Detailed Statistics
        </button>
        <button onClick={() => window.location.href = '/scad/generate-reports'}>
          Generate Reports
        </button>
      </div>
    </div>
  );
};

export default ScadDashboard; 