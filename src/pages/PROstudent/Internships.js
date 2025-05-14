import React, { useState, useEffect } from 'react';

const StudentInternships = () => {
  // Sample internship data with majors information
  const sampleInternships = [
    {
      id: 1,
      title: 'UX Design Intern',
      company: 'Google',
      location: 'Remote',
      startDate: '2025-06-01',
      endDate: '2025-08-31',
      status: 'current',
      description: 'Work on designing user interfaces for Google products.',
      requirements: 'Experience with Figma, UX principles',
      postedDate: '2025-03-15',
      majors: ['Graphic Design', 'Interactive Design', 'User Experience'],
      currentInterns: 3,
      totalPositions: 5
    },
    {
      id: 2,
      title: 'Software Engineering Intern',
      company: 'Microsoft',
      location: 'Redmond, WA',
      startDate: '2025-05-15',
      endDate: '2025-08-15',
      status: 'upcoming',
      description: 'Develop features for Windows applications.',
      requirements: 'C#, .NET experience preferred',
      postedDate: '2025-02-20',
      majors: ['Computer Science', 'Software Engineering', 'Information Technology'],
      currentInterns: 0,
      totalPositions: 8
    },
    {
      id: 3,
      title: 'Marketing Intern',
      company: 'Nike',
      location: 'Portland, OR',
      startDate: '2024-09-01',
      endDate: '2024-12-15',
      status: 'completed',
      description: 'Assist with digital marketing campaigns.',
      requirements: 'Marketing major preferred',
      postedDate: '2024-07-10',
      majors: ['Marketing', 'Business Administration', 'Advertising'],
      currentInterns: 4,
      totalPositions: 4
    },
    {
      id: 4,
      title: 'Graphic Design Intern',
      company: 'Apple',
      location: 'Cupertino, CA',
      startDate: '2025-06-15',
      endDate: '2025-09-15',
      status: 'current',
      description: 'Create marketing materials for Apple products.',
      requirements: 'Proficiency in Adobe Creative Suite',
      postedDate: '2025-03-01',
      majors: ['Graphic Design', 'Visual Communication', 'Digital Media'],
      currentInterns: 2,
      totalPositions: 3
    }
  ];

  // Sample majors data
  const allMajors = [
    'Graphic Design',
    'Interactive Design',
    'User Experience',
    'Computer Science',
    'Software Engineering',
    'Information Technology',
    'Marketing',
    'Business Administration',
    'Advertising',
    'Visual Communication',
    'Digital Media'
  ];

  const [internships, setInternships] = useState(sampleInternships);
  const [filters, setFilters] = useState({
    searchQuery: '',
    status: 'all',
    dateRange: 'all',
    major: '',
    semester: ''
  });
  const [appliedInternships, setAppliedInternships] = useState([]);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [applicationDocuments, setApplicationDocuments] = useState({
    resume: true,
    coverLetter: false,
    portfolio: false
  });

  // Filter internships based on search and filters
  const filteredInternships = internships.filter(internship => {
    // Search filter
    const matchesSearch = 
      internship.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      internship.company.toLowerCase().includes(filters.searchQuery.toLowerCase());
    
    // Status filter
    const matchesStatus = 
      filters.status === 'all' || 
      internship.status === filters.status;
    
    // Date filter
    const now = new Date();
    const startDate = new Date(internship.startDate);
    const matchesDate = 
      filters.dateRange === 'all' ||
      (filters.dateRange === 'past' && startDate < now) ||
      (filters.dateRange === 'upcoming' && startDate > now) ||
      (filters.dateRange === 'current' && startDate <= now && new Date(internship.endDate) >= now);
    
    // Major filter
    const matchesMajor = 
      !filters.major || 
      internship.majors.includes(filters.major);
    
    return matchesSearch && matchesStatus && matchesDate && matchesMajor;
  });

  const handleApplyClick = (internship) => {
    setSelectedInternship(internship);
    setShowApplicationModal(true);
  };

  const submitApplication = () => {
    if (!selectedInternship) return;
    
    setAppliedInternships([...appliedInternships, selectedInternship.id]);
    setShowApplicationModal(false);
    alert(`Application submitted successfully for ${selectedInternship.title} at ${selectedInternship.company}!`);
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'current': return 'Current';
      case 'upcoming': return 'Upcoming';
      case 'completed': return 'Completed';
      default: return '';
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="student-internships">
      <div className="page-header">
        <h1>Browse Internships</h1>
        <p>Find opportunities that match your major and career goals</p>
      </div>

      <div className="search-filters">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by job title or company name..."
            value={filters.searchQuery}
            onChange={(e) => setFilters({...filters, searchQuery: e.target.value})}
          />
        </div>

        <div className="filter-options">
          <div className="filter-group">
            <label>Status:</label>
            <select 
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
            >
              <option value="all">All Statuses</option>
              <option value="current">Current Internships</option>
              <option value="upcoming">Upcoming Internships</option>
              <option value="completed">Completed Internships</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Date Range:</label>
            <select 
              value={filters.dateRange}
              onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
            >
              <option value="all">All Dates</option>
              <option value="past">Past Internships</option>
              <option value="current">Current Internships</option>
              <option value="upcoming">Upcoming Internships</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Filter by Major:</label>
            <select
              value={filters.major}
              onChange={(e) => setFilters({...filters, major: e.target.value})}
            >
              <option value="">All Majors</option>
              {allMajors.map((major, index) => (
                <option key={index} value={major}>{major}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Semester:</label>
            <select
              value={filters.semester}
              onChange={(e) => setFilters({...filters, semester: e.target.value})}
            >
              <option value="">Any Semester</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
              <option value="3">Semester 3</option>
              <option value="4">Semester 4</option>
            </select>
          </div>
        </div>
      </div>

      <div className="internships-list">
        {filteredInternships.length === 0 ? (
          <div className="empty-state">
            <p>No internships found matching your criteria</p>
            <button onClick={() => setFilters({
              searchQuery: '',
              status: 'all',
              dateRange: 'all',
              major: '',
              semester: ''
            })}>
              Clear Filters
            </button>
          </div>
        ) : (
          filteredInternships.map((internship) => (
            <div key={internship.id} className="internship-card">
              <div className="internship-header">
                <h3>{internship.title}</h3>
                <div className="status-container">
                  <span className={`status ${internship.status}`}>
                    {getStatusLabel(internship.status)}
                  </span>
                  {internship.status === 'current' && (
                    <span className="positions">
                      {internship.currentInterns}/{internship.totalPositions} positions filled
                    </span>
                  )}
                </div>
              </div>

              <div className="company-info">
                <h4>{internship.company}</h4>
                <p>{internship.location}</p>
                <p className="date-range">
                  {formatDate(internship.startDate)} - {formatDate(internship.endDate)}
                </p>
              </div>

              <div className="internship-details">
                <h4>Description:</h4>
                <p>{internship.description}</p>
                
                <h4>Requirements:</h4>
                <p>{internship.requirements}</p>

                <h4>Relevant Majors:</h4>
                <div className="majors-list">
                  {internship.majors.map((major, index) => (
                    <span key={index} className="major-tag">{major}</span>
                  ))}
                </div>
              </div>

              <div className="internship-actions">
                {appliedInternships.includes(internship.id) ? (
                  <button className="applied-btn" disabled>Applied ✓</button>
                ) : (
                  <button 
                    className="apply-btn"
                    onClick={() => handleApplyClick(internship)}
                  >
                    Apply Now
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Application Modal */}
      {showApplicationModal && selectedInternship && (
        <div className="application-modal">
          <div className="modal-content">
            <h2>Apply for {selectedInternship.title}</h2>
            <p>at {selectedInternship.company}</p>
            
            <div className="application-form">
              <h3>Documents to Submit:</h3>
              <div className="document-options">
                <label>
                  <input 
                    type="checkbox" 
                    checked={applicationDocuments.resume}
                    onChange={() => setApplicationDocuments({
                      ...applicationDocuments,
                      resume: !applicationDocuments.resume
                    })}
                  />
                  Resume (required)
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={applicationDocuments.coverLetter}
                    onChange={() => setApplicationDocuments({
                      ...applicationDocuments,
                      coverLetter: !applicationDocuments.coverLetter
                    })}
                  />
                  Cover Letter
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={applicationDocuments.portfolio}
                    onChange={() => setApplicationDocuments({
                      ...applicationDocuments,
                      portfolio: !applicationDocuments.portfolio
                    })}
                  />
                  Portfolio
                </label>
              </div>

              <div className="modal-actions">
                <button 
                  className="cancel-btn"
                  onClick={() => setShowApplicationModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="submit-btn"
                  onClick={submitApplication}
                  disabled={!applicationDocuments.resume}
                >
                  Submit Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentInternships;