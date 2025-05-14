import React, { useState } from 'react';
import { jsPDF } from 'jspdf';  // For PDF generation

const Evaluations = () => {
  const [evaluations, setEvaluations] = useState([
    {
      id: 1,
      internName: 'Alice',
      period: '2025-01-10 to 2025-05-10',
      department: 'Engineering',
      dueDate: '2025-05-15',
      status: 'pending',
      performance: 'Good',
      comments: 'Alice showed great progress during the internship.',
    },
    {
      id: 2,
      internName: 'Bob',
      period: '2025-02-01 to 2025-06-01',
      department: 'Marketing',
      dueDate: '2025-06-05',
      status: 'completed',
      performance: 'Excellent',
      comments: 'Bob demonstrated exceptional skills and dedication.',
    },
  ]);

  const [filter, setFilter] = useState('pending');
  const [newEvaluation, setNewEvaluation] = useState({
    internName: '',
    period: '',
    department: '',
    dueDate: '',
    performance: '',
    comments: '',
  });

  // Handle input changes for creating and updating evaluations
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvaluation((prev) => ({ ...prev, [name]: value }));
  };

  // Add a new evaluation
  const handleAddEvaluation = () => {
    const newEval = {
      ...newEvaluation,
      id: evaluations.length + 1,
      status: 'pending',
    };
    setEvaluations((prev) => [...prev, newEval]);
    setNewEvaluation({
      internName: '',
      period: '',
      department: '',
      dueDate: '',
      performance: '',
      comments: '',
    });
  };

  // Delete an evaluation
  const handleDeleteEvaluation = (id) => {
    setEvaluations((prev) => prev.filter((evaluation) => evaluation.id !== id));
  };

  // Update an evaluation
  const handleUpdateEvaluation = (id, updatedData) => {
    setEvaluations((prev) =>
      prev.map((evaluation) =>
        evaluation.id === id ? { ...evaluation, ...updatedData } : evaluation
      )
    );
  };

  // Filter evaluations based on status
  const filteredEvaluations = evaluations.filter(
    (evaluation) => evaluation.status === filter || filter === 'all'
  );

  // Generate PDF Report
  const generatePDF = (evaluation) => {
    const doc = new jsPDF();
    doc.text(`Intern: ${evaluation.internName}`, 10, 10);
    doc.text(`Period: ${evaluation.period}`, 10, 20);
    doc.text(`Department: ${evaluation.department}`, 10, 30);
    doc.text(`Performance: ${evaluation.performance}`, 10, 40);
    doc.text(`Comments: ${evaluation.comments}`, 10, 50);
    doc.save(`${evaluation.internName}_Evaluation_Report.pdf`);
  };

  return (
    <div className="main-content">
      <div className="evaluations-page">
        <div className="page-header">
          <h1>Intern Evaluations</h1>

          {/* Filter Tabs */}
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
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
          </div>
        </div>

        <div className="evaluations-list">
          {filteredEvaluations.length === 0 ? (
            <div className="empty-state">
              <p>No evaluations available</p>
            </div>
          ) : (
            filteredEvaluations.map((evaluation) => (
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
                    <select
                      value={evaluation.performance}
                      onChange={(e) => handleUpdateEvaluation(evaluation.id, { performance: e.target.value })}
                    >
                      <option>Excellent</option>
                      <option>Good</option>
                      <option>Average</option>
                      <option>Needs Improvement</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Comments</label>
                    <textarea
                      value={evaluation.comments}
                      onChange={(e) => handleUpdateEvaluation(evaluation.id, { comments: e.target.value })}
                    />
                  </div>

                  <div className="evaluation-actions">
                    <button onClick={() => handleDeleteEvaluation(evaluation.id)} className="delete-btn">
                      Delete
                    </button>
                    <button onClick={() => generatePDF(evaluation)} className="download-btn">
                      Download PDF
                    </button>
                    <button onClick={() => handleUpdateEvaluation(evaluation.id, { status: 'completed' })} className="submit-btn">
                      Mark as Completed
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add New Evaluation Form */}
        <div className="add-evaluation-form">
          <h2>Add New Evaluation</h2>
          <div className="form-group">
            <label>Intern Name</label>
            <input
              type="text"
              name="internName"
              value={newEvaluation.internName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Period</label>
            <input
              type="text"
              name="period"
              value={newEvaluation.period}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Department</label>
            <input
              type="text"
              name="department"
              value={newEvaluation.department}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Due Date</label>
            <input
              type="text"
              name="dueDate"
              value={newEvaluation.dueDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Performance</label>
            <select
              name="performance"
              value={newEvaluation.performance}
              onChange={handleInputChange}
            >
              <option>Excellent</option>
              <option>Good</option>
              <option>Average</option>
              <option>Needs Improvement</option>
            </select>
          </div>
          <div className="form-group">
            <label>Comments</label>
            <textarea
              name="comments"
              value={newEvaluation.comments}
              onChange={handleInputChange}
            />
          </div>

          <button onClick={handleAddEvaluation} className="add-evaluation-btn">
            Add Evaluation
          </button>
        </div>
      </div>
    </div>
  );
};

export default Evaluations;
