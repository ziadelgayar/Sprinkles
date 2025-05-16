import React, { useState } from 'react';

const Students = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'Laila Hassan',
      email: 'laila.hassan@example.com',
      major: 'Computer Science',
      gpa: 3.8,
      status: 'Active',
      internshipStatus: 'Pending',
      phone: '01123456789',
    },
    {
      id: 2,
      name: 'Omar Youssef',
      email: 'omar.youssef@example.com',
      major: 'Software Engineering',
      gpa: 3.9,
      status: 'Active',
      internshipStatus: 'Accepted',
      phone: '01012345678',
    },
    {
      id: 3,
      name: 'Sarah Ibrahim',
      email: 'sarah.ibrahim@example.com',
      major: 'Information Systems',
      gpa: 3.7,
      status: 'Active',
      internshipStatus: 'Accepted',
      phone: '01234567891',
    },
  ]);

  const [filters, setFilters] = useState({
    major: '',
    status: '',
    internshipStatus: '',
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [expandedStudentId, setExpandedStudentId] = useState(null);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (studentId, newStatus) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === studentId
          ? { ...student, status: newStatus }
          : student
      )
    );
  };

  const handleInternshipStatusChange = (studentId, newStatus) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === studentId
          ? { ...student, internshipStatus: newStatus }
          : student
      )
    );
  };

  const toggleDetails = (id) => {
    setExpandedStudentId(expandedStudentId === id ? null : id);
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMajor = !filters.major || student.major === filters.major;
    const matchesStatus = !filters.status || student.status === filters.status;
    const matchesInternshipStatus = !filters.internshipStatus || student.internshipStatus === filters.internshipStatus;
    
    return matchesSearch && matchesMajor && matchesStatus && matchesInternshipStatus;
  });

  return (
    <div className="main-content" style={{ padding: '20px', backgroundColor: '#1A202C', minHeight: '100vh' }}>
      <div className="page-header" style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#E2E8F0', fontSize: '24px', marginBottom: '8px' }}>Manage Students</h1>
        <p style={{ color: '#A0AEC0' }}>View and manage student information and internship status</p>
      </div>

      <div className="filters-section" style={{ marginBottom: '30px' }}>
        <div className="search-bar" style={{ marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={handleSearch}
            style={{
              padding: '12px 16px',
              width: '100%',
              maxWidth: '300px',
              borderRadius: '8px',
              border: '1px solid #2D3748',
              backgroundColor: '#2D3748',
              color: '#E2E8F0',
              fontSize: '14px'
            }}
          />
        </div>

        <div className="filters" style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <select
            name="major"
            value={filters.major}
            onChange={handleFilterChange}
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid #2D3748',
              backgroundColor: '#2D3748',
              color: '#E2E8F0',
              fontSize: '14px',
              minWidth: '200px'
            }}
          >
            <option value="">All Majors</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Software Engineering">Software Engineering</option>
            <option value="Information Systems">Information Systems</option>
          </select>

          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid #2D3748',
              backgroundColor: '#2D3748',
              color: '#E2E8F0',
              fontSize: '14px',
              minWidth: '200px'
            }}
          >
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Suspended">Suspended</option>
          </select>

          <select
            name="internshipStatus"
            value={filters.internshipStatus}
            onChange={handleFilterChange}
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid #2D3748',
              backgroundColor: '#2D3748',
              color: '#E2E8F0',
              fontSize: '14px',
              minWidth: '200px'
            }}
          >
            <option value="">All Internship Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="students-list">
        {filteredStudents.length === 0 ? (
          <p style={{ color: '#A0AEC0', textAlign: 'center', padding: '40px' }}>No students found matching the criteria.</p>
        ) : (
          filteredStudents.map(student => (
            <div
              key={student.id}
              className="student-card"
              style={{
                backgroundColor: '#2D3748',
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '20px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                border: '1px solid #4A5568'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: '0 0 12px 0', color: '#E2E8F0', fontSize: '18px' }}>{student.name}</h3>
                  <p style={{ margin: '8px 0', color: '#A0AEC0' }}><strong style={{ color: '#E2E8F0' }}>Major:</strong> {student.major}</p>
                  <p style={{ margin: '8px 0', color: '#A0AEC0' }}><strong style={{ color: '#E2E8F0' }}>GPA:</strong> {student.gpa}</p>
                  <p style={{ margin: '8px 0' }}>
                    <strong style={{ color: '#E2E8F0' }}>Status:</strong>{' '}
                    <span
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        backgroundColor:
                          student.status === 'Active'
                            ? '#48BB78'
                            : student.status === 'Suspended'
                            ? '#F56565'
                            : '#ED8936',
                        color: '#fff',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}
                    >
                      {student.status}
                    </span>
                  </p>
                  <p style={{ margin: '8px 0' }}>
                    <strong style={{ color: '#E2E8F0' }}>Internship:</strong>{' '}
                    <span
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        backgroundColor:
                          student.internshipStatus === 'Accepted'
                            ? '#48BB78'
                            : student.internshipStatus === 'Rejected'
                            ? '#F56565'
                            : '#ED8936',
                        color: '#fff',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}
                    >
                      {student.internshipStatus}
                    </span>
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => toggleDetails(student.id)}
                    style={{
                      padding: '10px 20px',
                      borderRadius: '8px',
                      border: 'none',
                      background: 'linear-gradient(135deg, #4FD1C5 0%, #38B2AC 100%)',
                      color: '#fff',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                    onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                  >
                    {expandedStudentId === student.id ? 'Hide Details' : 'View Details'}
                  </button>
                </div>
              </div>

              {expandedStudentId === student.id && (
                <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #4A5568' }}>
                  <p style={{ color: '#A0AEC0', margin: '8px 0' }}><strong style={{ color: '#E2E8F0' }}>Email:</strong> {student.email}</p>
                  <p style={{ color: '#A0AEC0', margin: '8px 0' }}><strong style={{ color: '#E2E8F0' }}>Phone:</strong> {student.phone}</p>

                  <div style={{ marginTop: '20px' }}>
                    <h4 style={{ color: '#E2E8F0', marginBottom: '12px' }}>Update Status</h4>
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => handleStatusChange(student.id, 'Active')}
                        disabled={student.status === 'Active'}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '8px',
                          border: 'none',
                          background: student.status === 'Active' ? '#4A5568' : 'linear-gradient(135deg, #48BB78 0%, #38A169 100%)',
                          color: '#fff',
                          cursor: student.status === 'Active' ? 'not-allowed' : 'pointer',
                          fontSize: '14px',
                          fontWeight: '500',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseOver={(e) => !student.status === 'Active' && (e.target.style.transform = 'translateY(-2px)')}
                        onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                      >
                        Set Active
                      </button>
                      <button
                        onClick={() => handleStatusChange(student.id, 'Inactive')}
                        disabled={student.status === 'Inactive'}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '8px',
                          border: 'none',
                          background: student.status === 'Inactive' ? '#4A5568' : 'linear-gradient(135deg, #ED8936 0%, #DD6B20 100%)',
                          color: '#fff',
                          cursor: student.status === 'Inactive' ? 'not-allowed' : 'pointer',
                          fontSize: '14px',
                          fontWeight: '500',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseOver={(e) => !student.status === 'Inactive' && (e.target.style.transform = 'translateY(-2px)')}
                        onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                      >
                        Set Inactive
                      </button>
                      <button
                        onClick={() => handleStatusChange(student.id, 'Suspended')}
                        disabled={student.status === 'Suspended'}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '8px',
                          border: 'none',
                          background: student.status === 'Suspended' ? '#4A5568' : 'linear-gradient(135deg, #F56565 0%, #E53E3E 100%)',
                          color: '#fff',
                          cursor: student.status === 'Suspended' ? 'not-allowed' : 'pointer',
                          fontSize: '14px',
                          fontWeight: '500',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseOver={(e) => !student.status === 'Suspended' && (e.target.style.transform = 'translateY(-2px)')}
                        onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                      >
                        Suspend
                      </button>
                    </div>

                    <h4 style={{ color: '#E2E8F0', marginBottom: '12px' }}>Update Internship Status</h4>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => handleInternshipStatusChange(student.id, 'Accepted')}
                        disabled={student.internshipStatus === 'Accepted'}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '8px',
                          border: 'none',
                          background: student.internshipStatus === 'Accepted' ? '#4A5568' : 'linear-gradient(135deg, #48BB78 0%, #38A169 100%)',
                          color: '#fff',
                          cursor: student.internshipStatus === 'Accepted' ? 'not-allowed' : 'pointer',
                          fontSize: '14px',
                          fontWeight: '500',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseOver={(e) => !student.internshipStatus === 'Accepted' && (e.target.style.transform = 'translateY(-2px)')}
                        onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                      >
                        Accept Internship
                      </button>
                      <button
                        onClick={() => handleInternshipStatusChange(student.id, 'Rejected')}
                        disabled={student.internshipStatus === 'Rejected'}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '8px',
                          border: 'none',
                          background: student.internshipStatus === 'Rejected' ? '#4A5568' : 'linear-gradient(135deg, #F56565 0%, #E53E3E 100%)',
                          color: '#fff',
                          cursor: student.internshipStatus === 'Rejected' ? 'not-allowed' : 'pointer',
                          fontSize: '14px',
                          fontWeight: '500',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseOver={(e) => !student.internshipStatus === 'Rejected' && (e.target.style.transform = 'translateY(-2px)')}
                        onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                      >
                        Reject Internship
                      </button>
                      <button
                        onClick={() => handleInternshipStatusChange(student.id, 'Pending')}
                        disabled={student.internshipStatus === 'Pending'}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '8px',
                          border: 'none',
                          background: student.internshipStatus === 'Pending' ? '#4A5568' : 'linear-gradient(135deg, #ED8936 0%, #DD6B20 100%)',
                          color: '#fff',
                          cursor: student.internshipStatus === 'Pending' ? 'not-allowed' : 'pointer',
                          fontSize: '14px',
                          fontWeight: '500',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseOver={(e) => !student.internshipStatus === 'Pending' && (e.target.style.transform = 'translateY(-2px)')}
                        onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                      >
                        Set Pending
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Students; 