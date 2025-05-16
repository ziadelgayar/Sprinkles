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
      <div className="p-6 max-w-4xl mx-auto space-y-8">
        <div className="custom-box mb-6">
          <div className="search-section">
            <h1 className="text-2xl font-bold mb-4">Find the Perfect Intern</h1>
            {/* Search Bar */}
            <div className="mb-4">
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Search by job title or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-2">
              <select name="industry" className="p-2 border rounded bg-white text-gray-900" onChange={(e) => setFilters({ ...filters, industry: e.target.value })}>
                <option value="">All Industries</option>
                <option value="Technology">Technology</option>
                <option value="Marketing">Marketing</option>
              </select>
              <select name="duration" className="p-2 border rounded bg-white text-gray-900" onChange={(e) => setFilters({ ...filters, duration: e.target.value })}>
                <option value="">All Durations</option>
                <option value="3 months">3 months</option>
                <option value="6 months">6 months</option>
                <option value="12+ months">12+ months</option>
              </select>
              <select name="isPaid" className="p-2 border rounded bg-white text-gray-900" onChange={(e) => setFilters({ ...filters, isPaid: e.target.value })}>
                <option value="">All Types</option>
                <option value="true">Paid</option>
                <option value="false">Unpaid</option>
              </select>
            </div>
          </div>
        </div>

        {/* Featured Internships */}
        <div className="custom-box mb-6">
          <h2 className="text-xl font-bold mb-4">Available Internships</h2>
          <div className="space-y-4">
            {filteredInternships.length > 0 ? (
              filteredInternships.map((internship) => (
                <div key={internship.id} className="custom-box bg-gray-50">
                  <h3 className="font-semibold">{internship.jobTitle}</h3>
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
              <p className="text-gray-500">No internships match your criteria.</p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="custom-box mb-6">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-2">
            <button className="accept-btn">Post New Internship</button>
            <button className="save-btn">View Applications</button>
            <button className="reject-btn">Manage Current Interns</button>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="custom-box grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="stat-card text-center p-4">
            <h3 className="font-semibold mb-2">Active Listings</h3>
            <p className="text-2xl font-bold">{internships.length}</p>
          </div>
          <div className="stat-card text-center p-4">
            <h3 className="font-semibold mb-2">Pending Applications</h3>
            <p className="text-2xl font-bold">0</p>
          </div>
          <div className="stat-card text-center p-4">
            <h3 className="font-semibold mb-2">Current Interns</h3>
            <p className="text-2xl font-bold">0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyHome;
