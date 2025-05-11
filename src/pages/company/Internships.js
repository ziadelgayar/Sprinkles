import React, { useState } from 'react';

const Internships = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [internships, setInternships] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    date: '',
    status: 'active'
  });
  const [isPostedBySCAD, setIsPostedBySCAD] = useState(false);
  const [isPostedByMe, setIsPostedByMe] = useState(false);

  return (
    <div className="internships-page">
      <div className="page-header">
        <h1>Manage Internships</h1>
        
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for internships..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-btn">Search</button>
        </div>
        <button className="post-new-btn">Post New Internship</button>
        
      </div>

      <div className="filters-section">
        <select 
          value={filters.category}
          onChange={(e) => setFilters({...filters, category: e.target.value})}
        >
          <option value="">All Categories</option>
          <option value="tech">Technology</option>
          <option value="marketing">Marketing</option>
          <option value="finance">Finance</option>
        </select>

        <select 
          value={filters.location}
          onChange={(e) => setFilters({...filters, location: e.target.value})}
        >
          <option value="">All Locations</option>
          <option value="remote">Remote</option>
          <option value="onsite">On-site</option>
        </select>

        <input 
          type="date"
          value={filters.date}
          onChange={(e) => setFilters({...filters, date: e.target.value})}
        />
      </div>

      <div className="posted-by-scad">
        <label>
          <input 
            type="checkbox"
            checked={isPostedBySCAD}
            onChange={() => setIsPostedBySCAD(!isPostedBySCAD)}
          />
          Posted by SCAD
        </label>
      </div>

      
      <div className="posted-by-me">
        <label>
          <input 
            type="checkbox"
            checked={isPostedByMe}
            onChange={() => setIsPostedByMe(!isPostedByMe)}
          />
          Posted by Me
        </label>
        {isPostedByMe && (
    <div className="crud-action-dropdown">
      <label>Choose Action:</label>
      <select>
        <option value="">Select Action</option>
        <option value="create">Create</option>
        <option value="read">Read</option>
        <option value="update">Update</option>
        <option value="delete">Delete</option>
      </select>
    </div>
  )}
      </div>

      <div className="internships-list">
        {internships.length === 0 ? (
          <div className="empty-state">
            <p>No internships posted yet</p>
            <button className="post-first-btn">Delete all internships</button>
          </div>
        ) : (
          internships.map((internship) => (
            <div key={internship.id} className="internship-card">
              <div className="internship-header">
                <h3>{internship.title}</h3>
                <span className={`status ${internship.status}`}>{internship.status}</span>
              </div>
              <p className="description">{internship.description}</p>
              <div className="internship-details">
                <span>Location: {internship.location}</span>
                <span>Duration: {internship.duration}</span>
                <span>Applications: {internship.applicationCount}</span>
              </div>
              <div className="internship-actions">
                <button className="edit-btn">Edit</button>
                <button className="view-applicants-btn">View Applicants</button>
                <button className="delete-btn">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Internships;