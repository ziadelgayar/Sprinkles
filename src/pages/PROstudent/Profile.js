import React, { useState, useEffect } from 'react';

const StudentProfileAndSettings = () => {
  // Assume the user is logged in and we have their ProStudent status
  const [profile, setProfile] = useState({
    name: 'Noura', // User name
    major: '',
    semester: '',
    jobInterests: {
      industries: [],
      jobTypes: []
    },
    previousInternships: [],
    collegeActivities: [],
    skills: [],
    documents: {
      resume: null,
      coverLetter: null,
      certificates: []
    },
    isProStudent: true // ProStudent status is provided when logged in
  });

  // Handle changes in job interest selections
  const handleJobInterestChange = (type, options) => {
    const values = Array.from(options, (option) => option.value);
    setProfile({
      ...profile,
      jobInterests: {
        ...profile.jobInterests,
        [type]: values
      }
    });
  };

  // Handle file input changes
  const handleFileChange = (field, files) => {
    if (field === 'certificates') {
      setProfile({
        ...profile,
        documents: {
          ...profile.documents,
          certificates: Array.from(files)
        }
      });
    } else {
      setProfile({
        ...profile,
        documents: {
          ...profile.documents,
          [field]: files[0]
        }
      });
    }
  };

  // Add a new internship entry
  const addInternship = () => {
    setProfile({
      ...profile,
      previousInternships: [
        ...profile.previousInternships,
        { company: '', position: '', duration: '', responsibilities: '' }
      ]
    });
  };

  // Update internship fields dynamically
  const updateInternship = (index, field, value) => {
    setProfile({
      ...profile,
      previousInternships: profile.previousInternships.map((intern, idx) =>
        idx === index ? { ...intern, [field]: value } : intern
      )
    });
  };

  // Add a new college activity entry
  const addActivity = () => {
    setProfile({
      ...profile,
      collegeActivities: [
        ...profile.collegeActivities,
        { name: '', role: '', duration: '', description: '' }
      ]
    });
  };

  // Update college activity fields dynamically
  const updateActivity = (index, field, value) => {
    setProfile({
      ...profile,
      collegeActivities: profile.collegeActivities.map((activity, idx) =>
        idx === index ? { ...activity, [field]: value } : activity
      )
    });
  };

  // Conditional rendering for ProStudent badge
  const renderMiniProStudentBadge = () => {
    if (profile.isProStudent) {
      return (
        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full ml-2">
          ProStudent
        </span>
      );
    }
    return null;
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
        <div className="mb-4">
          <label className="block font-semibold">Full Name</label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Major</label>
          <select
            className="w-full p-2 border rounded"
            value={profile.major}
            onChange={(e) => setProfile({ ...profile, major: e.target.value })}
          >
            <option value="">Select Major</option>
            <option value="cs">Computer Science</option>
            <option value="engineering">Engineering</option>
            <option value="business">Business</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Semester</label>
          <select
            className="w-full p-2 border rounded"
            value={profile.semester}
            onChange={(e) => setProfile({ ...profile, semester: e.target.value })}
          >
            <option value="">Select Semester</option>
            {[...Array(10)].map((_, i) => (
              <option key={i} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>

        {/* Job Interests */}
        <h2 className="text-xl font-bold mt-6 mb-2">Job Interests</h2>
        <div className="mb-4">
          <label className="block font-semibold">Industries</label>
          <select
            multiple
            className="w-full p-2 border rounded"
            value={profile.jobInterests.industries}
            onChange={(e) => handleJobInterestChange('industries', e.target.selectedOptions)}
          >
            <option value="tech">Technology</option>
            <option value="design">Design</option>
            <option value="business">Business</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Job Types</label>
          <select
            multiple
            className="w-full p-2 border rounded"
            value={profile.jobInterests.jobTypes}
            onChange={(e) => handleJobInterestChange('jobTypes', e.target.selectedOptions)}
          >
            <option value="internship">Internship</option>
            <option value="part-time">Part-time</option>
            <option value="full-time">Full-time</option>
          </select>
        </div>

        {/* Previous Internships */}
        <h2 className="text-xl font-bold mt-6 mb-2">Previous Internships</h2>
        {profile.previousInternships.map((intern, index) => (
          <div key={index} className="grid grid-cols-1 gap-2 mb-4 border p-4 rounded">
            <input
              className="p-2 border rounded"
              type="text"
              placeholder="Company"
              value={intern.company}
              onChange={(e) => updateInternship(index, 'company', e.target.value)}
            />
            <input
              className="p-2 border rounded"
              type="text"
              placeholder="Position"
              value={intern.position}
              onChange={(e) => updateInternship(index, 'position', e.target.value)}
            />
            <input
              className="p-2 border rounded"
              type="text"
              placeholder="Duration"
              value={intern.duration}
              onChange={(e) => updateInternship(index, 'duration', e.target.value)}
            />
            <textarea
              className="p-2 border rounded"
              placeholder="Responsibilities"
              value={intern.responsibilities}
              onChange={(e) => updateInternship(index, 'responsibilities', e.target.value)}
            />
          </div>
        ))}
        <button className="mb-4 bg-blue-600 text-white px-4 py-2 rounded" onClick={addInternship}>+ Add Internship</button>

        {/* College Activities */}
        <h2 className="text-xl font-bold mt-6 mb-2">College Activities</h2>
        {profile.collegeActivities.map((act, index) => (
          <div key={index} className="grid grid-cols-1 gap-2 mb-4 border p-4 rounded">
            <input
              className="p-2 border rounded"
              type="text"
              placeholder="Activity Name"
              value={act.name}
              onChange={(e) => updateActivity(index, 'name', e.target.value)}
            />
            <input
              className="p-2 border rounded"
              type="text"
              placeholder="Role"
              value={act.role}
              onChange={(e) => updateActivity(index, 'role', e.target.value)}
            />
            <input
              className="p-2 border rounded"
              type="text"
              placeholder="Duration"
              value={act.duration}
              onChange={(e) => updateActivity(index, 'duration', e.target.value)}
            />
            <textarea
              className="p-2 border rounded"
              placeholder="Description"
              value={act.description}
              onChange={(e) => updateActivity(index, 'description', e.target.value)}
            />
          </div>
        ))}
        <button className="mb-4 bg-green-600 text-white px-4 py-2 rounded" onClick={addActivity}>+ Add Activity</button>

        {/* Documents */}
        <h2 className="text-xl font-bold mt-6 mb-2">Documents</h2>
        <div className="mb-4">
          <label className="block font-semibold">Resume</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => handleFileChange('resume', e.target.files)}
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Cover Letter</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => handleFileChange('coverLetter', e.target.files)}
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Certificates</label>
          <input
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileChange('certificates', e.target.files)}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentProfileAndSettings;
