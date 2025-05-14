import React, { useState } from 'react';

const StudentProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
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
    }
  });

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

  const addInternship = () => {
    setProfile({
      ...profile,
      previousInternships: [
        ...profile.previousInternships,
        { company: '', position: '', duration: '', responsibilities: '' }
      ]
    });
  };

  const updateInternship = (index, field, value) => {
    const updated = [...profile.previousInternships];
    updated[index][field] = value;
    setProfile({ ...profile, previousInternships: updated });
  };

  const addActivity = () => {
    setProfile({
      ...profile,
      collegeActivities: [
        ...profile.collegeActivities,
        { name: '', role: '', duration: '', description: '' }
      ]
    });
  };

  const updateActivity = (index, field, value) => {
    const updated = [...profile.collegeActivities];
    updated[index][field] = value;
    setProfile({ ...profile, collegeActivities: updated });
  };

  const handleSave = () => {
    // Submit profile logic here (e.g., send to backend)
    console.log('Profile saved:', profile);
  };

  const handleCancel = () => {
    // Reset or fetch initial state logic
    window.location.reload(); // temp simple reset
  };

  return (
    <div className="main-content">
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Student Profile</h1>

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
            accept=".pdf,.png,.jpg"
            onChange={(e) => handleFileChange('certificates', e.target.files)}
          />
        </div>

        {/* Save Actions */}
        <div className="flex gap-4 mt-6">
          <button className="bg-blue-700 text-white px-6 py-2 rounded" onClick={handleSave}>Save Changes</button>
          <button className="bg-gray-400 text-white px-6 py-2 rounded" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
