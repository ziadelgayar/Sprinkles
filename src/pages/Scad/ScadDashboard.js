import React, { useState } from 'react';

const Dashboard = () => {
  const [selectedCycle, setSelectedCycle] = useState('Cycle 1');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [expandedStudentId, setExpandedStudentId] = useState(null);
  const [clarifications, setClarifications] = useState({});
  const [savingStatus, setSavingStatus] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const studentsCycle1 = [
    {
      id: 1,
      name: 'Laila Hassan',
      email: 'laila.hassan@example.com',
      major: 'Computer Science',
      internshipCompany: 'InnovateX',
      internshipStatus: 'Pending',
      reportSubmitted: true,
      phone: '01123456789',
    },
    {
      id: 2,
      name: 'Omar Youssef',
      email: 'omar.youssef@example.com',
      major: 'Software Engineering',
      internshipCompany: 'TechVision',
      internshipStatus: 'Accepted',
      reportSubmitted: false,
      phone: '01012345678',
    },
  ];

  const studentsCycle2 = [
    {
      id: 3,
      name: 'Sarah Ibrahim',
      email: 'sarah.ibrahim@example.com',
      major: 'Information Systems',
      internshipCompany: 'DataCore',
      internshipStatus: 'Accepted',
      reportSubmitted: true,
      phone: '01234567891',
    },
    {
      id: 4,
      name: 'Ahmed Farid',
      email: 'ahmed.farid@example.com',
      major: 'Computer Engineering',
      internshipCompany: 'SoftSolutions',
      internshipStatus: 'Rejected',
      reportSubmitted: false,
      phone: '01598765432',
    },
  ];

  const students = selectedCycle === 'Cycle 1' ? studentsCycle1 : studentsCycle2;

  const filteredStudents = students.filter(student =>
    selectedStatus === 'All' || student.internshipStatus === selectedStatus
  );

  const handleCycleChange = (e) => setSelectedCycle(e.target.value);
  const handleStatusChange = (e) => setSelectedStatus(e.target.value);
  const toggleDetails = (id) =>
    setExpandedStudentId(expandedStudentId === id ? null : id);

  const handleClarificationChange = (studentId, text) => {
    setClarifications(prev => ({ ...prev, [studentId]: text }));
  };

  const handleSubmitClarification = (studentId) => {
    const text = clarifications[studentId] || '';
    if (!text.trim()) {
      alert('Please enter a clarification before submitting.');
      return;
    }
    setSavingStatus(true);
    setConfirmationMessage('');
    setTimeout(() => {
      setSavingStatus(false);
      setConfirmationMessage(`Clarification for student ${studentId} submitted successfully.`);
      // Clear the input after submission
      setClarifications(prev => ({ ...prev, [studentId]: '' }));
    }, 1500);
  };

  return (
    <div className="main-content" style={{ 
      padding: '20px',
      backgroundColor: '#1A202C',
      minHeight: '100vh',
      color: '#E2E8F0'
    }}>
      <div className="page-header" style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#E2E8F0', fontSize: '24px', marginBottom: '8px' }}>Student Internship Dashboard</h1>
        <p style={{ color: '#A0AEC0' }}>View and manage student internship information</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="cycle-select" style={{ marginRight: '10px', fontWeight: 'bold' }}>
          Internship Cycle:
        </label>
        <select
          id="cycle-select"
          value={selectedCycle}
          onChange={handleCycleChange}
          style={{ padding: '6px', borderRadius: '4px', fontSize: '16px' }}
        >
          <option value="Cycle 1">Cycle 1</option>
          <option value="Cycle 2">Cycle 2</option>
        </select>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <label htmlFor="status-filter" style={{ marginRight: '10px', fontWeight: 'bold' }}>
          Filter by Internship Status:
        </label>
        <select
          id="status-filter"
          value={selectedStatus}
          onChange={handleStatusChange}
          style={{ padding: '6px', borderRadius: '4px', fontSize: '16px' }}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {filteredStudents.length === 0 ? (
        <p style={{ color: '#ddd' }}>No students found for the selected criteria.</p>
      ) : (
        filteredStudents.map((student) => (
          <div
            key={student.id}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              padding: '20px',
              borderRadius: '12px',
              marginBottom: '20px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <h2 style={{ marginBottom: '10px' }}>{student.name}</h2>
                <p style={{ margin: '4px 0' }}>
                  <strong>Major:</strong> {student.major}
                </p>
                <p style={{ margin: '4px 0' }}>
                  <strong>Company:</strong> {student.internshipCompany}
                </p>
                <p style={{ margin: '4px 0' }}>
                  <strong>Status:</strong>{' '}
                  <span
                    style={{
                      marginLeft: '8px',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      backgroundColor:
                        student.internshipStatus === 'Accepted'
                          ? '#4CAF50'
                          : student.internshipStatus === 'Rejected'
                          ? '#F44336'
                          : '#FF9800',
                      color: '#fff',
                      fontWeight: 'bold',
                      fontSize: '14px',
                    }}
                  >
                    {student.internshipStatus}
                  </span>
                </p>
              </div>
              <button
                onClick={() => toggleDetails(student.id)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: '#2196F3',
                  color: '#fff',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                {expandedStudentId === student.id ? '▲ Hide Details' : '▼ View Details'}
              </button>
            </div>

            {expandedStudentId === student.id && (
              <div
                style={{ marginTop: '20px', borderTop: '1px solid #555', paddingTop: '15px' }}
              >
                <p>
                  <strong>Email:</strong> {student.email}
                </p>
                <p>
                  <strong>Phone:</strong> {student.phone}
                </p>
                <p>
                  <strong>Report Submitted:</strong>{' '}
                  <span
                    style={{
                      fontWeight: 'bold',
                      color: student.reportSubmitted ? '#4CAF50' : '#F44336',
                    }}
                  >
                    {student.reportSubmitted ? 'Yes' : 'No'}
                  </span>
                </p>

                {/* Clarification input only for Rejected or Flagged students */}
                {(student.internshipStatus === 'Rejected' || student.internshipStatus === 'Flagged') && (
                  <div style={{ marginTop: '20px' }}>
                    <label
                      htmlFor={`clarification-${student.id}`}
                      style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}
                    >
                      Submit a clarification for why the internship report was flagged or rejected:
                    </label>
                    <textarea
                      id={`clarification-${student.id}`}
                      rows={4}
                      value={clarifications[student.id] || ''}
                      onChange={(e) => handleClarificationChange(student.id, e.target.value)}
                      style={{
                        width: '100%',
                        borderRadius: '8px',
                        padding: '10px',
                        fontSize: '14px',
                        resize: 'vertical',
                        borderColor: '#ccc',
                      }}
                      disabled={savingStatus}
                    />
                    <button
                      onClick={() => handleSubmitClarification(student.id)}
                      disabled={savingStatus}
                      style={{
                        marginTop: '10px',
                        padding: '10px 20px',
                        borderRadius: '6px',
                        backgroundColor: savingStatus ? '#888' : '#2196F3',
                        color: '#fff',
                        border: 'none',
                        cursor: savingStatus ? 'not-allowed' : 'pointer',
                        fontWeight: 'bold',
                      }}
                    >
                      {savingStatus ? 'Submitting...' : 'Submit'}
                    </button>
                    {confirmationMessage && (
                      <p style={{ color: 'lightgreen', marginTop: '10px' }}>
                        {confirmationMessage}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;
