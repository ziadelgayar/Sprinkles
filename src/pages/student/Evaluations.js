import React, { useState, useEffect } from 'react';

const StudentEvaluations = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [filter, setFilter] = useState('all');
  const [courses, setCourses] = useState([
    'Database Systems',
    'Operating Systems',
    'Software Engineering',
    'Computer Networks',
  ]);

  // Load dummy evaluations on mount
  useEffect(() => {
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

  return (
    <div className="main-content">
      <div className="student-evaluations">
        <div className="page-header">
          <h1>Internship Evaluations</h1>
          <div className="filter-tabs">
            {['all', 'pending', 'completed'].map((type) => (
              <button
                key={type}
                className={`filter-btn ${filter === type ? 'active' : ''}`}
                onClick={() => setFilter(type)}
              >
                {type[0].toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="evaluations-list">
          {evaluations.length === 0 ? (
            <p>No evaluations found.</p>
          ) : (
            evaluations
              .filter((evaluation) => filter === 'all' || evaluation.status === filter)
              .map((evaluation) => (
                <div key={evaluation.id} className="evaluation-card">
                  <div className="evaluation-header">
                    <h3>{evaluation.companyName}</h3>
                    <span className={`status ${evaluation.status}`}>{evaluation.status}</span>
                  </div>

                  <p><strong>Position:</strong> {evaluation.position}</p>
                  <p><strong>Duration:</strong> {evaluation.duration}</p>
                  <p><strong>Period:</strong> {evaluation.period}</p>

                  {evaluation.status === 'pending' && (
                    <>
                      <div className="form-group">
                        <label>Recommendation</label>
                        <select
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

                      <div className="form-group">
                        <label>Evaluation</label>
                        <textarea
                          rows="4"
                          value={evaluation.content}
                          onChange={(e) =>
                            updateEvaluation(evaluation.id, { content: e.target.value })
                          }
                          placeholder="Share your experience..."
                        />
                      </div>

                      <div className="form-group">
                        <label>Rating (1–5)</label>
                        <input
                          type="number"
                          min="1"
                          max="5"
                          value={evaluation.rating}
                          onChange={(e) =>
                            updateEvaluation(evaluation.id, { rating: Number(e.target.value) })
                          }
                        />
                      </div>

                      <div className="form-group">
                        <label>Report Title</label>
                        <input
                          type="text"
                          value={evaluation.report.title}
                          onChange={(e) =>
                            updateEvaluation(evaluation.id, {
                              report: { ...evaluation.report, title: e.target.value },
                            })
                          }
                        />
                        <label>Introduction</label>
                        <textarea
                          rows="2"
                          value={evaluation.report.intro}
                          onChange={(e) =>
                            updateEvaluation(evaluation.id, {
                              report: { ...evaluation.report, intro: e.target.value },
                            })
                          }
                        />
                        <label>Body</label>
                        <textarea
                          rows="4"
                          value={evaluation.report.body}
                          onChange={(e) =>
                            updateEvaluation(evaluation.id, {
                              report: { ...evaluation.report, body: e.target.value },
                            })
                          }
                        />
                      </div>

                      <div className="form-group">
                        <label>Select Related Courses</label>
                        {courses.map((course) => (
                          <div key={course}>
                            <input
                              type="checkbox"
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
                            {course}
                          </div>
                        ))}
                      </div>

                      <div className="evaluation-actions">
                        <button
                          onClick={() =>
                            updateEvaluation(evaluation.id, { status: 'completed' })
                          }
                        >
                          Submit Final Report
                        </button>
                      </div>
                    </>
                  )}

                  {evaluation.status === 'completed' && (
                    <>
                      <h4>Evaluation Summary</h4>
                      <p><strong>Recommendation:</strong> {evaluation.recommendation}</p>
                      <p><strong>Feedback:</strong> {evaluation.content}</p>
                      <p><strong>Rating:</strong> {evaluation.rating}/5</p>

                      <h4>Report</h4>
                      <p><strong>Title:</strong> {evaluation.report.title}</p>
                      <p><strong>Intro:</strong> {evaluation.report.intro}</p>
                      <p><strong>Body:</strong> {evaluation.report.body}</p>

                      <h4>Helpful Courses</h4>
                      <ul>
                        {evaluation.selectedCourses.map((c) => (
                          <li key={c}>{c}</li>
                        ))}
                      </ul>

                      <div className="evaluation-actions">
                        <button
                          onClick={() =>
                            updateEvaluation(evaluation.id, { status: 'pending' })
                          }
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteEvaluation(evaluation.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </>
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
