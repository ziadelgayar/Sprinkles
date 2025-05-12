import React, { useState, useEffect } from 'react';
import { FaBuilding, FaEnvelope, FaGlobe, FaMapMarkerAlt, FaArrowLeft } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';

const CompanyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    // In a real application, this would be an API call
    const fetchCompanyDetails = () => {
      // Dummy data - replace with actual API call
      const dummyCompany = {
        id: parseInt(id),
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
      };
      setCompany(dummyCompany);
    };

    fetchCompanyDetails();
  }, [id]);

  if (!company) {
    return <div className="loading">Loading company details...</div>;
  }

  return (
    <div className="company-details-container">
      <button className="back-button" onClick={() => navigate('/scad/companies')}>
        <FaArrowLeft /> Back to Companies
      </button>

      <div className="company-header">
        <FaBuilding className="company-icon" />
        <h1>{company.name}</h1>
        <span className={`status-badge ${company.status}`}>{company.status}</span>
      </div>

      <div className="company-details-grid">
        <div className="company-info-section">
          <h2>Company Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <FaBuilding />
              <div>
                <h3>Industry</h3>
                <p>{company.industry}</p>
              </div>
            </div>
            <div className="info-item">
              <FaMapMarkerAlt />
              <div>
                <h3>Location</h3>
                <p>{company.location}</p>
              </div>
            </div>
            <div className="info-item">
              <FaEnvelope />
              <div>
                <h3>Contact</h3>
                <p>{company.contact}</p>
              </div>
            </div>
            <div className="info-item">
              <FaGlobe />
              <div>
                <h3>Website</h3>
                <p>{company.website}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="company-description">
          <h2>About Company</h2>
          <p>{company.description}</p>
        </div>

        <div className="company-specialties">
          <h2>Specialties</h2>
          <div className="specialties-list">
            {company.specialties.map((specialty, index) => (
              <span key={index} className="specialty-tag">{specialty}</span>
            ))}
          </div>
        </div>

        <div className="company-certifications">
          <h2>Certifications</h2>
          <div className="certifications-list">
            {company.certifications.map((cert, index) => (
              <span key={index} className="certification-tag">{cert}</span>
            ))}
          </div>
        </div>

        <div className="internship-positions">
          <h2>Available Internship Positions</h2>
          <div className="positions-grid">
            {company.internshipPositions.map((position, index) => (
              <div key={index} className="position-card">
                <h3>{position.title}</h3>
                <p><strong>Department:</strong> {position.department}</p>
                <p><strong>Duration:</strong> {position.duration}</p>
                <div className="requirements">
                  <h4>Requirements:</h4>
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
    </div>
  );
};

export default CompanyDetails; 