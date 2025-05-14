import React, { useState } from 'react';

const Internships = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [internships, setInternships] = useState([
    {
      id: 1,
      title: 'Frontend Developer Internship',
      description: 'Work with the front-end team to develop web applications.',
      location: 'Remote',
      duration: '6 months',
      isPaid: true,
      salary: '5000 USD',
      skills: 'JavaScript, React, CSS',
      applicationCount: 12,
      companyName: 'Tech Innovations',
      status: 'active',
      applicants: ['Alice', 'Bob', 'Charlie']
    },
    {
      id: 2,
      title: 'Marketing Internship',
      description: 'Assist the marketing department with campaigns and content creation.',
      location: 'On-site',
      duration: '3 months',
      isPaid: false,
      salary: '',
      skills: 'Content Creation, SEO, Social Media',
      applicationCount: 5,
      companyName: 'Marketing Inc.',
      status: 'active',
      applicants: ['David', 'Eva']
    }
  ]);
  
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [newInternship, setNewInternship] = useState({
    title: '',
    description: '',
    location: '',
    duration: '',
    isPaid: false,
    salary: '',
    skills: '',
    applicationCount: 0,
    companyName: 'My Company',
    status: 'active',
    applicants: []
  });

  const handlePostNewInternship = () => {
    const newInternshipObj = {
      ...newInternship,
      id: Date.now(), // unique ID
    };
    setInternships([...internships, newInternshipObj]);
    setNewInternship({
      title: '',
      description: '',
      location: '',
      duration: '',
      isPaid: false,
      salary: '',
      skills: '',
      applicationCount: 0,
      companyName: 'My Company',
      status: 'active',
      applicants: []
    });
  };

  const handleEditInternship = (internship) => {
    setSelectedInternship(internship);
    setNewInternship({ ...internship });
  };

  const handleUpdateInternship = () => {
    const updatedInternships = internships.map((internship) =>
      internship.id === selectedInternship.id ? { ...newInternship } : internship
    );
    setInternships(updatedInternships);
    setSelectedInternship(null);
  };

  const handleDeleteInternship = (id) => {
    setInternships(internships.filter((internship) => internship.id !== id));
  };

  const handleViewApplicants = (internship) => {
    alert(`Applicants for ${internship.title}: ${internship.applicants.join(', ')}`);
  };

  return (
    <div className="main-content">
      <div className="page-header">
        <h1>Manage Internships</h1>
        
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for internships..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-btn">Search</button>
        </div>
        <button className="post-new-btn" onClick={handlePostNewInternship}>
          Post New Internship
        </button>
      </div>

      <div className="internships-list">
        {internships.length === 0 ? (
          <div className="empty-state">
            <p>No internships posted yet</p>
          </div>
        ) : (
          internships.map((internship) => (
            <div key={internship.id} className="internship-card">
              <div className="internship-header">
                <h3>{internship.title}</h3>
                <span className={`status ${internship.status}`}>{internship.status}</span>
              </div>
              <p className="description">{internship.description}</p>
              <div className="internship-details">
                <span>Location: {internship.location}</span>
                <span>Duration: {internship.duration}</span>
                <span>Applications: {internship.applicationCount}</span>
              </div>
              <div className="internship-actions">
                <button className="edit-btn" onClick={() => handleEditInternship(internship)}>Edit</button>
                <button className="view-applicants-btn" onClick={() => handleViewApplicants(internship)}>View Applicants</button>
                <button className="delete-btn" onClick={() => handleDeleteInternship(internship.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedInternship && (
        <div className="edit-internship-form">
          <h2>Edit Internship</h2>
          <input
            type="text"
            placeholder="Title"
            value={newInternship.title}
            onChange={(e) => setNewInternship({ ...newInternship, title: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={newInternship.description}
            onChange={(e) => setNewInternship({ ...newInternship, description: e.target.value })}
          />
          <input
            type="text"
            placeholder="Location"
            value={newInternship.location}
            onChange={(e) => setNewInternship({ ...newInternship, location: e.target.value })}
          />
          <input
            type="text"
            placeholder="Duration"
            value={newInternship.duration}
            onChange={(e) => setNewInternship({ ...newInternship, duration: e.target.value })}
          />
          <input
            type="checkbox"
            checked={newInternship.isPaid}
            onChange={() => setNewInternship({ ...newInternship, isPaid: !newInternship.isPaid })}
          />
          <label>Paid Internship</label>
          {newInternship.isPaid && (
            <input
              type="text"
              placeholder="Salary"
              value={newInternship.salary}
              onChange={(e) => setNewInternship({ ...newInternship, salary: e.target.value })}
            />
          )}
          <input
            type="text"
            placeholder="Skills"
            value={newInternship.skills}
            onChange={(e) => setNewInternship({ ...newInternship, skills: e.target.value })}
          />
          <button onClick={handleUpdateInternship}>Update Internship</button>
        </div>
      )}
    </div>
  );
};

export default Internships;
