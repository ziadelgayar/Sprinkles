import React, { useState } from 'react';

const Evaluations = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [filter, setFilter] = useState('pending');

  return (
    <div className="evaluations-page">
      <div className="page-header">
        <h1>Intern Evaluations</h1>
        <div className="filter-tabs">
          <button 
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button 
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
        
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
      </div>

      <div className="evaluations-list">
        {evaluations.length === 0 ? (
          <div className="empty-state">
            <p>No evaluations pending</p>
          </div>
        ) : (
          evaluations.map((evaluation) => (
            <div key={evaluation.id} className="evaluation-card">
              <div className="evaluation-header">
                <h3>{evaluation.internName}</h3>
                <span className={`status ${evaluation.status}`}>
                  {evaluation.status}
                </span>
              </div>

              <div className="evaluation-details">
                <p>Period: {evaluation.period}</p>
                <p>Department: {evaluation.department}</p>
                <p>Due Date: {evaluation.dueDate}</p>
              </div>

              <div className="evaluation-form">
                <div className="form-group">
                  <label>Performance Rating</label>
                  <select>
                    <option>Excellent</option>
                    <option>Good</option>
                    <option>Average</option>
                    <option>Needs Improvement</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Comments</label>
                  <textarea placeholder="Enter your evaluation comments..."></textarea>
                </div>

                <div className="evaluation-actions">
                  <button className="save-draft-btn">Save Draft</button>
                  <button className="submit-btn">Submit Evaluation</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Evaluations;
