import React, { useState } from 'react';

const StudentProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    major: '',
    semester: '',
    jobInterests: [],
    previousInternships: [],
    collegeActivities: [],
    skills: [],
    documents: {
      resume: null,
      coverLetter: null,
      certificates: []
    }
  });

  return (
    <div className="student-profile">
      <div className="page-header">
        <h1>Student Profile</h1>
      </div>

      <div className="profile-sections">
        <div className="basic-info-section">
          <h2>Basic Information</h2>
          <div className="profile-form">
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Major</label>
              <select 
                value={profile.major}
                onChange={(e) => setProfile({...profile, major: e.target.value})}
              >
                <option value="">Select Major</option>
                {/* Majors will be mapped here */}
              </select>
            </div>

            <div className="form-group">
              <label>Semester</label>
              <select 
                value={profile.semester}
                onChange={(e) => setProfile({...profile, semester: e.target.value})}
              >
                <option value="">Select Semester</option>
                {/* Semesters will be mapped here */}
              </select>
            </div>
          </div>
        </div>

        <div className="job-interests-section">
          <h2>Job Interests</h2>
          <div className="interests-form">
            <div className="form-group">
              <label>Industries</label>
              <select multiple>
                <option value="tech">Technology</option>
                <option value="design">Design</option>
                <option value="business">Business</option>
              </select>
            </div>
            <div className="form-group">
              <label>Job Types</label>
              <select multiple>
                <option value="internship">Internship</option>
                <option value="part-time">Part-time</option>
                <option value="full-time">Full-time</option>
              </select>
            </div>
          </div>
        </div>

        <div className="experience-section">
          <h2>Previous Experience</h2>
          <div className="experience-form">
            <div className="form-group">
              <label>Previous Internships</label>
              <div className="experience-list">
                {profile.previousInternships.map((internship, index) => (
                  <div key={index} className="experience-item">
                    <input type="text" placeholder="Company Name" />
                    <input type="text" placeholder="Position" />
                    <input type="text" placeholder="Duration" />
                    <textarea placeholder="Responsibilities"></textarea>
                  </div>
                ))}
                <button className="add-experience-btn">Add Internship</button>
              </div>
            </div>
          </div>
        </div>

        <div className="activities-section">
          <h2>College Activities</h2>
          <div className="activities-form">
            <div className="form-group">
              <label>Activities</label>
              <div className="activities-list">
                {profile.collegeActivities.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <input type="text" placeholder="Activity Name" />
                    <input type="text" placeholder="Role" />
                    <input type="text" placeholder="Duration" />
                    <textarea placeholder="Description"></textarea>
                  </div>
                ))}
                <button className="add-activity-btn">Add Activity</button>
              </div>
            </div>
          </div>
        </div>

        <div className="documents-section">
          <h2>Documents</h2>
          <div className="documents-form">
            <div className="form-group">
              <label>Resume</label>
              <input type="file" accept=".pdf,.doc,.docx" />
            </div>
            <div className="form-group">
              <label>Cover Letter</label>
              <input type="file" accept=".pdf,.doc,.docx" />
            </div>
            <div className="form-group">
              <label>Certificates</label>
              <input type="file" multiple accept=".pdf,.jpg,.png" />
            </div>
          </div>
        </div>

        <div className="profile-actions">
          <button className="save-btn">Save Changes</button>
          <button className="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
