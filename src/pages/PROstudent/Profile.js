import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';

const StudentProfileAndSettings = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    password: '',
    major: '',
    semester: '',
    jobInterests: {
      industries: [],
      jobTypes: []
    },
    previousInternships: [],
    partTimeJobs: [],
    collegeActivities: [],
    skills: [],
    onlineAssessment: {
      score: '',
      isPublic: false,
      lastUpdated: null
    },
    documents: {
      resume: null,
      coverLetter: null,
      certificates: []
    },
    isProStudent: true
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
    // Only add if there are no internships or the last one has data
    const lastInternship = profile.previousInternships[profile.previousInternships.length - 1];
    if (!lastInternship || (lastInternship.company && lastInternship.position)) {
      setProfile({
        ...profile,
        previousInternships: [
          ...profile.previousInternships,
          { company: '', position: '', duration: '', responsibilities: '' }
        ]
      });
    }
  };

  // Remove an internship entry
  const removeInternship = (index) => {
    setProfile({
      ...profile,
      previousInternships: profile.previousInternships.filter((_, idx) => idx !== index)
    });
  };

  // Add a new part-time job entry
  const addPartTimeJob = () => {
    // Only add if there are no jobs or the last one has data
    const lastJob = profile.partTimeJobs[profile.partTimeJobs.length - 1];
    if (!lastJob || (lastJob.company && lastJob.position)) {
      setProfile({
        ...profile,
        partTimeJobs: [
          ...profile.partTimeJobs,
          { company: '', position: '', duration: '', responsibilities: '' }
        ]
      });
    }
  };

  // Remove a part-time job entry
  const removePartTimeJob = (index) => {
    setProfile({
      ...profile,
      partTimeJobs: profile.partTimeJobs.filter((_, idx) => idx !== index)
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

  // Update part-time job fields dynamically
  const updatePartTimeJob = (index, field, value) => {
    setProfile({
      ...profile,
      partTimeJobs: profile.partTimeJobs.map((job, idx) =>
        idx === index ? { ...job, [field]: value } : job
      )
    });
  };

  // Add a new college activity entry
  const addActivity = () => {
    // Only add if there are no activities or the last one has data
    const lastActivity = profile.collegeActivities[profile.collegeActivities.length - 1];
    if (!lastActivity || (lastActivity.name && lastActivity.role)) {
      setProfile({
        ...profile,
        collegeActivities: [
          ...profile.collegeActivities,
          { name: '', role: '', duration: '', description: '' }
        ]
      });
    }
  };

  // Remove a college activity entry
  const removeActivity = (index) => {
    setProfile({
      ...profile,
      collegeActivities: profile.collegeActivities.filter((_, idx) => idx !== index)
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

  // Handle online assessment score update
  const handleAssessmentUpdate = (score) => {
    setProfile({
      ...profile,
      onlineAssessment: {
        score,
        isPublic: profile.onlineAssessment.isPublic,
        lastUpdated: new Date().toISOString()
      }
    });
  };

  // Toggle assessment score visibility
  const toggleAssessmentVisibility = () => {
    setProfile({
      ...profile,
      onlineAssessment: {
        ...profile.onlineAssessment,
        isPublic: !profile.onlineAssessment.isPublic
      }
    });
  };

  const downloadDocument = (document) => {
    if (!document) return;
    
    const doc = new jsPDF();
    doc.text(`Document: ${document.name}`, 10, 10);
    doc.text(`Type: ${document.type || 'Document'}`, 10, 20);
    doc.text(`Uploaded: ${new Date().toLocaleDateString()}`, 10, 30);
    doc.text('This is a placeholder for the actual document content.', 10, 40);
    doc.save(document.name);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold">Student Profile</h1>
        {profile.isProStudent && (
          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full ml-2">
            ProStudent
          </span>
        )}
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
        <label className="block font-semibold">Email</label>
        <input
          className="w-full p-2 border rounded"
          type="email"
          value={profile.email}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Password</label>
        <input
          className="w-full p-2 border rounded"
          type="password"
          value={profile.password}
          onChange={(e) => setProfile({ ...profile, password: e.target.value })}
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
          <option value="design">Design</option>
          <option value="marketing">Marketing</option>
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

      {/* Online Assessment Score */}
      <div className="mb-4">
        <h2 className="text-xl font-bold mt-6 mb-2">Online Assessment Score</h2>
        <div className="mb-4">
          <label className="block font-semibold">Score</label>
          <input
            className="w-full p-2 border rounded"
            type="number"
            value={profile.onlineAssessment.score}
            onChange={(e) => handleAssessmentUpdate(e.target.value)}
            min="0"
            max="100"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">
            <input
              className="mr-2"
              type="checkbox"
              checked={profile.onlineAssessment.isPublic}
              onChange={toggleAssessmentVisibility}
            />
            Make score visible to companies
          </label>
        </div>
        {profile.onlineAssessment.lastUpdated && (
          <p className="text-sm text-gray-500">Last updated: {new Date(profile.onlineAssessment.lastUpdated).toLocaleDateString()}</p>
        )}
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
          <option value="marketing">Marketing</option>
          <option value="finance">Finance</option>
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
        <div key={index} className="grid grid-cols-1 gap-2 mb-4 border p-4 rounded relative">
          <button
            className="absolute top-2 right-2 text-red-600 hover:text-red-800"
            onClick={() => removeInternship(index)}
          >
            ×
          </button>
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
      <button 
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed" 
        onClick={addInternship}
        disabled={profile.previousInternships.length > 0 && 
          (!profile.previousInternships[profile.previousInternships.length - 1].company || 
           !profile.previousInternships[profile.previousInternships.length - 1].position)}
      >
        + Add Internship
      </button>

      {/* Part-time Jobs */}
      <h2 className="text-xl font-bold mt-6 mb-2">Part-time Jobs</h2>
      {profile.partTimeJobs.map((job, index) => (
        <div key={index} className="grid grid-cols-1 gap-2 mb-4 border p-4 rounded relative">
          <button
            className="absolute top-2 right-2 text-red-600 hover:text-red-800"
            onClick={() => removePartTimeJob(index)}
          >
            ×
          </button>
          <input
            className="p-2 border rounded"
            type="text"
            placeholder="Company"
            value={job.company}
            onChange={(e) => updatePartTimeJob(index, 'company', e.target.value)}
          />
          <input
            className="p-2 border rounded"
            type="text"
            placeholder="Position"
            value={job.position}
            onChange={(e) => updatePartTimeJob(index, 'position', e.target.value)}
          />
          <input
            className="p-2 border rounded"
            type="text"
            placeholder="Duration"
            value={job.duration}
            onChange={(e) => updatePartTimeJob(index, 'duration', e.target.value)}
          />
          <textarea
            className="p-2 border rounded"
            placeholder="Responsibilities"
            value={job.responsibilities}
            onChange={(e) => updatePartTimeJob(index, 'responsibilities', e.target.value)}
          />
        </div>
      ))}
      <button 
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed" 
        onClick={addPartTimeJob}
        disabled={profile.partTimeJobs.length > 0 && 
          (!profile.partTimeJobs[profile.partTimeJobs.length - 1].company || 
           !profile.partTimeJobs[profile.partTimeJobs.length - 1].position)}
      >
        + Add Part-time Job
      </button>

      {/* College Activities */}
      <h2 className="text-xl font-bold mt-6 mb-2">College Activities</h2>
      {profile.collegeActivities.map((act, index) => (
        <div key={index} className="grid grid-cols-1 gap-2 mb-4 border p-4 rounded relative">
          <button
            className="absolute top-2 right-2 text-red-600 hover:text-red-800"
            onClick={() => removeActivity(index)}
          >
            ×
          </button>
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
      <button 
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed" 
        onClick={addActivity}
        disabled={profile.collegeActivities.length > 0 && 
          (!profile.collegeActivities[profile.collegeActivities.length - 1].name || 
           !profile.collegeActivities[profile.collegeActivities.length - 1].role)}
      >
        + Add Activity
      </button>

      {/* Documents */}
      <h2 className="text-xl font-bold mt-6 mb-2">Documents</h2>
      <div className="mb-4">
        <label className="block font-semibold">Resume</label>
        <div className="flex items-center gap-4">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => handleFileChange('resume', e.target.files)}
          />
          {profile.documents.resume && (
            <button 
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => downloadDocument(profile.documents.resume)}
            >
              Download PDF
            </button>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Cover Letter</label>
        <div className="flex items-center gap-4">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => handleFileChange('coverLetter', e.target.files)}
          />
          {profile.documents.coverLetter && (
            <button 
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => downloadDocument(profile.documents.coverLetter)}
            >
              Download PDF
            </button>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Certificates</label>
        <div className="flex items-center gap-4">
          <input
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileChange('certificates', e.target.files)}
          />
        </div>
        {profile.documents.certificates && profile.documents.certificates.length > 0 && (
          <div className="mt-2">
            <h3 className="font-semibold">Uploaded Certificates:</h3>
            <ul className="list-disc pl-5">
              {profile.documents.certificates.map((cert, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span>{cert.name}</span>
                  <button 
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => downloadDocument(cert)}
                  >
                    Download PDF
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded" onClick={() => console.log('Profile saved:', profile)}>Save Changes</button>
    </div>
  );
};

export default StudentProfileAndSettings;
