import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ReportDetails = () => {
  const { reportId } = useParams();
  const [report, setReport] = useState({
    id: reportId,
    studentName: 'John Doe',
    studentId: '12345',
    major: 'Computer Science',
    company: 'Tech Corp',
    supervisor: 'Jane Smith',
    supervisorEmail: 'jane.smith@techcorp.com',
    startDate: '2024-01-15',
    endDate: '2024-04-15',
    status: 'pending',
    evaluation: {
      rating: 4.5,
      comments: 'Excellent performance',
      technicalSkills: 4.7,
      communicationSkills: 4.3,
      teamwork: 4.6,
      initiative: 4.8
    },
    reportContent: {
      objectives: 'To gain practical experience in software development...',
      tasks: [
        'Developed new features for the company website',
        'Participated in code reviews',
        'Collaborated with the UX team'
      ],
      achievements: [
        'Successfully implemented 3 major features',
        'Reduced bug reports by 25%',
        'Improved code documentation'
      ],
      challenges: 'Initially struggled with the codebase...',
      learningOutcomes: 'Gained significant experience in...'
    }
  });

  const [clarification, setClarification] = useState('');

  const handleAddClarification = () => {
    if (clarification.trim()) {
      setReport(prev => ({
        ...prev,
        clarification: clarification
      }));
      setClarification('');
    }
  };

  const handleStatusChange = (newStatus) => {
    setReport(prev => ({
      ...prev,
      status: newStatus
    }));
  };

  return (
    <div className="report-details-page">
      <div className="report-header">
        <h1>Internship Report Details</h1>
        <div className="status-actions">
          <span className={`status ${report.status}`}>{report.status}</span>
          <button onClick={() => handleStatusChange('accepted')}>Accept</button>
          <button onClick={() => handleStatusChange('flagged')}>Flag</button>
          <button onClick={() => handleStatusChange('rejected')}>Reject</button>
        </div>
      </div>

      <div className="report-content">
        <section className="student-info">
          <h2>Student Information</h2>
          <p><strong>Name:</strong> {report.studentName}</p>
          <p><strong>ID:</strong> {report.studentId}</p>
          <p><strong>Major:</strong> {report.major}</p>
        </section>

        <section className="company-info">
          <h2>Company Information</h2>
          <p><strong>Company:</strong> {report.company}</p>
          <p><strong>Supervisor:</strong> {report.supervisor}</p>
          <p><strong>Supervisor Email:</strong> {report.supervisorEmail}</p>
          <p><strong>Duration:</strong> {report.startDate} to {report.endDate}</p>
        </section>

        <section className="evaluation">
          <h2>Evaluation</h2>
          <div className="evaluation-metrics">
            <div className="metric">
              <span>Overall Rating</span>
              <span>{report.evaluation.rating}/5</span>
            </div>
            <div className="metric">
              <span>Technical Skills</span>
              <span>{report.evaluation.technicalSkills}/5</span>
            </div>
            <div className="metric">
              <span>Communication</span>
              <span>{report.evaluation.communicationSkills}/5</span>
            </div>
            <div className="metric">
              <span>Teamwork</span>
              <span>{report.evaluation.teamwork}/5</span>
            </div>
            <div className="metric">
              <span>Initiative</span>
              <span>{report.evaluation.initiative}/5</span>
            </div>
          </div>
          <p><strong>Comments:</strong> {report.evaluation.comments}</p>
        </section>

        <section className="report-body">
          <h2>Report Content</h2>
          <div className="content-section">
            <h3>Objectives</h3>
            <p>{report.reportContent.objectives}</p>
          </div>
          <div className="content-section">
            <h3>Tasks</h3>
            <ul>
              {report.reportContent.tasks.map((task, index) => (
                <li key={index}>{task}</li>
              ))}
            </ul>
          </div>
          <div className="content-section">
            <h3>Achievements</h3>
            <ul>
              {report.reportContent.achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </div>
          <div className="content-section">
            <h3>Challenges</h3>
            <p>{report.reportContent.challenges}</p>
          </div>
          <div className="content-section">
            <h3>Learning Outcomes</h3>
            <p>{report.reportContent.learningOutcomes}</p>
          </div>
        </section>

        {report.clarification && (
          <section className="clarification">
            <h2>Clarification</h2>
            <p>{report.clarification}</p>
          </section>
        )}

        <section className="add-clarification">
          <h2>Add Clarification</h2>
          <textarea
            value={clarification}
            onChange={(e) => setClarification(e.target.value)}
            placeholder="Enter clarification for flagging or rejection..."
          />
          <button onClick={handleAddClarification}>Submit Clarification</button>
        </section>
      </div>

      <div className="action-buttons">
        <button onClick={() => window.print()}>Download PDF</button>
        <button onClick={() => window.history.back()}>Back to Reports</button>
      </div>
    </div>
  );
};

export default ReportDetails; 