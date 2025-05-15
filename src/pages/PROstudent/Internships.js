import React, { useState, useEffect } from 'react';
import { useApplications } from '../../context/ApplicationsContext';
import '../../styles/Internships.css';

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

  const { addApplication } = useApplications();

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
    // Check if already applied
    if (appliedInternships.includes(internship.id)) {
      alert('You have already applied to this internship.');
      return;
    }
    
    // Check if internship is still open
    const now = new Date();
    const startDate = new Date(internship.startDate);
    if (startDate < now) {
      alert('This internship is no longer accepting applications.');
      return;
    }
    
    // Check if maximum positions are filled
    if (internship.currentInterns >= internship.totalPositions) {
      alert('All positions for this internship have been filled.');
      return;
    }
    
    setSelectedInternship(internship);
    setShowApplicationModal(true);
  };

  const submitApplication = () => {
    if (!selectedInternship) return;
    
    // Create a complete application object
    const newApplication = {
      id: Date.now(),
      position: selectedInternship.title,
      companyName: selectedInternship.company,
      location: selectedInternship.location,
      appliedDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      status: 'pending',
      documents: [
        { 
          name: 'Resume.pdf', 
          content: 'Resume content' 
        },
        ...(applicationDocuments.coverLetter ? [{
          name: 'Cover_Letter.pdf',
          content: 'Cover letter content'
        }] : []),
        ...(applicationDocuments.portfolio ? [{
          name: 'Portfolio.pdf',
          content: 'Portfolio content'
        }] : [])
      ]
    };
    
    // Add the application to the shared state
    addApplication(newApplication);
    
    setAppliedInternships([...appliedInternships, selectedInternship.id]);
    setShowApplicationModal(false);
    alert(`Application submitted successfully for ${selectedInternship.title} at ${selectedInternship.company}!`);
  };

  // Add function to handle application withdrawal
  const handleWithdrawApplication = (internshipId) => {
    if (window.confirm('Are you sure you want to withdraw your application?')) {
      setAppliedInternships(appliedInternships.filter(id => id !== internshipId));
      // You might want to add a call to your backend here to update the application status
      alert('Application withdrawn successfully.');
    }
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
    <div>
      <div>
        <h1>Browse Internships</h1>
        <p>Find opportunities that match your major and career goals</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by job title or company name..."
          value={filters.searchQuery}
          onChange={(e) => setFilters({...filters, searchQuery: e.target.value})}
          style={{ width: '300px' }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <select 
          value={filters.status}
          onChange={(e) => setFilters({...filters, status: e.target.value})}
        >
          <option value="all">All Statuses</option>
          <option value="current">Current Internships</option>
          <option value="upcoming">Upcoming Internships</option>
          <option value="completed">Completed Internships</option>
        </select>

        <select 
          value={filters.dateRange}
          onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
        >
          <option value="all">All Dates</option>
          <option value="past">Past Internships</option>
          <option value="current">Current Internships</option>
          <option value="upcoming">Upcoming Internships</option>
        </select>

        <select
          value={filters.major}
          onChange={(e) => setFilters({...filters, major: e.target.value})}
        >
          <option value="">All Majors</option>
          {allMajors.map((major, index) => (
            <option key={index} value={major}>{major}</option>
          ))}
        </select>

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

      <div>
        {filteredInternships.length === 0 ? (
          <div>
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
            <div key={internship.id}>
              <div>
                <div>
                  <h3>{internship.title}</h3>
                  <div>
                    <span>{getStatusLabel(internship.status)}</span>
                    {internship.status === 'current' && (
                      <span>
                        {internship.currentInterns}/{internship.totalPositions} positions filled
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <h4>{internship.company}</h4>
                  <p>{internship.location}</p>
                  <p>
                    {formatDate(internship.startDate)} - {formatDate(internship.endDate)}
                  </p>
                </div>

                <div>
                  <h4>Description:</h4>
                  <p>{internship.description}</p>
                  
                  <h4>Requirements:</h4>
                  <p>{internship.requirements}</p>

                  <h4>Relevant Majors:</h4>
                  <div>
                    {internship.majors.map((major, index) => (
                      <span key={index}>{major}</span>
                    ))}
                  </div>
                </div>

                <div>
                  {appliedInternships.includes(internship.id) ? (
                    <button 
                      onClick={() => handleWithdrawApplication(internship.id)}
                    >
                      Withdraw Application
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleApplyClick(internship)}
                      disabled={new Date(internship.startDate) < new Date() || internship.currentInterns >= internship.totalPositions}
                    >
                      {new Date(internship.startDate) < new Date() ? 'Applications Closed' :
                       internship.currentInterns >= internship.totalPositions ? 'Positions Filled' :
                       'Apply Now'}
                    </button>
                  )}
                </div>
              </div>

              {showApplicationModal && selectedInternship && selectedInternship.id === internship.id && (
                <div>
                  <div>
                    <h2>Apply for {internship.title}</h2>
                    <p>at {internship.company}</p>
                    
                    <div>
                      <h3>Documents to Submit:</h3>
                      <div>
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

                      <div>
                        <button 
                          onClick={() => setShowApplicationModal(false)}
                        >
                          Cancel
                        </button>
                        <button 
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
          ))
        )}
      </div>
    </div>
  );
};

export default StudentInternships;