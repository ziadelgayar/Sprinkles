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
    <div className="main-content">
      <div className="p-6 max-w-4xl mx-auto">
        <div className="page-header mb-6">
          <h1 className="text-2xl font-bold">Current Interns</h1>

          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Search by name or job title"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter Tabs */}
          <div className="filter-tabs flex space-x-2 mb-4">
            <button
              className={`accept-btn${filter === 'active' ? ' active' : ''}`}
              onClick={() => setFilter('active')}
            >
              Active
            </button>
            <button
              className={`save-btn${filter === 'completed' ? ' active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Intern List */}
        <div className="space-y-6">
          {filteredInterns.length === 0 ? (
            <div className="custom-box text-center">
              <p className="text-gray-500">No interns found</p>
            </div>
          ) : (
            filteredInterns.map((intern) => (
              <div key={intern.id} className="custom-box">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold">{intern.name}</h3>
                  <span className={`status ${intern.status} px-3 py-1 rounded-full text-sm`}>
                    {intern.status}
                  </span>
                </div>
                <div className="mb-2 text-sm text-gray-500">
                  <p>Department: {intern.department}</p>
                  <p>Start Date: {intern.startDate}</p>
                  <p>End Date: {intern.endDate}</p>
                  <p>Supervisor: {intern.supervisor}</p>
                </div>
                <div className="flex flex-wrap gap-2 justify-end">
                  <button className="accept-btn" onClick={() => markAsCurrent(intern.id)}>
                    Mark as Current Intern
                  </button>
                  <button className="save-btn" onClick={() => markAsCompleted(intern.id)}>
                    Mark as Internship Complete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Interns;
