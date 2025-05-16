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
      <div className="p-6 max-w-4xl mx-auto">
        <div className="page-header mb-6">
          <h1 className="text-2xl font-bold">Intern Evaluations</h1>
          {/* Filter Tabs */}
          <div className="filter-tabs flex space-x-2 mt-4">
            <button
              className={`reject-btn${filter === 'pending' ? ' active' : ''}`}
              onClick={() => setFilter('pending')}
            >
              Pending
            </button>
            <button
              className={`accept-btn${filter === 'completed' ? ' active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
            <button
              className={`save-btn${filter === 'all' ? ' active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
          </div>
        </div>

        <div className="space-y-6 mb-8">
          {filteredEvaluations.length === 0 ? (
            <div className="custom-box text-center">
              <p className="text-gray-500">No evaluations available</p>
            </div>
          ) : (
            filteredEvaluations.map((evaluation) => (
              <div key={evaluation.id} className="custom-box">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold">{evaluation.internName}</h3>
                  <span className={`status ${evaluation.status} px-3 py-1 rounded-full text-sm`}>
                    {evaluation.status}
                  </span>
                </div>
                <div className="mb-2 text-sm text-gray-500">
                  <p>Period: {evaluation.period}</p>
                  <p>Department: {evaluation.department}</p>
                  <p>Due Date: {evaluation.dueDate}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                  <div className="form-group mb-2">
                    <label className="block font-semibold mb-1">Performance Rating</label>
                    <select
                      className="w-full p-2 border rounded bg-white text-gray-900"
                      value={evaluation.performance}
                      onChange={(e) => handleUpdateEvaluation(evaluation.id, { performance: e.target.value })}
                    >
                      <option>Excellent</option>
                      <option>Good</option>
                      <option>Average</option>
                      <option>Needs Improvement</option>
                    </select>
                  </div>
                  <div className="form-group mb-2">
                    <label className="block font-semibold mb-1">Comments</label>
                    <textarea
                      className="w-full p-2 border rounded"
                      value={evaluation.comments}
                      onChange={(e) => handleUpdateEvaluation(evaluation.id, { comments: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 justify-end">
                  <button onClick={() => handleDeleteEvaluation(evaluation.id)} className="reject-btn">
                    Delete
                  </button>
                  <button onClick={() => generatePDF(evaluation)} className="save-btn">
                    Download PDF
                  </button>
                  {evaluation.status !== 'completed' && (
                    <button onClick={() => handleUpdateEvaluation(evaluation.id, { status: 'completed' })} className="accept-btn">
                      Mark as Completed
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
        <div className="my-8" />
        {/* Add New Evaluation Form */}
        <div className="custom-box mt-8">
          <h2 className="text-xl font-bold mb-4">Add New Evaluation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group mb-2">
              <label className="block font-semibold mb-1">Intern Name</label>
              <input
                type="text"
                name="internName"
                className="w-full p-2 border rounded"
                value={newEvaluation.internName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <label className="block font-semibold mb-1">Period</label>
              <input
                type="text"
                name="period"
                className="w-full p-2 border rounded"
                value={newEvaluation.period}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <label className="block font-semibold mb-1">Department</label>
              <input
                type="text"
                name="department"
                className="w-full p-2 border rounded"
                value={newEvaluation.department}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <label className="block font-semibold mb-1">Due Date</label>
              <input
                type="text"
                name="dueDate"
                className="w-full p-2 border rounded"
                value={newEvaluation.dueDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <label className="block font-semibold mb-1">Performance</label>
              <select
                name="performance"
                className="w-full p-2 border rounded bg-white text-gray-900"
                value={newEvaluation.performance}
                onChange={handleInputChange}
              >
                <option>Excellent</option>
                <option>Good</option>
                <option>Average</option>
                <option>Needs Improvement</option>
              </select>
            </div>
            <div className="form-group mb-2 md:col-span-2">
              <label className="block font-semibold mb-1">Comments</label>
              <textarea
                name="comments"
                className="w-full p-2 border rounded"
                value={newEvaluation.comments}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button onClick={handleAddEvaluation} className="accept-btn">
              Add Evaluation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Evaluations;
