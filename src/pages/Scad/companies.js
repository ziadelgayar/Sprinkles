import React, { useState } from 'react';

const Companies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [expandedCompany, setExpandedCompany] = useState(null);
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: 'Tech Solutions Inc.',
      industry: 'Technology',
      status: 'pending',
      description: 'Leading technology solutions provider specializing in innovative software solutions and digital transformation services.',
      contact: 'hr@techsolutions.com',
      location: 'Dubai, UAE',
      website: 'www.techsolutions.com',
      founded: '2015',
      employees: '100-500',
      specialties: ['Software Development', 'Cloud Solutions', 'Digital Transformation'],
      certifications: ['ISO 9001', 'ISO 27001'],
      internshipPositions: [
        {
          title: 'Software Development Intern',
          department: 'Engineering',
          duration: '3 months',
          requirements: ['Computer Science degree', 'Programming skills']
        },
        {
          title: 'Business Analyst Intern',
          department: 'Product Management',
          duration: '3 months',
          requirements: ['Business degree', 'Analytical skills']
        }
      ]
    },
    {
      id: 2,
      name: 'Global Consulting',
      industry: 'Consulting',
      status: 'pending',
      description: 'International business consulting firm providing strategic solutions.',
      contact: 'careers@globalconsulting.com',
      location: 'Abu Dhabi, UAE',
      website: 'www.globalconsulting.com',
      founded: '2010',
      employees: '50-200',
      specialties: ['Business Strategy', 'Management Consulting', 'Digital Transformation'],
      certifications: ['ISO 9001'],
      internshipPositions: [
        {
          title: 'Consulting Intern',
          department: 'Strategy',
          duration: '3 months',
          requirements: ['Business degree', 'Analytical skills']
        }
      ]
    }
  ]);

  const industries = ['all', 'Technology', 'Consulting', 'Research', 'Healthcare', 'Finance', 'Education'];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleIndustryChange = (e) => {
    setSelectedIndustry(e.target.value);
  };

  const handleStatusChange = (companyId, newStatus) => {
    setCompanies(companies.map(company => 
      company.id === companyId ? { ...company, status: newStatus } : company
    ));
  };

  const toggleCompanyDetails = (companyId) => {
    setExpandedCompany(expandedCompany === companyId ? null : companyId);
  };

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === 'all' || company.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="main-content" style={{ 
      padding: '20px',
      backgroundColor: '#1A202C',
      minHeight: '100vh',
      color: '#E2E8F0'
    }}>
      <div className="page-header" style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#E2E8F0', fontSize: '24px', marginBottom: '8px' }}>Companies Management</h1>
        <p style={{ color: '#A0AEC0' }}>Manage and review companies applying to the SCAD system</p>
      </div>

      <div className="search-filters">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search companies..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div className="filter-section">
          <span className="filter-icon">⚡</span>
          <select value={selectedIndustry} onChange={handleIndustryChange}>
            {industries.map(industry => (
              <option key={industry} value={industry}>
                {industry.charAt(0).toUpperCase() + industry.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="companies-grid">
        {filteredCompanies.map(company => (
          <div key={company.id} className="company-card">
            <div className="company-header">
              <span className="company-icon">🏢</span>
              <h3>{company.name}</h3>
              <span className={`status-badge ${company.status}`}>{company.status}</span>
            </div>
            
            <div className="company-info">
              <p><strong>Industry:</strong> {company.industry}</p>
              <p><strong>Location:</strong> {company.location}</p>
            </div>

            <div className="company-actions">
              <button 
                className="accept-btn"
                onClick={() => handleStatusChange(company.id, 'accepted')}
                disabled={company.status === 'accepted'}
              >
                ✓ Accept
              </button>
              <button 
                className="reject-btn"
                onClick={() => handleStatusChange(company.id, 'rejected')}
                disabled={company.status === 'rejected'}
              >
                ✕ Reject
              </button>
              <button 
                className="view-details-btn"
                onClick={() => toggleCompanyDetails(company.id)}
              >
                {expandedCompany === company.id ? '▼' : '▶'} {expandedCompany === company.id ? 'Hide Details' : 'View Details'}
              </button>
            </div>

            {expandedCompany === company.id && (
              <div className="company-details">
                <div className="details-section">
                  <h4>About Company</h4>
                  <p>{company.description}</p>
                </div>

                <div className="details-section">
                  <h4>Contact Information</h4>
                  <div className="contact-info">
                    <div className="info-item">
                      <span>✉</span>
                      <p>{company.contact}</p>
                    </div>
                    <div className="info-item">
                      <span>🌐</span>
                      <p>{company.website}</p>
                    </div>
                    <div className="info-item">
                      <span>📍</span>
                      <p>{company.location}</p>
                    </div>
                  </div>
                </div>

                <div className="details-section">
                  <h4>Specialties</h4>
                  <div className="specialties-list">
                    {company.specialties.map((specialty, index) => (
                      <span key={index} className="specialty-tag">{specialty}</span>
                    ))}
                  </div>
                </div>

                <div className="details-section">
                  <h4>Certifications</h4>
                  <div className="certifications-list">
                    {company.certifications.map((cert, index) => (
                      <span key={index} className="certification-tag">{cert}</span>
                    ))}
                  </div>
                </div>

                <div className="details-section">
                  <h4>Available Internship Positions</h4>
                  <div className="positions-grid">
                    {company.internshipPositions.map((position, index) => (
                      <div key={index} className="position-card">
                        <h5>{position.title}</h5>
                        <p><strong>Department:</strong> {position.department}</p>
                        <p><strong>Duration:</strong> {position.duration}</p>
                        <div className="requirements">
                          <h6>Requirements:</h6>
                          <ul>
                            {position.requirements.map((req, idx) => (
                              <li key={idx}>{req}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Companies;
