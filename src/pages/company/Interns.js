import React, { useState } from 'react';

const Interns = () => {
  const [interns, setInterns] = useState([
    {
      id: 1,
      name: 'Alice',
      department: 'Engineering',
      startDate: '2025-01-10',
      endDate: '2025-05-10',
      supervisor: 'John Doe',
      status: 'current intern',
      jobTitle: 'Software Intern',
    },
    {
      id: 2,
      name: 'Bob',
      department: 'Marketing',
      startDate: '2025-02-01',
      endDate: '2025-06-01',
      supervisor: 'Jane Smith',
      status: 'internship complete',
      jobTitle: 'Marketing Intern',
    },
    {
      id: 3,
      name: 'Charlie',
      department: 'Sales',
      startDate: '2025-03-01',
      endDate: '2025-08-01',
      supervisor: 'Eve Johnson',
      status: 'current intern',
      jobTitle: 'Sales Intern',
    },
  ]);

  const [filter, setFilter] = useState('active');
  const [searchQuery, setSearchQuery] = useState('');

  // Update intern status to 'internship complete'
  const markAsCompleted = (id) => {
    setInterns((prevInterns) =>
      prevInterns.map((intern) =>
        intern.id === id ? { ...intern, status: 'internship complete' } : intern
      )
    );
  };

  // Update intern status to 'current intern'
  const markAsCurrent = (id) => {
    setInterns((prevInterns) =>
      prevInterns.map((intern) =>
        intern.id === id ? { ...intern, status: 'current intern' } : intern
      )
    );
  };

  // Filter interns based on status
  const filteredInterns = interns.filter((intern) => {
    const matchesStatus =
      filter === 'active'
        ? intern.status === 'current intern'
        : intern.status === 'internship complete';
    const matchesSearch =
      intern.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      intern.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="main-content interns-page">
      <div className="page-header">
        <h1>Current Interns</h1>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name or job title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          <button
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Intern List */}
      <div className="interns-list">
        {filteredInterns.length === 0 ? (
          <div className="empty-state">
            <p>No interns found</p>
          </div>
        ) : (
          filteredInterns.map((intern) => (
            <div key={intern.id} className="intern-card">
              <div className="intern-header">
                <h3>{intern.name}</h3>
                <span className={`status ${intern.status}`}>
                  {intern.status}
                </span>
              </div>

              <div className="intern-details">
                <p>Department: {intern.department}</p>
                <p>Start Date: {intern.startDate}</p>
                <p>End Date: {intern.endDate}</p>
                <p>Supervisor: {intern.supervisor}</p>
              </div>

              <div className="intern-actions">
                <button onClick={() => markAsCurrent(intern.id)}>
                  Mark as Current Intern
                </button>
                <button onClick={() => markAsCompleted(intern.id)}>
                  Mark as Internship Complete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Interns;
