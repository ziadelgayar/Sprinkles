import React, { useState, useEffect } from 'react';

const StudentEvaluations = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [filter, setFilter] = useState('all');
  const [courses, setCourses] = useState([
    'Database Systems',
    'Operating Systems',
    'Software Engineering',
    'Computer Networks',
    'Web Development',
    'Data Structures',
    'Algorithms',
    'UI/UX Design'
  ]);
  const [appealMessage, setAppealMessage] = useState('');
  const [showAppealForm, setShowAppealForm] = useState(false);
  const [selectedEvaluationId, setSelectedEvaluationId] = useState(null);
  const [commentMessage, setCommentMessage] = useState('');

  // Load dummy data on mount
  useEffect(() => {
    const dummyEvaluations = [
      {
        id: 1,
        companyName: 'TechCorp',
        status: 'pending',
        // Company evaluation fields
        overallRating: 0,
        workEnvironment: '',
        learningOpportunities: '',
        compensation: '',
        workLifeBalance: '',
        recommendation: '',
        comments: '',
        // Internship fields
        position: 'Software Intern',
        duration: '3 months',
        period: 'Summer 2024',
        report: {
          title: '',
          intro: '',
          body: '',
          comments: [],
          appeal: null
        },
        selectedCourses: [],
        hasSubmittedEvaluation: false,
        hasUpdated: false
      },
      {
        id: 2,
        companyName: 'DataSoft',
        status: 'submitted',
        // Company evaluation fields
        overallRating: 4,
        workEnvironment: 'Great collaborative environment',
        learningOpportunities: 'Excellent mentorship program',
        compensation: 'Competitive for the industry',
        workLifeBalance: 'Respects work-life balance',
        recommendation: 'yes',
        comments: 'Overall positive experience',
        // Internship fields
        position: 'Data Analyst Intern',
        duration: '2 months',
        period: 'Winter 2023',
        report: {
          title: 'Data Analytics Report',
          intro: 'Introduction to the project...',
          body: 'In this internship, I analyzed data using Python...',
          comments: [],
          appeal: null
        },
        selectedCourses: ['Database Systems', 'Software Engineering'],
        hasSubmittedEvaluation: true,
        hasUpdated: false
      },
      {
        id: 3,
        companyName: 'CloudTech',
        status: 'flagged',
        // Company evaluation fields
        overallRating: 3,
        workEnvironment: 'Modern office space',
        learningOpportunities: 'Good technical training',
        compensation: 'Standard for the industry',
        workLifeBalance: 'Could be improved',
        recommendation: 'yes',
        comments: 'Good learning experience',
        // Internship fields
        position: 'Cloud Solutions Intern',
        duration: '4 months',
        period: 'Spring 2024',
        report: {
          title: 'Cloud Migration Project',
          intro: 'Overview of cloud migration...',
          body: 'Worked on migrating legacy systems to cloud...',
          comments: [
            {
              id: 1,
              author: 'Faculty Reviewer',
              content: 'Please provide more details about the migration process.',
              timestamp: '2024-03-15T10:30:00'
            }
          ],
          appeal: null
        },
        selectedCourses: ['Computer Networks', 'Web Development'],
        hasSubmittedEvaluation: true,
        hasUpdated: true
      },
      {
        id: 4,
        companyName: 'AI Solutions',
        status: 'rejected',
        // Company evaluation fields
        overallRating: 2,
        workEnvironment: 'Remote work',
        learningOpportunities: 'Limited mentorship',
        compensation: 'Below market rate',
        workLifeBalance: 'Poor work-life balance',
        recommendation: 'no',
        comments: 'Not recommended for future interns',
        // Internship fields
        position: 'AI Research Intern',
        duration: '3 months',
        period: 'Fall 2023',
        report: {
          title: 'AI Model Development',
          intro: 'Introduction to AI research...',
          body: 'Worked on developing machine learning models...',
          comments: [
            {
              id: 1,
              author: 'Faculty Reviewer',
              content: 'Report lacks technical depth and methodology details.',
              timestamp: '2024-03-10T14:20:00'
            }
          ],
          appeal: {
            message: 'I believe my report contains sufficient technical details. I can provide additional documentation if needed.',
            timestamp: '2024-03-11T09:15:00',
            status: 'pending'
          }
        },
        selectedCourses: ['Algorithms', 'Data Structures'],
        hasSubmittedEvaluation: true,
        hasUpdated: true
      }
    ];

    setEvaluations(dummyEvaluations);
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

  const handleSubmitEvaluation = (id) => {
    const evaluation = evaluations.find(e => e.id === id);

    // Validate company evaluation
    if (!evaluation.overallRating || !evaluation.workEnvironment || !evaluation.learningOpportunities) {
      alert('Please complete all required company evaluation fields.');
      return;
    }

    // Validate internship report
    if (!evaluation.report.title || !evaluation.report.intro || !evaluation.report.body) {
      alert('Please complete all required internship report fields.');
      return;
    }

    if (evaluation.selectedCourses.length === 0) {
      alert('Please select at least one course that helped during your internship.');
      return;
    }

    updateEvaluation(id, {
      status: 'submitted',
      hasSubmittedEvaluation: true
    });
  };

  const handleUpdateEvaluation = (id) => {
    const evaluation = evaluations.find(e => e.id === id);

    // Update status to pending to allow editing
    updateEvaluation(id, {
      status: 'pending',
      // Reset internship fields to allow updates
      position: evaluation.position,
      duration: evaluation.duration,
      period: evaluation.period,
      report: {
        ...evaluation.report,
        title: evaluation.report.title,
        intro: evaluation.report.intro,
        body: evaluation.report.body,
        comments: evaluation.report.comments,
        appeal: evaluation.report.appeal
      },
      selectedCourses: [...evaluation.selectedCourses]
    });
  };

  const handleSaveChanges = (id) => {
    const evaluation = evaluations.find(e => e.id === id);

    // Validate required fields
    if (!evaluation.report.title || !evaluation.report.intro || !evaluation.report.body) {
      alert('Please complete all required internship report fields.');
      return;
    }

    if (evaluation.selectedCourses.length === 0) {
      alert('Please select at least one course that helped during your internship.');
      return;
    }

    // Save changes and update status back to submitted
    updateEvaluation(id, {
      status: 'submitted'
    });
  };

  const handleAppeal = (id) => {
    if (!appealMessage.trim()) {
      alert('Please enter an appeal message.');
      return;
    }

    const evaluation = evaluations.find(e => e.id === id);
    updateEvaluation(id, {
      report: {
        ...evaluation.report,
        appeal: {
          message: appealMessage,
          timestamp: new Date().toISOString()
        }
      }
    });

    setAppealMessage('');
    setShowAppealForm(false);
    setSelectedEvaluationId(null);
  };

  const handleAddComment = (id) => {
    if (!commentMessage.trim()) {
      alert('Please enter a comment.');
      return;
    }

    const evaluation = evaluations.find(e => e.id === id);
    const newComment = {
      id: Date.now(),
      author: 'Student',
      content: commentMessage,
      timestamp: new Date().toISOString()
    };

    updateEvaluation(id, {
      report: {
        ...evaluation.report,
        comments: [...(evaluation.report.comments || []), newComment]
      }
    });

    setCommentMessage('');
  };

  return (
    <div className="student-evaluations">
      <div className="page-header">
        <h1>Evaluations</h1>
        <div className="filter-tabs">
          {['all', 'pending', 'submitted', 'flagged', 'rejected'].map((type) => (
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
                  <h3>Evaluation Report: {evaluation.companyName}</h3>
                  <span className={`status ${evaluation.status}`}>
                    {evaluation.status}
                  </span>
                </div>

                {!evaluation.hasSubmittedEvaluation ? (
                  <>
                    {/* Company Evaluation Section */}
                    <div className="section">
                      <h4>Company Evaluation</h4>
                      <div className="form-group">
                        <label>Overall Rating (1-5)*</label>
                        <input
                          type="number"
                          min="1"
                          max="5"
                          value={evaluation.overallRating}
                          onChange={(e) =>
                            updateEvaluation(evaluation.id, { overallRating: Number(e.target.value) })
                          }
                        />
                      </div>

                      <div className="form-group">
                        <label>Work Environment*</label>
                        <textarea
                          value={evaluation.workEnvironment}
                          onChange={(e) =>
                            updateEvaluation(evaluation.id, { workEnvironment: e.target.value })
                          }
                        />
                      </div>

                      <div className="form-group">
                        <label>Learning Opportunities*</label>
                        <textarea
                          value={evaluation.learningOpportunities}
                          onChange={(e) =>
                            updateEvaluation(evaluation.id, { learningOpportunities: e.target.value })
                          }
                        />
                      </div>

                      <div className="form-group">
                        <label>Compensation</label>
                        <textarea
                          value={evaluation.compensation}
                          onChange={(e) =>
                            updateEvaluation(evaluation.id, { compensation: e.target.value })
                          }
                        />
                      </div>

                      <div className="form-group">
                        <label>Work-Life Balance</label>
                        <textarea
                          value={evaluation.workLifeBalance}
                          onChange={(e) =>
                            updateEvaluation(evaluation.id, { workLifeBalance: e.target.value })
                          }
                        />
                      </div>

                      <div className="form-group">
                        <label>Would you recommend this company?</label>
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
                        <label>Additional Comments</label>
                        <textarea
                          value={evaluation.comments}
                          onChange={(e) =>
                            updateEvaluation(evaluation.id, { comments: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    {/* Internship Report Section */}
                    <div className="section">
                      <h4>Internship Report</h4>
                      <div className="form-group">
                        <label>Position</label>
                        <input
                          type="text"
                          value={evaluation.position}
                          onChange={(e) =>
                            updateEvaluation(evaluation.id, { position: e.target.value })
                          }
                        />
                      </div>

                      <div className="form-group">
                        <label>Duration</label>
                        <input
                          type="text"
                          value={evaluation.duration}
                          onChange={(e) =>
                            updateEvaluation(evaluation.id, { duration: e.target.value })
                          }
                        />
                      </div>

                      <div className="form-group">
                        <label>Report Title*</label>
                        <input
                          type="text"
                          value={evaluation.report.title}
                          onChange={(e) =>
                            updateEvaluation(evaluation.id, {
                              report: { ...evaluation.report, title: e.target.value },
                            })
                          }
                        />
                      </div>

                      <div className="form-group">
                        <label>Introduction*</label>
                        <textarea
                          rows="2"
                          value={evaluation.report.intro}
                          onChange={(e) =>
                            updateEvaluation(evaluation.id, {
                              report: { ...evaluation.report, intro: e.target.value },
                            })
                          }
                        />
                      </div>

                      <div className="form-group">
                        <label>Body*</label>
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
                        <label>Select Courses That Helped During Internship*</label>
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
                    </div>

                    <div className="evaluation-actions">
                      <button onClick={() => handleSubmitEvaluation(evaluation.id)}>
                        Submit Evaluation
                      </button>
                      <button onClick={() => deleteEvaluation(evaluation.id)}>
                        Delete
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Display submitted evaluation */}
                    <div className="section">
                      <h4>Company Evaluation</h4>
                      <p><strong>Overall Rating:</strong> {evaluation.overallRating}/5</p>
                      <p><strong>Work Environment:</strong> {evaluation.workEnvironment}</p>
                      <p><strong>Learning Opportunities:</strong> {evaluation.learningOpportunities}</p>
                      <p><strong>Compensation:</strong> {evaluation.compensation}</p>
                      <p><strong>Work-Life Balance:</strong> {evaluation.workLifeBalance}</p>
                      <p><strong>Recommendation:</strong> {evaluation.recommendation}</p>
                      <p><strong>Comments:</strong> {evaluation.comments}</p>
                    </div>

                    <div className="section">
                      <h4>Internship Report</h4>
                      <p><strong>Position:</strong> {evaluation.position}</p>
                      <p><strong>Duration:</strong> {evaluation.duration}</p>
                      <p><strong>Period:</strong> {evaluation.period}</p>
                      <p><strong>Title:</strong> {evaluation.report.title}</p>
                      <p><strong>Intro:</strong> {evaluation.report.intro}</p>
                      <p><strong>Body:</strong> {evaluation.report.body}</p>

                      <h5>Helpful Courses</h5>
                      <ul>
                        {evaluation.selectedCourses.map((c) => (
                          <li key={c}>{c}</li>
                        ))}
                      </ul>

                      {/* Comments Section */}
                      <div className="comments-section">
                        <h5>Comments</h5>
                        {evaluation.report.comments && evaluation.report.comments.length > 0 ? (
                          evaluation.report.comments.map((comment) => (
                            <div key={comment.id} className="comment">
                              <p><strong>{comment.author}</strong> - {new Date(comment.timestamp).toLocaleString()}</p>
                              <p>{comment.content}</p>
                              {/* Show appeal button right after faculty reviewer message */}
                              {comment.author === 'Faculty Reviewer' && (evaluation.status === 'flagged' || evaluation.status === 'rejected') && (
                                <div className="appeal-section" style={{ marginBottom: '20px' }}>
                                  {showAppealForm && selectedEvaluationId === evaluation.id ? (
                                    <div className="appeal-form">
                                      <textarea
                                        value={appealMessage}
                                        onChange={(e) => setAppealMessage(e.target.value)}
                                        placeholder="Enter your appeal message..."
                                        rows="4"
                                      />
                                      <div className="appeal-actions">
                                        <button onClick={() => handleAppeal(evaluation.id)}>Submit Appeal</button>
                                        <button onClick={() => {
                                          setShowAppealForm(false);
                                          setAppealMessage('');
                                          setSelectedEvaluationId(null);
                                        }}>Cancel</button>
                                      </div>
                                    </div>
                                  ) : (
                                    <>
                                      {evaluation.report.appeal && (
                                        <div className="appeal-display">
                                          <p>{evaluation.report.appeal.message}</p>
                                        </div>
                                      )}
                                      <button 
                                        className="appeal-button"
                                        onClick={() => {
                                          setShowAppealForm(true);
                                          setSelectedEvaluationId(evaluation.id);
                                          setAppealMessage('');
                                        }}
                                      >
                                        Appeal
                                      </button>
                                    </>
                                  )}
                                </div>
                              )}
                            </div>
                          ))
                        ) : (
                          <p>No comments yet.</p>
                        )}
                      </div>

                      {/* Update Section - Always at the bottom */}
                      <div className="evaluation-actions">
                        <button onClick={() => handleUpdateEvaluation(evaluation.id)}>
                          Update Evaluation
                        </button>
                        <button onClick={() => deleteEvaluation(evaluation.id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default StudentEvaluations;
