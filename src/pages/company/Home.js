import React, { useState } from 'react';

const CompanyHome = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ industry: '', duration: '', isPaid: '' });

  // Sample internships
  const internships = [
    {
      id: 1,
      jobTitle: 'Frontend Developer',
      companyName: 'Tech Corp',
      industry: 'Technology',
      duration: '3 months',
      isPaid: true,
      expectedSalary: '1500 USD',
      skills: ['React', 'CSS', 'JavaScript'],
      description: 'Develop and maintain UI components using React and modern web technologies.',
    },
    {
      id: 2,
      jobTitle: 'Marketing Intern',
      companyName: 'AdWorld',
      industry: 'Marketing',
      duration: '2 months',
      isPaid: false,
      expectedSalary: null, // unpaid
      skills: ['SEO', 'Content Creation', 'Analytics'],
      description: 'Assist in executing marketing campaigns and analyzing engagement metrics.',
    },
    {
      id: 3,
      jobTitle: 'Data Analyst Intern',
      companyName: 'DataWise',
      industry: 'Data Science',
      duration: '6 months',
      isPaid: true,
      expectedSalary: '2000 USD',
      skills: ['Python', 'SQL', 'Excel', 'Power BI'],
      description: 'Support the data team in collecting, analyzing, and visualizing business data.',
    },
    {
      id: 4,
      jobTitle: 'UI/UX Design Intern',
      companyName: 'Creative Studio',
      industry: 'Design',
      duration: '3 months',
      isPaid: true,
      expectedSalary: '1200 USD',
      skills: ['Figma', 'Wireframing', 'User Research'],
      description: 'Design user-friendly interfaces and contribute to improving user experience.',
    }
  ];

  // Filtering logic
  const filteredInternships = internships.filter((internship) => {
    const matchesSearch =
      internship.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.companyName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilters =
      (!filters.industry || internship.industry === filters.industry) &&
      (!filters.duration || internship.duration === filters.duration) &&
      (filters.isPaid === '' || internship.isPaid === (filters.isPaid === 'true'));

    // If no filters or search query, return all internships
    return (searchQuery === '' && filters.industry === '' && filters.duration === '' && filters.isPaid === '') 
      || (matchesSearch && matchesFilters);
  });

  return (
    <div className="main-content">
      <div className="company-home">
        <div className="search-section">
          <h1>Find the Perfect Intern</h1>

          {/* Search Bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by job title or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="quick-filters">
            <select name="industry" onChange={(e) => setFilters({ ...filters, industry: e.target.value })}>
              <option value="">All Industries</option>
              <option value="Technology">Technology</option>
              <option value="Marketing">Marketing</option>
            </select>

            <select name="duration" onChange={(e) => setFilters({ ...filters, duration: e.target.value })}>
              <option value="">All Durations</option>
              <option value="3 months">3 months</option>
              <option value="6 months">6 months</option>
              <option value="12+ months">12+ months</option>
            </select>

            <select name="isPaid" onChange={(e) => setFilters({ ...filters, isPaid: e.target.value })}>
              <option value="">All Types</option>
              <option value="true">Paid</option>
              <option value="false">Unpaid</option>
            </select>
          </div>
        </div>

        {/* Featured Internships */}
        <div className="featured-section">
          <h2>Available Internships</h2>
          <div className="featured-listings">
            {filteredInternships.length > 0 ? (
              filteredInternships.map((internship) => (
                <div key={internship.id} className="internship-card">
                  <h3>{internship.jobTitle}</h3>
                  <p><strong>Company:</strong> {internship.companyName}</p>
                  <p><strong>Industry:</strong> {internship.industry}</p>
                  <p><strong>Duration:</strong> {internship.duration}</p>
                  <p><strong>Paid:</strong> {internship.isPaid ? 'Yes' : 'No'}</p>
                  {internship.isPaid && internship.expectedSalary && (
                    <p><strong>Expected Salary:</strong> {internship.expectedSalary}</p>
                  )}
                  <p><strong>Skills Required:</strong> {internship.skills.join(', ')}</p>
                  <p><strong>Description:</strong> {internship.description}</p>
                </div>
              ))
            ) : (
              <p>No internships match your criteria.</p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button className="post-slot-btn">Post New Internship</button>
            <button className="view-applications-btn">View Applications</button>
            <button className="manage-interns-btn">Manage Current Interns</button>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="stats-dashboard">
          <div className="stat-card">
            <h3>Active Listings</h3>
            <p>{internships.length}</p>
          </div>
          <div className="stat-card">
            <h3>Pending Applications</h3>
            <p>0</p>
          </div>
          <div className="stat-card">
            <h3>Current Interns</h3>
            <p>0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyHome;
