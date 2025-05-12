import React, { useState } from 'react';

const Statistics = () => {
  const [timeRange, setTimeRange] = useState('current');
  const [stats, setStats] = useState({
    reportStatus: {
      accepted: 45,
      rejected: 12,
      flagged: 8,
      pending: 15
    },
    reviewMetrics: {
      averageReviewTime: '2.5 days',
      fastestReview: '1 day',
      slowestReview: '5 days',
      totalReviews: 80
    },
    courseDistribution: [
      { name: 'Computer Science', count: 25, percentage: 31.25 },
      { name: 'Business Administration', count: 20, percentage: 25 },
      { name: 'Engineering', count: 15, percentage: 18.75 },
      { name: 'Design', count: 10, percentage: 12.5 },
      { name: 'Other', count: 10, percentage: 12.5 }
    ],
    companyPerformance: [
      {
        name: 'Tech Corp',
        rating: 4.8,
        internships: 30,
        acceptanceRate: 95
      },
      {
        name: 'Global Solutions',
        rating: 4.7,
        internships: 28,
        acceptanceRate: 92
      },
      {
        name: 'Innovation Labs',
        rating: 4.6,
        internships: 25,
        acceptanceRate: 90
      }
    ],
    monthlyTrends: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      accepted: [5, 8, 12, 15, 10, 7],
      rejected: [2, 3, 4, 5, 3, 2],
      flagged: [1, 2, 3, 4, 2, 1]
    }
  });

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    // In a real application, this would fetch new data based on the time range
  };

  return (
    <div className="statistics-page">
      <h1>Detailed Statistics</h1>

      <div className="time-range-selector">
        <button 
          className={timeRange === 'current' ? 'active' : ''}
          onClick={() => handleTimeRangeChange('current')}
        >
          Current Cycle
        </button>
        <button 
          className={timeRange === 'previous' ? 'active' : ''}
          onClick={() => handleTimeRangeChange('previous')}
        >
          Previous Cycle
        </button>
        <button 
          className={timeRange === 'all' ? 'active' : ''}
          onClick={() => handleTimeRangeChange('all')}
        >
          All Time
        </button>
      </div>

      <div className="stats-grid">
        <section className="stat-card report-status">
          <h2>Report Status Distribution</h2>
          <div className="status-bars">
            <div className="status-bar">
              <span>Accepted</span>
              <div className="bar">
                <div 
                  className="fill accepted"
                  style={{ width: `${(stats.reportStatus.accepted / 80) * 100}%` }}
                />
              </div>
              <span>{stats.reportStatus.accepted}</span>
            </div>
            <div className="status-bar">
              <span>Rejected</span>
              <div className="bar">
                <div 
                  className="fill rejected"
                  style={{ width: `${(stats.reportStatus.rejected / 80) * 100}%` }}
                />
              </div>
              <span>{stats.reportStatus.rejected}</span>
            </div>
            <div className="status-bar">
              <span>Flagged</span>
              <div className="bar">
                <div 
                  className="fill flagged"
                  style={{ width: `${(stats.reportStatus.flagged / 80) * 100}%` }}
                />
              </div>
              <span>{stats.reportStatus.flagged}</span>
            </div>
            <div className="status-bar">
              <span>Pending</span>
              <div className="bar">
                <div 
                  className="fill pending"
                  style={{ width: `${(stats.reportStatus.pending / 80) * 100}%` }}
                />
              </div>
              <span>{stats.reportStatus.pending}</span>
            </div>
          </div>
        </section>

        <section className="stat-card review-metrics">
          <h2>Review Performance</h2>
          <div className="metrics-grid">
            <div className="metric">
              <span className="label">Average Review Time</span>
              <span className="value">{stats.reviewMetrics.averageReviewTime}</span>
            </div>
            <div className="metric">
              <span className="label">Fastest Review</span>
              <span className="value">{stats.reviewMetrics.fastestReview}</span>
            </div>
            <div className="metric">
              <span className="label">Slowest Review</span>
              <span className="value">{stats.reviewMetrics.slowestReview}</span>
            </div>
            <div className="metric">
              <span className="label">Total Reviews</span>
              <span className="value">{stats.reviewMetrics.totalReviews}</span>
            </div>
          </div>
        </section>

        <section className="stat-card course-distribution">
          <h2>Course Distribution</h2>
          <div className="distribution-list">
            {stats.courseDistribution.map((course, index) => (
              <div key={index} className="distribution-item">
                <span className="course-name">{course.name}</span>
                <div className="distribution-bar">
                  <div 
                    className="fill"
                    style={{ width: `${course.percentage}%` }}
                  />
                </div>
                <span className="percentage">{course.percentage}%</span>
                <span className="count">({course.count})</span>
              </div>
            ))}
          </div>
        </section>

        <section className="stat-card company-performance">
          <h2>Top Performing Companies</h2>
          <div className="company-list">
            {stats.companyPerformance.map((company, index) => (
              <div key={index} className="company-item">
                <div className="company-header">
                  <h3>{company.name}</h3>
                  <span className="rating">Rating: {company.rating}/5</span>
                </div>
                <div className="company-metrics">
                  <div className="metric">
                    <span className="label">Internships</span>
                    <span className="value">{company.internships}</span>
                  </div>
                  <div className="metric">
                    <span className="label">Acceptance Rate</span>
                    <span className="value">{company.acceptanceRate}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="action-buttons">
        <button onClick={() => window.print()}>Download Report</button>
        <button onClick={() => window.location.href = '/scad/dashboard'}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Statistics; 