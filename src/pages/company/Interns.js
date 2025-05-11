import React, { useState } from 'react';

const Interns = () => {
  const [interns, setInterns] = useState([]);
  const [filter, setFilter] = useState('active');

  return (
    <div className="interns-page">
      <div className="page-header">
        <h1>Current Interns</h1>
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

      <div className="interns-list">
        {interns.length === 0 ? (
          <div className="empty-state">
            <p>No active interns</p>
          </div>
        ) : (
          interns.map((intern) => (
            <div key={intern.id} className="intern-card">
              <div className="intern-header">
                <h3>{intern.name}</h3>
                <span className={`status ${intern.status}`}>{intern.status}</span>
              </div>
              
              <div className="intern-details">
                <p>Department: {intern.department}</p>
                <p>Start Date: {intern.startDate}</p>
                <p>End Date: {intern.endDate}</p>
                <p>Supervisor: {intern.supervisor}</p>
              </div>

              <div className="intern-actions">
                <button className="view-profile-btn">View Profile</button>
                <button className="evaluate-btn">Evaluate</button>
                <button className="view-progress-btn">View Progress</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Interns;
