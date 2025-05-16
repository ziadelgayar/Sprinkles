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
      <div className="p-6 max-w-4xl mx-auto">
        <div className="page-header mb-6">
          <h1 className="text-2xl font-bold">Manage Internships</h1>
          <div className="flex flex-col md:flex-row md:items-center md:gap-4 mb-4">
            <input
              type="text"
              className="w-full p-2 border rounded mb-2 md:mb-0"
              placeholder="Search for internships..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="accept-btn" onClick={handlePostNewInternship}>
              Post New Internship
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {internships.length === 0 ? (
            <div className="custom-box text-center">
              <p className="text-gray-500">No internships posted yet</p>
            </div>
          ) : (
            internships
              .filter((internship) =>
                internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                internship.description.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((internship) => (
                <div key={internship.id} className="custom-box">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold">{internship.title}</h3>
                    <span className={`status ${internship.status} px-3 py-1 rounded-full text-sm`}>
                      {internship.status}
                    </span>
                  </div>
                  <p className="mb-2 text-gray-500">{internship.description}</p>
                  <div className="mb-2 text-sm text-gray-500 flex flex-wrap gap-4">
                    <span>Location: {internship.location}</span>
                    <span>Duration: {internship.duration}</span>
                    <span>Applications: {internship.applicationCount}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-end">
                    <button className="save-btn" onClick={() => handleEditInternship(internship)}>Edit</button>
                    <button className="accept-btn" onClick={() => handleViewApplicants(internship)}>View Applicants</button>
                    <button className="reject-btn" onClick={() => handleDeleteInternship(internship.id)}>Delete</button>
                  </div>
                </div>
              ))
          )}
        </div>

        {selectedInternship && (
          <div className="modal-overlay">
            <div className="custom-box max-w-md mx-auto mt-20">
              <h2 className="text-xl font-bold mb-4">Edit Internship</h2>
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Title"
                  value={newInternship.title}
                  onChange={(e) => setNewInternship({ ...newInternship, title: e.target.value })}
                />
                <textarea
                  className="w-full p-2 border rounded"
                  placeholder="Description"
                  value={newInternship.description}
                  onChange={(e) => setNewInternship({ ...newInternship, description: e.target.value })}
                />
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Location"
                  value={newInternship.location}
                  onChange={(e) => setNewInternship({ ...newInternship, location: e.target.value })}
                />
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Duration"
                  value={newInternship.duration}
                  onChange={(e) => setNewInternship({ ...newInternship, duration: e.target.value })}
                />
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newInternship.isPaid}
                    onChange={() => setNewInternship({ ...newInternship, isPaid: !newInternship.isPaid })}
                  />
                  <label>Paid Internship</label>
                </div>
                {newInternship.isPaid && (
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="Salary"
                    value={newInternship.salary}
                    onChange={(e) => setNewInternship({ ...newInternship, salary: e.target.value })}
                  />
                )}
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Skills"
                  value={newInternship.skills}
                  onChange={(e) => setNewInternship({ ...newInternship, skills: e.target.value })}
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button className="cancel-btn" onClick={() => setSelectedInternship(null)}>Cancel</button>
                <button className="accept-btn" onClick={handleUpdateInternship}>Update Internship</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Internships;
