import React, { useState, useEffect } from 'react';

const StudentInternships = () => {
  // Sample internship data
  const sampleInternships = [
    {
      id: 1,
      title: 'UX Design Intern',
      company: 'Google',
      location: 'Remote',
      startDate: '2025-06-01',
      endDate: '2025-08-31',
      status: 'current',
      description: 'Work on designing user interfaces for Google products.',
      requirements: 'Experience with Figma, UX principles',
      postedDate: '2025-03-15'
    },
    {
      id: 2,
      title: 'Software Engineering Intern',
      company: 'Microsoft',
      location: 'Redmond, WA',
      startDate: '2025-05-15',
      endDate: '2025-08-15',
      status: 'upcoming',
      description: 'Develop features for Windows applications.',
      requirements: 'C#, .NET experience preferred',
      postedDate: '2025-02-20'
    },
    {
      id: 3,
      title: 'Marketing Intern',
      company: 'Nike',
      location: 'Portland, OR',
      startDate: '2024-09-01',
      endDate: '2024-12-15',
      status: 'completed',
      description: 'Assist with digital marketing campaigns.',
      requirements: 'Marketing major preferred',
      postedDate: '2024-07-10'
    },
    {
      id: 4,
      title: 'Graphic Design Intern',
      company: 'Apple',
      location: 'Cupertino, CA',
      startDate: '2025-06-15',
      endDate: '2025-09-15',
      status: 'current',
      description: 'Create marketing materials for Apple products.',
      requirements: 'Proficiency in Adobe Creative Suite',
      postedDate: '2025-03-01'
    }
  ];

  const [internships, setInternships] = useState(sampleInternships);
  const [filters, setFilters] = useState({
    searchQuery: '',
    status: 'all',
    dateRange: 'all'
  });
  const [appliedInternships, setAppliedInternships] = useState([]);

  // Filter internships based on search and filters
  const filteredInternships = internships.filter(internship => {
    // Search filter
    const matchesSearch = 
      internship.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      internship.company.toLowerCase().includes(filters.searchQuery.toLowerCase());
    
    // Status filter
    const matchesStatus = 
      filters.status === 'all' || 
      internship.status === filters.status;
    
    // Date filter
    const now = new Date();
    const startDate = new Date(internship.startDate);
    const matchesDate = 
      filters.dateRange === 'all' ||
      (filters.dateRange === 'past' && startDate < now) ||
      (filters.dateRange === 'upcoming' && startDate > now) ||
      (filters.dateRange === 'current' && startDate <= now && new Date(internship.endDate) >= now);
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleApply = (internshipId) => {
    if (!appliedInternships.includes(internshipId)) {
      setAppliedInternships([...appliedInternships, internshipId]);
      alert('Application submitted successfully!');
    } else {
      alert('You have already applied to this internship.');
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'current': return 'Current';
      case 'upcoming': return 'Upcoming';
      case 'completed': return 'Completed';
      default: return '';
    }
  };

  return (
    <div className="main-content">
      <div className="student-internships">
        <div className="page-header">
          <h1>Available Internships</h1>
          <p>Browse and apply for internships that match your interests</p>
        </div>

        <div className="search-filters">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by job title or company name..."
              value={filters.searchQuery}
              onChange={(e) => setFilters({...filters, searchQuery: e.target.value})}
            />
          </div>

          <div className="filter-options">
            <div className="filter-group">
              <label>Status:</label>
              <select 
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
              >
                <option value="all">All Statuses</option>
                <option value="current">Current Internships</option>
                <option value="upcoming">Upcoming Internships</option>
                <option value="completed">Completed Internships</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Date Range:</label>
              <select 
                value={filters.dateRange}
                onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
              >
                <option value="all">All Dates</option>
                <option value="past">Past Internships</option>
                <option value="current">Current Internships</option>
                <option value="upcoming">Upcoming Internships</option>
              </select>
            </div>
          </div>
        </div>

        <div className="internships-list">
          {filteredInternships.length === 0 ? (
            <div className="empty-state">
              <p>No internships found matching your criteria</p>
            </div>
          ) : (
            filteredInternships.map((internship) => (
              <div key={internship.id} className="internship-card">
                <div className="internship-header">
                  <h3>{internship.title}</h3>
                  <span className={`status ${internship.status}`}>
                    {getStatusLabel(internship.status)}
                  </span>
                </div>

                <div className="company-info">
                  <h4>{internship.company}</h4>
                  <p>{internship.location}</p>
                  <p className="date-range">
                    {new Date(internship.startDate).toLocaleDateString()} - {new Date(internship.endDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="internship-details">
                  <h4>Description:</h4>
                  <p>{internship.description}</p>
                  
                  <h4>Requirements:</h4>
                  <p>{internship.requirements}</p>
                </div>

                <div className="internship-actions">
                  {appliedInternships.includes(internship.id) ? (
                    <button className="applied-btn" disabled>Applied</button>
                  ) : (
                    <button 
                      className="apply-btn"
                      onClick={() => handleApply(internship.id)}
                    >
                      Apply Now
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentInternships;