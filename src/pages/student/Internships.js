import React, { useState } from 'react';

const StudentInternships = () => {
  const [internships, setInternships] = useState([]);
  const [filters, setFilters] = useState({
    industry: '',
    duration: '',
    type: '',
    searchQuery: ''
  });

  return (
    <div className="student-internships">
      <div className="page-header">
        <h1>Available Internships</h1>
      </div>

      <div className="search-filters">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by job title or company..."
            value={filters.searchQuery}
            onChange={(e) => setFilters({...filters, searchQuery: e.target.value})}
          />
          <button className="search-btn">Search</button>
        </div>

        <div className="filter-options">
          <select 
            value={filters.industry}
            onChange={(e) => setFilters({...filters, industry: e.target.value})}
          >
            <option value="">All Industries</option>
            <option value="tech">Technology</option>
            <option value="design">Design</option>
            <option value="business">Business</option>
          </select>

          <select 
            value={filters.duration}
            onChange={(e) => setFilters({...filters, duration: e.target.value})}
          >
            <option value="">All Durations</option>
            <option value="summer">Summer</option>
            <option value="semester">Semester</option>
            <option value="year">Year-round</option>
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

      <div className="internships-list">
        {internships.length === 0 ? (
          <div className="empty-state">
            <p>No internships found matching your criteria</p>
          </div>
        ) : (
          internships.map((internship) => (
            <div key={internship.id} className="internship-card">
              <div className="internship-header">
                <h3>{internship.title}</h3>
                <span className={`status ${internship.type}`}>{internship.type}</span>
              </div>

              <div className="company-info">
                <h4>{internship.companyName}</h4>
                <p>{internship.location}</p>
              </div>

              <div className="internship-details">
                <p><strong>Duration:</strong> {internship.duration}</p>
                <p><strong>Type:</strong> {internship.type}</p>
                {internship.salary && (
                  <p><strong>Salary:</strong> {internship.salary}</p>
                )}
              </div>

              <div className="skills-required">
                <h4>Skills Required:</h4>
                <div className="skills-list">
                  {internship.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="job-description">
                <h4>Job Description:</h4>
                <p>{internship.description}</p>
              </div>

              <div className="internship-actions">
                <button className="view-details-btn">View Details</button>
                <button className="apply-btn">Apply Now</button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="pagination">
        <button className="prev-btn">Previous</button>
        <span className="page-info">Page 1 of 1</span>
        <button className="next-btn">Next</button>
      </div>
    </div>
  );
};

export default StudentInternships;
