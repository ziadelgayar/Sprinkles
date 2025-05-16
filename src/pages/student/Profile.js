import React, { useState, useEffect } from 'react';

const StudentProfileAndSettings = () => {
  // Define possible options for industries and job types
  const industryOptions = [
    { value: 'tech', label: 'Technology' },
    { value: 'finance', label: 'Finance' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'design', label: 'Design' },
    { value: 'business', label: 'Business' },
    { value: 'nonprofit', label: 'Non-profit' },
    { value: 'government', label: 'Government' },
  ];

  const jobTypeOptions = [
    { value: 'internship', label: 'Internship' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'full-time', label: 'Full-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'freelance', label: 'Freelance' },
    { value: 'remote', label: 'Remote' },
  ];

  // Dummy initial profile data
  const initialProfile = {
    name: 'John Doe',
    major: 'cs',
    semester: '3',
    jobInterests: {
      industries: ['tech', 'business'],
      jobTypes: ['internship', 'part-time'],
    },
    previousInternships: [
      {
        company: 'Tech Corp',
        position: 'Software Developer Intern',
        duration: 'Summer 2022',
        responsibilities: 'Developed web applications using React and Node.js'
      }
    ],
    collegeActivities: [
      {
        name: 'Computer Science Club',
        role: 'Member',
        duration: '2021-Present',
        description: 'Participated in coding competitions and workshops'
      }
    ],
    skills: ['JavaScript', 'React', 'Python'],
    documents: {
      resume: null,
      coverLetter: null,
      certificates: [],
    },
    isProStudent: true,
    postAssessmentScore: false,
    assessmentScore: null,
  };

  const [profile, setProfile] = useState(initialProfile);
  const [editMode, setEditMode] = useState(false);
  const [tempProfile, setTempProfile] = useState(initialProfile);

  // Form states
  const [internshipForm, setInternshipForm] = useState({
    company: '',
    position: '',
    duration: '',
    responsibilities: '',
  });

  const [activityForm, setActivityForm] = useState({
    name: '',
    role: '',
    duration: '',
    description: '',
  });

  const [scoreInput, setScoreInput] = useState('');

  // Job Interests edit mode state and temp entries management
  const [jobInterestsEditMode, setJobInterestsEditMode] = useState(false);
  const [tempIndustries, setTempIndustries] = useState(profile.jobInterests.industries);
  const [tempJobTypes, setTempJobTypes] = useState(profile.jobInterests.jobTypes);

  // New inputs for adding industries and job types during edit
  const [newIndustry, setNewIndustry] = useState('');
  const [newJobType, setNewJobType] = useState('');

  // Initialize temp states when profile changes
  useEffect(() => {
    setTempIndustries(profile.jobInterests.industries);
    setTempJobTypes(profile.jobInterests.jobTypes);
  }, [profile.jobInterests]);

  // Save internship
  const saveInternship = () => {
    if (!internshipForm.company.trim() || !internshipForm.position.trim()) return;

    setProfile((prev) => ({
      ...prev,
      previousInternships: [...prev.previousInternships, internshipForm],
    }));

    setInternshipForm({
      company: '',
      position: '',
      duration: '',
      responsibilities: '',
    });
  };

  // Save activity
  const saveActivity = () => {
    if (!activityForm.name.trim() || !activityForm.role.trim()) return;

    setProfile((prev) => ({
      ...prev,
      collegeActivities: [...prev.collegeActivities, activityForm],
    }));

    setActivityForm({
      name: '',
      role: '',
      duration: '',
      description: '',
    });
  };

  // Remove internship
  const removeInternship = (index) => {
    setProfile((prev) => ({
      ...prev,
      previousInternships: prev.previousInternships.filter((_, i) => i !== index),
    }));
  };

  // Remove activity
  const removeActivity = (index) => {
    setProfile((prev) => ({
      ...prev,
      collegeActivities: prev.collegeActivities.filter((_, i) => i !== index),
    }));
  };

  // Handle assessment score changes
  const handleAssessmentScoreChange = (e) => {
    setScoreInput(e.target.value);
  };

  // Save assessment score
  const saveAssessmentScore = () => {
    if (scoreInput.trim() === '') return;

    setProfile((prev) => ({
      ...prev,
      assessmentScore: scoreInput,
      postAssessmentScore: true,
    }));

    setScoreInput('');
  };

  // Cancel assessment score
  const cancelAssessmentScore = () => {
    setProfile((prev) => ({
      ...prev,
      postAssessmentScore: false,
      assessmentScore: null,
    }));

    setScoreInput('');
  };

  // === Job Interests Handlers ===
  const addIndustry = () => {
    const trimmed = newIndustry.trim();
    if (trimmed && !tempIndustries.includes(trimmed)) {
      setTempIndustries((prev) => [...prev, trimmed]);
      setNewIndustry('');
    }
  };

  const removeIndustry = (value) => {
    setTempIndustries((prev) => prev.filter(item => item !== value));
  };

  const addJobType = () => {
    const trimmed = newJobType.trim();
    if (trimmed && !tempJobTypes.includes(trimmed)) {
      setTempJobTypes((prev) => [...prev, trimmed]);
      setNewJobType('');
    }
  };

  const removeJobType = (value) => {
    setTempJobTypes((prev) => prev.filter(item => item !== value));
  };

  const startEditJobInterests = () => {
    setTempIndustries(profile.jobInterests.industries);
    setTempJobTypes(profile.jobInterests.jobTypes);
    setJobInterestsEditMode(true);
    setNewIndustry('');
    setNewJobType('');
  };

  const cancelEditJobInterests = () => {
    setTempIndustries(profile.jobInterests.industries);
    setTempJobTypes(profile.jobInterests.jobTypes);
    setNewIndustry('');
    setNewJobType('');
    setJobInterestsEditMode(false);
  };

  const saveJobInterests = () => {
    setProfile((prev) => ({
      ...prev,
      jobInterests: {
        industries: tempIndustries,
        jobTypes: tempJobTypes,
      },
    }));
    setJobInterestsEditMode(false);
  };

  // Handle file input changes
  const handleFileChange = (field, files) => {
    if (field === 'certificates') {
      setProfile((prev) => ({
        ...prev,
        documents: {
          ...prev.documents,
          certificates: Array.from(files),
        },
      }));
    } else {
      setProfile((prev) => ({
        ...prev,
        documents: {
          ...prev.documents,
          [field]: files[0],
        },
      }));
    }
  };

  // Helper to display selected items labels for values
  const displaySelectedItems = (selectedValues, options) => {
    return selectedValues.map(value => {
      // Try to match option label, else show as-is (for user-added custom values)
      const option = options.find(opt => opt.value === value);
      return option ? option.label : value;
    }).join(', ');
  };

  // Toggle edit mode for basic info
  const toggleEditMode = () => {
    if (editMode) {
      // If exiting edit mode without saving, revert changes
      setTempProfile(profile);
    } else {
      // When entering edit mode, copy current profile to temp
      setTempProfile(profile);
    }
    setEditMode(!editMode);
  };

  // Save basic info changes
  const saveBasicInfo = () => {
    setProfile(tempProfile);
    setEditMode(false);
  };

  // Cancel basic info changes
  const cancelBasicInfo = () => {
    setTempProfile(profile);
    setEditMode(false);
  };

  // Handle basic info changes
  const handleBasicInfoChange = (field, value) => {
    setTempProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // ProStudent badge renderer
  const renderMiniProStudentBadge = () => {
    
  };

  return (
    <div className="main-content">
      <div className="p-6 max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="flex items-center mb-6">
          <h1 className="text-2xl font-bold">Student Profile</h1>
          {renderMiniProStudentBadge()}
        </div>

        {/* Basic Info */}
        <div className="custom-box mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Basic Information</h2>
            {!editMode ? (
              <button 
                onClick={toggleEditMode}
                className="accept-btn"
              >
                Edit
              </button>
            ) : (
              <div className="flex space-x-2">
                <button 
                  onClick={saveBasicInfo}
                  className="save-btn"
                >
                  Save Changes
                </button>
                <button 
                  onClick={cancelBasicInfo}
                  className="reject-btn"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block font-semibold ">Full Name:</label>
            {editMode ? (
              <input
                id="name"
                type="text"
                className="w-full p-2 border rounded"
                value={tempProfile.name}
                onChange={(e) => handleBasicInfoChange('name', e.target.value)}
              />
            ) : (
              <p className="p-2 bg-gray-50 rounded">{profile.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="major" className="block font-semibold">Major:</label>
            {editMode ? (
              <select
                id="major"
                className="w-full p-2 border rounded"
                value={tempProfile.major}
                onChange={(e) => handleBasicInfoChange('major', e.target.value)}
              >
                <option value="">Select Major</option>
                <option value="cs">Computer Science</option>
                <option value="engineering">Engineering</option>
                <option value="business">Business</option>
              </select>
            ) : (
              <p className="p-2 bg-gray-50 rounded">
                {profile.major === 'cs' && 'Computer Science'}
                {profile.major === 'engineering' && 'Engineering'}
                {profile.major === 'business' && 'Business'}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="semester" className="block font-semibold">Semester:</label>
            {editMode ? (
              <select
                id="semester"
                className="w-full p-2 border rounded"
                value={tempProfile.semester}
                onChange={(e) => handleBasicInfoChange('semester', e.target.value)}
              >
                <option value="">Select Semester</option>
                {[...Array(10)].map((_, i) =>
                  <option key={i} value={i + 1}>{i + 1}</option>
                )}
              </select>
            ) : (
              <p className="p-2 bg-gray-50 rounded">{profile.semester}</p>
            )}
          </div>
        </div>

        {/* Job Interests */}
        <div className="custom-box mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Job Interests</h2>
            {!jobInterestsEditMode ? (
              <button
                onClick={startEditJobInterests}
                className="accept-btn"
              >
                Edit
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={saveJobInterests}
                  className="save-btn"
                >
                  Save
                </button>
                <button
                  onClick={cancelEditJobInterests}
                  className="reject-btn"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {!jobInterestsEditMode ? (
            <>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Industries:</label>
                <p className="p-2 bg-gray-50 rounded">
                  {tempIndustries.length > 0
                    ? displaySelectedItems(tempIndustries, industryOptions)
                    : 'None selected'}
                </p>
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Job Types:</label>
                <p className="p-2 bg-gray-50 rounded">
                  {tempJobTypes.length > 0
                    ? displaySelectedItems(tempJobTypes, jobTypeOptions)
                    : 'None selected'}
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Industries input */}
              <div className="mb-4">
                <label className="block font-semibold mb-2">Industries</label>
                <div className="flex space-x-2 mb-2 flex-wrap">
                  {tempIndustries.map((industry) => (
                    <div
                      key={industry}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center space-x-1 mb-1"
                    >
                      <span>{industryOptions.find(opt => opt.value === industry)?.label || industry}</span>
                      <button
                        onClick={() => removeIndustry(industry)}
                        className="text-blue-600 hover:text-blue-900 font-bold"
                        aria-label={`Remove ${industry}`}
                        type="button"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <select
                    className="flex-grow p-2 border rounded"
                    value={newIndustry}
                    onChange={(e) => setNewIndustry(e.target.value)}
                  >
                    <option value="">Select an Industry</option>
                    {industryOptions.map((option) =>
                      !tempIndustries.includes(option.value) ? (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ) : null
                    )}
                  </select>
                  <button
                    type="button"
                    disabled={!newIndustry}
                    onClick={addIndustry}
                    className="accept-btn disabled:opacity-50"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Job Types input */}
              <div className="mb-4">
                <label className="block font-semibold mb-2">Job Types</label>
                <div className="flex space-x-2 mb-2 flex-wrap">
                  {tempJobTypes.map((jobType) => (
                    <div
                      key={jobType}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center space-x-1 mb-1"
                    >
                      <span>{jobTypeOptions.find(opt => opt.value === jobType)?.label || jobType}</span>
                      <button
                        onClick={() => removeJobType(jobType)}
                        className="text-green-700 hover:text-green-900 font-bold"
                        aria-label={`Remove ${jobType}`}
                        type="button"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <select
                    className="flex-grow p-2 border rounded"
                    value={newJobType}
                    onChange={(e) => setNewJobType(e.target.value)}
                  >
                    <option value="">Select a Job Type</option>
                    {jobTypeOptions.map((option) =>
                      !tempJobTypes.includes(option.value) ? (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ) : null
                    )}
                  </select>
                  <button
                    type="button"
                    disabled={!newJobType}
                    onClick={addJobType}
                    className="save-btn disabled:opacity-50"
                  >
                    Add
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Previous Internships */}
        <div className="custom-box mb-6">
          <h2 className="text-xl font-bold mb-4">Previous Internships</h2>

          {/* Internship Form (always visible) */}
          <div className="grid grid-cols-1 gap-2 mb-6 border p-4 rounded bg-gray-50">
            <input
              type="text"
              placeholder="Company *"
              className="p-2 border rounded"
              value={internshipForm.company}
              onChange={e => setInternshipForm({...internshipForm, company: e.target.value})}
            />
            <input
              type="text"
              placeholder="Position *"
              className="p-2 border rounded"
              value={internshipForm.position}
              onChange={e => setInternshipForm({...internshipForm, position: e.target.value})}
            />
            <input
              type="text"
              placeholder="Duration"
              className="p-2 border rounded"
              value={internshipForm.duration}
              onChange={e => setInternshipForm({...internshipForm, duration: e.target.value})}
            />
            <textarea
              placeholder="Responsibilities"
              className="p-2 border rounded"
              value={internshipForm.responsibilities}
              onChange={e => setInternshipForm({...internshipForm, responsibilities: e.target.value})}
            />
            <button
              disabled={!internshipForm.company.trim() || !internshipForm.position.trim()}
              onClick={saveInternship}
              className="accept-btn justify-self-end disabled:opacity-50"
            >
              Save Internship
            </button>
          </div>

          {/* Saved Internships */}
          {profile.previousInternships.length > 0 &&
            <div className="space-y-4">
              <h3 className="font-semibold">Saved Internships</h3>
              {profile.previousInternships.map((intern, idx) => (
                <div key={idx} className="custom-box bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-bold">{intern.company}</p>
                      <p className="text-gray-600">{intern.position}</p>
                    </div>
                  </div>
                  {intern.duration && <p className="text-sm text-gray-500">Duration: {intern.duration}</p>}
                  {intern.responsibilities && (
                    <div className="mt-2">
                      <p className="text-sm font-semibold">Responsibilities:</p>
                      <p className="text-sm whitespace-pre-line">{intern.responsibilities}</p>
                    </div>
                  )}
                  <button
                    className="reject-btn mt-2"
                    onClick={() => removeInternship(idx)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          }
        </div>

        {/* College Activities */}
        <div className="custom-box mb-6">
          <h2 className="text-xl font-bold mb-4">College Activities</h2>

          {/* Activity Form */}
          <div className="grid grid-cols-1 gap-2 mb-6 border p-4 rounded bg-gray-50">
            <input
              type="text"
              placeholder="Activity Name *"
              className="p-2 border rounded"
              value={activityForm.name}
              onChange={e => setActivityForm({...activityForm, name: e.target.value})}
            />
            <input
              type="text"
              placeholder="Role *"
              className="p-2 border rounded"
              value={activityForm.role}
              onChange={e => setActivityForm({...activityForm, role: e.target.value})}
            />
            <input
              type="text"
              placeholder="Duration"
              className="p-2 border rounded"
              value={activityForm.duration}
              onChange={e => setActivityForm({...activityForm, duration: e.target.value})}
            />
            <textarea
              placeholder="Description"
              className="p-2 border rounded"
              value={activityForm.description}
              onChange={e => setActivityForm({...activityForm, description: e.target.value})}
            />
            <button
              disabled={!activityForm.name.trim() || !activityForm.role.trim()}
              onClick={saveActivity}
              className="accept-btn justify-self-end disabled:opacity-50"
            >
              Save Activity
            </button>
          </div>

          {/* Saved Activities */}
          {profile.collegeActivities.length > 0 &&
            <div className="space-y-4">
              <h3 className="font-semibold">Saved Activities</h3>
              {profile.collegeActivities.map((activity, idx) => (
                <div key={idx} className="custom-box bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-bold">{activity.name}</p>
                      <p className="text-gray-600">{activity.role}</p>
                    </div>
                  </div>
                  {activity.duration && <p className="text-sm text-gray-500">Duration: {activity.duration}</p>}
                  {activity.description && (
                    <div className="mt-2">
                      <p className="text-sm font-semibold">Description:</p>
                      <p className="text-sm whitespace-pre-line">{activity.description}</p>
                    </div>
                  )}
                  <button
                    className="reject-btn mt-2"
                    onClick={() => removeActivity(idx)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          }
        </div>

        {/* Documents */}
        <div className="custom-box mb-6">
          <h2 className="text-xl font-bold mb-4">Documents</h2>
          <div className="mb-4">
            <label htmlFor="resume" className="block font-semibold">Resume</label>
            <input
              id="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => handleFileChange('resume', e.target.files)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="coverLetter" className="block font-semibold">Cover Letter</label>
            <input
              id="coverLetter"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => handleFileChange('coverLetter', e.target.files)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="certificates" className="block font-semibold">Certificates</label>
            <input
              id="certificates"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              multiple
              onChange={(e) => handleFileChange('certificates', e.target.files)}
            />
          </div>
        </div>

        {/* Assessment Score */}
        <div className="custom-box mb-6">
          <h2 className="text-xl font-bold mb-4">Online Assessment</h2>

          {profile.postAssessmentScore && profile.assessmentScore ? (
            <div className="mb-4 p-3 bg-gray-100 rounded">
              <p className="font-semibold">Your assessment score: {profile.assessmentScore}</p>
              <button
                className="cancel-btn mt-2"
                onClick={cancelAssessmentScore}
              >
                Remove Score
              </button>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <label htmlFor="postAssessmentScore" className="inline-flex items-center cursor-pointer">
                  <input
                    id="postAssessmentScore"
                    type="checkbox"
                    checked={profile.postAssessmentScore}
                    onChange={(e) => {
                      if (!e.target.checked) {
                        cancelAssessmentScore();
                      } else {
                        setProfile((prev) => ({ ...prev, postAssessmentScore: true }));
                      }
                    }}
                    className="mr-2"
                  />
                  Choose to post my online assessment score on my profile
                </label>
              </div>
              {profile.postAssessmentScore && (
                <div className="bg-gray-100 p-4 rounded">
                  <label className="block font-semibold mb-2">Enter your assessment score:</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={scoreInput}
                    onChange={handleAssessmentScoreChange}
                    className="p-2 border rounded w-full mb-2"
                    placeholder="Score (0-100)"
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      className="save-btn"
                      onClick={saveAssessmentScore}
                      disabled={scoreInput.trim() === ''}
                    >
                      Save Score
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={cancelAssessmentScore}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfileAndSettings;
