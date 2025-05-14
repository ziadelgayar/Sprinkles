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
    <div className="student-home" style={{ padding: "2rem" }}>
      <div className="search-section">
        <h1>Find Your Perfect Internship</h1>
        <input
          type="text"
          placeholder="Search internships by title or company..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: "0.5rem", width: "300px", marginRight: "10px" }}
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

      <div className="suggested-companies" style={{ marginTop: "2rem" }}>
        <h2>Suggested Companies</h2>
        {filteredCompanies.length > 0 ? (
          filteredCompanies.map((company, index) => (
            <div key={index} className="company-card" style={{ border: "1px solid #ccc", margin: "1rem 0", padding: "1rem" }}>
              <h3>{company.name}</h3>
              <p>Industry: {company.industry}</p>
              <p>Duration: {company.duration}</p>
              <p>Type: {company.type}</p>
              <p style={{ color: company.recommended ? 'green' : 'gray' }}>
                {company.recommended ? '★ Recommended by past interns' : '☆ Not recommended by past interns'}
              </p>
              <ul>
                {company.roles.map((role, idx) => (
                  <li key={idx}>
                    <strong>{role}</strong><br />
                    <button onClick={() => handleApply(company.name, role)} style={{ marginTop: "5px" }}>
                      Choose to apply
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>No companies match your filters and interests.</p>
        )}
      </div>

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
