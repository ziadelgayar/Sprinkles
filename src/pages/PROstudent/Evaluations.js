import React, { useState, useEffect } from 'react';

const StudentEvaluations = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [filter, setFilter] = useState('all');
  const [courses] = useState([
    'Database Systems',
    'Operating Systems',
    'Software Engineering',
    'Computer Networks',
  ]);
  const [newEvaluation, setNewEvaluation] = useState({
    companyName: '',
    position: '',
    duration: '',
    period: '',
    status: 'pending',
    recommendation: '',
    content: '',
    rating: 0,
    report: {
      title: '',
      intro: '',
      body: '',
    },
    selectedCourses: [],
    appealMessage: '',
    comments: '',
  });
  const [appealMessages, setAppealMessages] = useState({});

  useEffect(() => {
    // Dummy data including flagged and rejected evaluations with comments
    const dummyData = [
      {
        id: 1,
        companyName: 'TechCorp',
        position: 'Software Intern',
        duration: '3 months',
        period: 'Summer 2024',
        status: 'pending',
        recommendation: '',
        content: '',
        rating: 0,
        report: {
          title: '',
          intro: '',
          body: '',
        },
        selectedCourses: [],
        appealMessage: '',
        comments: '',
      },
      {
        id: 2,
        companyName: 'DataSoft',
        position: 'Data Analyst Intern',
        duration: '2 months',
        period: 'Winter 2023',
        status: 'completed',
        recommendation: 'yes',
        content: 'Great experience working with real datasets.',
        rating: 4,
        report: {
          title: 'Data Analytics Report',
          intro: 'Introduction to the project...',
          body: 'In this internship, I analyzed data using Python...',
        },
        selectedCourses: ['Database Systems', 'Software Engineering'],
        appealMessage: '',
        comments: '',
      },
      {
        id: 3,
        companyName: 'InnoTech',
        position: 'Marketing Intern',
        duration: '1 month',
        period: 'Spring 2024',
        status: 'flagged',
        recommendation: 'no',
        content: 'Report was missing key details.',
        rating: 2,
        report: {
          title: 'Marketing Internship Insights',
          intro: 'Overview of marketing tasks...',
          body: 'I was responsible for social media and ads...',
        },
        selectedCourses: ['Software Engineering'],
        appealMessage: '',
        comments: 'Please provide more details on your accomplishments.',
      },
      {
        id: 4,
        companyName: 'BuildIt',
        position: 'Construction Intern',
        duration: '2 months',
        period: 'Fall 2023',
        status: 'rejected',
        recommendation: 'no',
        content: 'Report did not meet standards.',
        rating: 1,
        report: {
          title: 'Construction Site Report',
          intro: 'Summary of activities...',
          body: 'Safety protocols and site management overview...',
        },
        selectedCourses: ['Operating Systems', 'Computer Networks'],
        appealMessage: '',
        comments: 'Report rejected due to insufficient evidence of learning.',
      },
    ];
    setEvaluations(dummyData);
  }, []);

  const updateEvaluation = (id, updatedFields) => {
    setEvaluations((prev) =>
      prev.map((evaluation) =>
        evaluation.id === id ? { ...evaluation, ...updatedFields } : evaluation
      )
    );
  };

  const deleteEvaluation = (id) => {
    setEvaluations((prev) => prev.filter((evaluation) => evaluation.id !== id));
  };

  const createEvaluation = () => {
    if (!newEvaluation.companyName.trim()) {
      alert('Company Name is required to create an evaluation.');
      return;
    }
    // Check for existing evaluation of the same company
    const existing = evaluations.find(
      (ev) =>
        ev.companyName.toLowerCase() === newEvaluation.companyName.trim().toLowerCase()
    );
    if (existing) {
      alert('You can only create one evaluation per company.');
      return;
    }
    const newId = evaluations.length ? Math.max(...evaluations.map((e) => e.id)) + 1 : 1;
    setEvaluations((prev) => [...prev, { ...newEvaluation, id: newId }]);
    setNewEvaluation({
      companyName: '',
      position: '',
      duration: '',
      period: '',
      status: 'pending',
      recommendation: '',
      content: '',
      rating: 0,
      report: {
        title: '',
        intro: '',
        body: '',
      },
      selectedCourses: [],
      appealMessage: '',
      comments: '',
    });
    setFilter('all');
  };

  const submitAppeal = (id) => {
    const message = appealMessages[id];
    if (!message || message.trim() === '') {
      alert('Please enter an appeal message before submitting.');
      return;
    }
    updateEvaluation(id, { appealMessage: message });
    alert('Appeal submitted successfully.');
    setAppealMessages((prev) => ({ ...prev, [id]: '' }));
  };

  return (
    <div className="main-content">
      <div className="p-6 max-w-4xl mx-auto">
        <div className="page-header mb-6">
          <h1 className="text-2xl font-bold">Internship Evaluations</h1>
          <div className="filter-tabs flex space-x-2 mt-4">
            {['all', 'pending', 'completed', 'flagged', 'rejected'].map((type) => (
              <button
                key={type}
                className={`filter-btn ${filter === type ? 'active' : ''} px-4 py-2 rounded`}
                onClick={() => setFilter(type)}
              >
                {type[0].toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* New Evaluation Creation Form */}
        <div className="custom-box mb-6">
          <h2 className="text-xl font-bold mb-4">Create New Evaluation</h2>

          <div className="grid grid-cols-1 gap-4">
            <div className="form-group mb-4">
              <label className="block font-semibold mb-2">Company Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={newEvaluation.companyName}
                onChange={(e) =>
                  setNewEvaluation((prev) => ({ ...prev, companyName: e.target.value }))
                }
              />
            </div>

            <div className="form-group mb-4">
              <label className="block font-semibold mb-2">Position</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={newEvaluation.position}
                onChange={(e) =>
                  setNewEvaluation((prev) => ({ ...prev, position: e.target.value }))
                }
              />
            </div>

            <div className="form-group mb-4">
              <label className="block font-semibold mb-2">Duration</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={newEvaluation.duration}
                onChange={(e) =>
                  setNewEvaluation((prev) => ({ ...prev, duration: e.target.value }))
                }
              />
            </div>

            <div className="form-group mb-4">
              <label className="block font-semibold mb-2">Period</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={newEvaluation.period}
                onChange={(e) =>
                  setNewEvaluation((prev) => ({ ...prev, period: e.target.value }))
                }
              />
            </div>

            <button 
              onClick={createEvaluation}
              className="accept-btn justify-self-end"
            >
              Create Evaluation
            </button>
          </div>
        </div>

        <div className="evaluations-list space-y-6">
          {evaluations.length === 0 ? (
            <p className="text-gray-500">No evaluations found.</p>
          ) : (
            evaluations
              .filter((evaluation) => filter === 'all' || evaluation.status === filter)
              .map((evaluation) => (
                <div key={evaluation.id} className="custom-box">
                  <div className="evaluation-header flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">{evaluation.companyName}</h3>
                    <span className={`status ${evaluation.status} px-3 py-1 rounded-full text-sm`}>
                      {evaluation.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-2 mb-4">
                    <p><strong>Position:</strong> {evaluation.position}</p>
                    <p><strong>Duration:</strong> {evaluation.duration}</p>
                    <p><strong>Period:</strong> {evaluation.period}</p>
                  </div>

                  {(evaluation.status === 'pending' || evaluation.status === 'flagged' || evaluation.status === 'rejected') && (
                    <div className="space-y-4">
                      <div className="form-group mb-4">
                        <label className="block font-semibold mb-2">Recommendation</label>
                        <select
                          className="w-full p-2 border rounded"
                          value={evaluation.recommendation}
                          onChange={(e) =>
                            updateEvaluation(evaluation.id, { recommendation: e.target.value })
                          }
                        >
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>

                      <div className="form-group mb-4">
                        <label className="block font-semibold mb-2">Evaluation</label>
                        <textarea
                          rows="4"
                          className="w-full p-2 border rounded"
                          value={evaluation.content}
                          onChange={(e) =>
                            updateEvaluation(evaluation.id, { content: e.target.value })
                          }
                          placeholder="Share your experience..."
                        />
                      </div>

                      <div className="form-group mb-4">
                        <label className="block font-semibold mb-2">Rating (1–5)</label>
                        <input
                          type="number"
                          min="1"
                          max="5"
                          className="w-full p-2 border rounded"
                          value={evaluation.rating}
                          onChange={(e) =>
                            updateEvaluation(evaluation.id, { rating: Number(e.target.value) })
                          }
                        />
                      </div>

                      <div className="form-group mb-4">
                        <label className="block font-semibold mb-2">Report Title</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded"
                          value={evaluation.report.title}
                          onChange={(e) =>
                            updateEvaluation(evaluation.id, {
                              report: { ...evaluation.report, title: e.target.value },
                            })
                          }
                        />
                      </div>
                      <div className="form-group mb-4">
                        <label className="block font-semibold mb-2">Introduction</label>
                        <textarea
                          rows="2"
                          className="w-full p-2 border rounded"
                          value={evaluation.report.intro}
                          onChange={(e) =>
                            updateEvaluation(evaluation.id, {
                              report: { ...evaluation.report, intro: e.target.value },
                            })
                          }
                        />
                      </div>
                      <div className="form-group mb-4">
                        <label className="block font-semibold mb-2">Body</label>
                        <textarea
                          rows="4"
                          className="w-full p-2 border rounded"
                          value={evaluation.report.body}
                          onChange={(e) =>
                            updateEvaluation(evaluation.id, {
                              report: { ...evaluation.report, body: e.target.value },
                            })
                          }
                        />
                      </div>

                      <div className="form-group mb-4">
                        <label className="block font-semibold mb-2">Select Related Courses</label>
                        <div className="grid grid-cols-2 gap-2">
                          {courses.map((course) => (
                            <div key={course} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                className="form-checkbox"
                                checked={evaluation.selectedCourses.includes(course)}
                                onChange={(e) => {
                                  const updatedCourses = e.target.checked
                                    ? [...evaluation.selectedCourses, course]
                                    : evaluation.selectedCourses.filter((c) => c !== course);
                                  updateEvaluation(evaluation.id, {
                                    selectedCourses: updatedCourses,
                                  });
                                }}
                              />
                              <span>{course}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="evaluation-actions flex justify-end space-x-2">
                        {evaluation.status !== 'completed' && (
                          <button
                            className="accept-btn"
                            onClick={() =>
                              updateEvaluation(evaluation.id, { status: 'completed' })
                            }
                          >
                            Submit Final Report
                          </button>
                        )}
                      </div>

                      {/* Show comments for flagged or rejected reports */}
                      {(evaluation.status === 'flagged' || evaluation.status === 'rejected') && (
                        <div className="mt-4 space-y-4">
                          <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-semibold mb-2">Comments from Reviewer</h4>
                            <p>{evaluation.comments || 'No comments provided.'}</p>
                          </div>

                          <div className="form-group mb-4">
                            <label className="block font-semibold mb-2">Appeal Message</label>
                            <textarea
                              rows="3"
                              className="w-full p-2 border rounded"
                              value={appealMessages[evaluation.id] || ''}
                              onChange={(e) =>
                                setAppealMessages((prev) => ({
                                  ...prev,
                                  [evaluation.id]: e.target.value,
                                }))
                              }
                              placeholder="Write your appeal message here..."
                            />
                          </div>

                          <div className="flex justify-end space-x-2">
                            <button 
                              className="accept-btn"
                              onClick={() => submitAppeal(evaluation.id)}
                            >
                              Submit Appeal
                            </button>
                          </div>

                          {evaluation.appealMessage && (
                            <div className="bg-blue-50 p-4 rounded">
                              <p><strong>Your Appeal Submitted:</strong> {evaluation.appealMessage}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {evaluation.status === 'completed' && (
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded">
                        <h4 className="font-semibold mb-2">Evaluation Summary</h4>
                        <p><strong>Recommendation:</strong> {evaluation.recommendation}</p>
                        <p><strong>Feedback:</strong> {evaluation.content}</p>
                        <p><strong>Rating:</strong> {evaluation.rating}/5</p>
                      </div>

                      <div className="bg-gray-50 p-4 rounded">
                        <h4 className="font-semibold mb-2">Report</h4>
                        <p><strong>Title:</strong> {evaluation.report.title}</p>
                        <p><strong>Intro:</strong> {evaluation.report.intro}</p>
                        <p><strong>Body:</strong> {evaluation.report.body}</p>
                      </div>

                      <div className="bg-gray-50 p-4 rounded">
                        <h4 className="font-semibold mb-2">Helpful Courses</h4>
                        <ul className="list-disc list-inside">
                          {evaluation.selectedCourses.map((c) => (
                            <li key={c}>{c}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="evaluation-actions flex justify-end space-x-2">
                        <button
                          className="accept-btn"
                          onClick={() =>
                            updateEvaluation(evaluation.id, { status: 'pending' })
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="reject-btn"
                          onClick={() => deleteEvaluation(evaluation.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentEvaluations;
