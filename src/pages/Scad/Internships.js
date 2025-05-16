import React, { useState, useEffect } from 'react';
import '../../styles/App.css';

const Internships = () => {
  const [internships, setInternships] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    jobTitle: '',
    companyName: '',
    industry: '',
    duration: '',
    paid: '',
  });
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const mockInternships = [
      {
        id: 1,
        companyName: 'Tech Corp',
        jobTitle: 'Software Engineering Intern',
        industry: 'Technology',
        duration: '3-6 months',
        paid: true,
        startDate: '2024-06-01',
        endDate: '2024-08-31',
        description: 'Work on cutting-edge projects...',
        requirements: 'Python, React, Node.js',
        location: 'Remote',
      },
      {
        id: 2,
        companyName: 'Finance Co',
        jobTitle: 'Data Science Intern',
        industry: 'Finance',
        duration: '1 year',
        paid: false,
        startDate: '2024-07-01',
        endDate: '2025-06-30',
        description: 'Analyze financial data...',
        requirements: 'R, SQL, Excel',
        location: 'Onsite',
      },
    ];
    setInternships(mockInternships);
  }, []);

  const handleSearch = (event) => setSearchTerm(event.target.value);

  const handleFilterChange = (event) => {
    setFilters({...filters, [event.target.name]: event.target.value});
  };

  const handleDelete = (id) => {
    setInternships(internships.filter(internship => internship.id !== id));
  };

  const handleViewDetails = (internship) => {
    setSelectedInternship(internship);
    setShowModal(true);
  };

  const filteredInternships = internships.filter((internship) => {
    const matchesSearch = 
      internship.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilters = 
      (!filters.jobTitle || internship.jobTitle === filters.jobTitle) &&
      (!filters.companyName || internship.companyName === filters.companyName) &&
      (!filters.industry || internship.industry === filters.industry) &&
      (!filters.duration || internship.duration === filters.duration) &&
      (!filters.paid || internship.paid === (filters.paid === 'true'));

    // Filter by date range if specified
    const startCheck = !startDate || new Date(internship.startDate) >= new Date(startDate);
    const endCheck = !endDate || new Date(internship.endDate) <= new Date(endDate);

    return matchesSearch && matchesFilters && startCheck && endCheck;
  });

  return (
    <div className="main-content internships-page">
      <h1>Internships</h1>

      {/* Search and Filters */}
      <div className="filters-section">
        <input
          type="text"
          placeholder="Search by company or job title"
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />

        <div className="filters-grid">
          <select name="jobTitle" value={filters.jobTitle} onChange={handleFilterChange}>
            <option value="">All Job Titles</option>
            <option value="Software Engineering Intern">Software Engineering Intern</option>
            <option value="Data Science Intern">Data Science Intern</option>
          </select>

          <select name="industry" value={filters.industry} onChange={handleFilterChange}>
            <option value="">All Industries</option>
            <option value="Technology">Technology</option>
            <option value="Finance">Finance</option>
          </select>

          <select name="duration" value={filters.duration} onChange={handleFilterChange}>
            <option value="">All Durations</option>
            <option value="3-6 months">3-6 months</option>
            <option value="1 year">1 year</option>
          </select>

          <select name="paid" value={filters.paid} onChange={handleFilterChange}>
            <option value="">All Types</option>
            <option value="true">Paid</option>
            <option value="false">Unpaid</option>
          </select>
        </div>

        <div className="date-range">
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            aria-label="Start Date"
          />
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            aria-label="End Date"
          />
        </div>
      </div>

      {/* Internships Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Job Title</th>
              <th>Industry</th>
              <th>Duration</th>
              <th>Paid</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInternships.length > 0 ? (
              filteredInternships.map(internship => (
                <tr key={internship.id}>
                  <td>{internship.companyName}</td>
                  <td>{internship.jobTitle}</td>
                  <td>{internship.industry}</td>
                  <td>{internship.duration}</td>
                  <td>{internship.paid ? 'Yes' : 'No'}</td>
                  <td>
                    <button className="view-btn" onClick={() => handleViewDetails(internship)}>View</button>
                    <button className="delete-btn" onClick={() => handleDelete(internship.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6" style={{ textAlign: 'center' }}>No internships found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Internship Details Modal */}
      {showModal && selectedInternship && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>{selectedInternship.jobTitle}</h2>
            <h3>{selectedInternship.companyName}</h3>
            <div className="modal-details">
              <p><strong>Industry:</strong> {selectedInternship.industry}</p>
              <p><strong>Duration:</strong> {selectedInternship.duration}</p>
              <p><strong>Paid:</strong> {selectedInternship.paid ? 'Yes' : 'No'}</p>
              <p><strong>Start Date:</strong> {selectedInternship.startDate}</p>
              <p><strong>End Date:</strong> {selectedInternship.endDate}</p>
              <p><strong>Description:</strong></p>
              <p>{selectedInternship.description}</p>
              <p><strong>Requirements:</strong></p>
              <p>{selectedInternship.requirements}</p>
              <p><strong>Location:</strong> {selectedInternship.location}</p>
            </div>
            <button className="close-btn" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Internships;
