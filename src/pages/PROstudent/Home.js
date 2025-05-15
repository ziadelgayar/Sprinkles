import React, { useState } from 'react';

const mockSuggestedCompanies = [
  {
    name: "TechCorp",
    industry: "tech",
    recommended: true,
    roles: ["Frontend Developer", "Backend Intern"],
    duration: "summer",
    type: "paid"
  },
  {
    name: "Designify",
    industry: "design",
    recommended: false,
    roles: ["UI/UX Designer", "Graphic Design Intern"],
    duration: "semester",
    type: "unpaid"
  },
  {
    name: "BizPro",
    industry: "business",
    recommended: true,
    roles: ["Business Analyst", "Marketing Intern"],
    duration: "semester",
    type: "paid"
  },
  {
    name: "NeuroNet",
    industry: "tech",
    recommended: true,
    roles: ["AI Intern", "ML Engineer Intern"],
    duration: "year",
    type: "paid"
  },
  {
    name: "PixelWave",
    industry: "design",
    recommended: false,
    roles: ["Motion Graphics Intern", "Product Designer"],
    duration: "summer",
    type: "unpaid"
  },
  {
    name: "GreenSolutions",
    industry: "business",
    recommended: true,
    roles: ["Sustainability Analyst", "Project Coordinator"],
    duration: "year",
    type: "paid"
  }
];

const StudentHome = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    industry: '',
    duration: '',
    type: ''
  });

  const filteredCompanies = mockSuggestedCompanies.filter(company => {
    const matchesIndustry = !filters.industry || company.industry === filters.industry;
    const matchesDuration = !filters.duration || company.duration === filters.duration;
    const matchesType = !filters.type || company.type === filters.type;
    const matchesSearch =
      !searchQuery ||
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.roles.some(role => role.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesIndustry && matchesDuration && matchesType && matchesSearch;
  });

  const handleApply = (companyName, role) => {
    alert(`You have chosen to apply for "${role}" at ${companyName}`);
  };

  return (
    <div className="student-home" style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      {/* Internship Badge */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(90deg, #4CAF50, #81C784)',
        padding: '1rem 1.5rem',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        color: 'white',
        marginBottom: '2rem'
      }}>
        <span style={{ fontSize: '2rem', marginRight: '12px' }}>🏅</span>
        <div>
          <h2 style={{ margin: 0 }}>Internship Badge Earned!</h2>
          <p style={{ margin: 0, fontSize: "0.95rem" }}>You've successfully completed a 3-month internship. Great job!</p>
        </div>
      </div>

      {/* Search Section */}
      <div className="search-section">
        <h1>Find Your Perfect Internship</h1>
        <input
          type="text"
          placeholder="Search internships by title or company..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: "0.5rem", width: "300px", marginRight: "10px", borderRadius: "6px" }}
        />
        <div className="quick-filters" style={{ marginTop: "1rem" }}>
          <select value={filters.industry} onChange={(e) => setFilters({ ...filters, industry: e.target.value })}>
            <option value="">All Industries</option>
            <option value="tech">Technology</option>
            <option value="design">Design</option>
            <option value="business">Business</option>
          </select>
          <select value={filters.duration} onChange={(e) => setFilters({ ...filters, duration: e.target.value })}>
            <option value="">All Durations</option>
            <option value="summer">Summer</option>
            <option value="semester">Semester</option>
            <option value="year">Year-round</option>
          </select>
          <select value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
            <option value="">All Types</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>
      </div>

      {/* Suggested Companies */}
      <div className="suggested-companies">
        <h2>Suggested Companies</h2>
        <div className="companies-grid">
          {filteredCompanies.map((company) => (
            <div key={company.name} className="company-card">
              <h3>{company.name}</h3>
              <p>Industry: {company.industry}</p>
              <p>Duration: {company.duration}</p>
              <p>Type: {company.type}</p>
              <div className="roles">
                {company.roles.map((role) => (
                  <button
                    key={role}
                    onClick={() => handleApply(company.name, role)}
                  >
                    Apply for {role}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Companies That Viewed Profile */}
      <div className="profile-views" style={{ marginTop: "3rem" }}>
        <h2>Companies That Viewed Your Profile</h2>
        <div className="viewed-companies-list">
          {[
            { name: "TechCorp", date: "2 days ago", position: "Frontend Developer" },
            { name: "Designify", date: "1 week ago", position: "UI/UX Designer" },
            { name: "BizPro", date: "2 weeks ago", position: "Business Analyst" }
          ].map((company) => (
            <div key={company.name} className="viewed-company-card" style={{
              padding: "1rem",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              marginBottom: "1rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <div>
                <h3 style={{ margin: "0 0 0.5rem 0" }}>{company.name}</h3>
                <p style={{ margin: "0", color: "#666" }}>Viewed for: {company.position}</p>
              </div>
              <span style={{ color: "#888" }}>{company.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Internship Video */}
      <div className="internship-video" style={{ marginTop: "3rem" }}>
        <h2>What Counts as an Internship?</h2>
        <p>Watch this short video to understand which internships are eligible for your major.</p>
        <video width="480" controls>
          <source src="/videos/internship-guidelines.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default StudentHome;
