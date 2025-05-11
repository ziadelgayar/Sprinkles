import React, { useState } from 'react';

const StudentEvaluations = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [filter, setFilter] = useState('all');

  return (
    <div className="student-evaluations">
      <div className="page-header">
        <h1>Internship Evaluations</h1>
        <div className="filter-tabs">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
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
      </div>

      <div className="evaluations-list">
        {evaluations.length === 0 ? (
          <div className="empty-state">
            <p>No evaluations found</p>
          </div>
        ) : (
          evaluations.map((evaluation) => (
            <div key={evaluation.id} className="evaluation-card">
              <div className="evaluation-header">
                <h3>{evaluation.companyName}</h3>
                <span className={`status ${evaluation.status}`}>
                  {evaluation.status}
                </span>
              </div>

              <div className="internship-details">
                <p><strong>Position:</strong> {evaluation.position}</p>
                <p><strong>Duration:</strong> {evaluation.duration}</p>
                <p><strong>Period:</strong> {evaluation.period}</p>
              </div>

              {evaluation.status === 'pending' && (
                <div className="evaluation-form">
                  <div className="form-group">
                    <label>Would you recommend this company to other students?</label>
                    <select>
                      <option value="">Select an option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Evaluation</label>
                    <textarea 
                      placeholder="Share your experience and feedback..."
                      rows="6"
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label>Rating</label>
                    <div className="rating-stars">
                      {/* Star rating component will go here */}
                    </div>
                  </div>

                  <div className="evaluation-actions">
                    <button className="save-draft-btn">Save Draft</button>
                    <button className="submit-btn">Submit Evaluation</button>
                  </div>
                </div>
              )}

              {evaluation.status === 'completed' && (
                <div className="completed-evaluation">
                  <div className="evaluation-summary">
                    <h4>Your Evaluation</h4>
                    <p>{evaluation.content}</p>
                    <div className="recommendation">
                      <strong>Recommendation:</strong> {evaluation.recommendation}
                    </div>
                    <div className="rating">
                      <strong>Rating:</strong> {evaluation.rating}/5
                    </div>
                  </div>

                  <div className="evaluation-actions">
                    <button className="edit-btn">Edit Evaluation</button>
                    <button className="delete-btn">Delete Evaluation</button>
                  </div>
                </div>
              )}
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

export default StudentEvaluations;
