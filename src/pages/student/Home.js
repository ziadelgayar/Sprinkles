import React, { useState } from 'react';

const mockSuggestedCompanies = [
  {
    name: "TechCorp",
    industry: "tech",
    recommended: true,
    roles: ["Frontend Developer", "Backend Intern"]
  },
  {
    name: "Designify",
    industry: "design",
    recommended: false,
    roles: ["UI/UX Designer", "Graphic Design Intern"]
  },
  {
    name: "BizPro",
    industry: "business",
    recommended: true,
    roles: ["Business Analyst", "Marketing Intern"]
  },
  {
    name: "CodeCrafters",
    industry: "tech",
    recommended: false,
    roles: ["Software Engineer Intern", "DevOps Trainee"]
  },
  {
    name: "GreenSolutions",
    industry: "business",
    recommended: true,
    roles: ["Sustainability Analyst", "Project Coordinator"]
  },
  {
    name: "PixelWave",
    industry: "design",
    recommended: false,
    roles: ["Motion Graphics Intern", "Product Designer"]
  },
  {
    name: "FutureFinance",
    industry: "business",
    recommended: true,
    roles: ["Finance Intern", "Risk Analyst"]
  },
  {
    name: "NeuroNet",
    industry: "tech",
    recommended: true,
    roles: ["AI Intern", "ML Engineer Intern"]
  },
  {
    name: "Creativo",
    industry: "design",
    recommended: true,
    roles: ["Visual Designer", "Brand Strategist"]
  },
  {
    name: "DataHive",
    industry: "tech",
    recommended: false,
    roles: ["Data Science Intern", "Cloud Intern"]
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
    const matchesIndustry = filters.industry === '' || company.industry === filters.industry;
    const matchesSearch =
      searchQuery === '' ||
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.roles.some(role => role.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesIndustry && matchesSearch;
  });

  return (
    <div className="student-home">
      <div className="search-section">
        <h1>Find Your Perfect Internship</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search internships by title or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-btn">Search</button>
        </div>
        <div className="quick-filters">
          <select
            value={filters.industry}
            onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
          >
            <option value="">All Industries</option>
            <option value="tech">Technology</option>
            <option value="design">Design</option>
            <option value="business">Business</option>
          </select>
          <select
            value={filters.duration}
            onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
          >
            <option value="">All Durations</option>
            <option value="summer">Summer</option>
            <option value="semester">Semester</option>
            <option value="year">Year-round</option>
          </select>
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option value="">All Types</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>
      </div>

      <div className="suggested-companies">
        <h2>Suggested Companies</h2>
        <div className="companies-list">
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company, index) => (
              <div key={index} className="company-card">
                <h3>{company.name}</h3>
                <p>Industry: {company.industry}</p>
                <p>Roles: {company.roles.join(', ')}</p>
                <p style={{ color: company.recommended ? 'green' : 'gray' }}>
                  {company.recommended ? '★ Recommended by past interns' : '☆ Not recommended by past interns'}
                </p>
              </div>
            ))
          ) : (
            <p>No companies match your filters and interests.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
