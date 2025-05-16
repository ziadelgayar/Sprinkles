import React, { useState } from 'react';

const CompanyProfile = () => {
  const [profile, setProfile] = useState({
    companyName: '',
    industry: '',
    location: '',
    description: '',
    contactEmail: '',
    website: '',
    logo: null,
    socialMedia: {
      linkedin: '',
      twitter: '',
      facebook: ''
    }
  });

  return (
    <div className="main-content">
      <div className="company-profile">
        <div className="page-header">
          <h1>Company Profile</h1>
        </div>

        <div className="profile-sections">
          <div className="custom-box">
            <h2>Basic Information</h2>
            <div className="profile-form">
              <div className="form-group">
                <label>Company Name</label>
                <input 
                  type="text" 
                  value={profile.companyName}
                  onChange={(e) => setProfile({...profile, companyName: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Industry</label>
                <input 
                  type="text" 
                  value={profile.industry}
                  onChange={(e) => setProfile({...profile, industry: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input 
                  type="text" 
                  value={profile.location}
                  onChange={(e) => setProfile({...profile, location: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  value={profile.description}
                  onChange={(e) => setProfile({...profile, description: e.target.value})}
                />
              </div>
            </div>
          </div>
          <div className="custom-box">
            <h2>Contact Information</h2>
            <div className="profile-form">
              <div className="form-group">
                <label>Contact Email</label>
                <input 
                  type="email" 
                  value={profile.contactEmail}
                  onChange={(e) => setProfile({...profile, contactEmail: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Website</label>
                <input 
                  type="url" 
                  value={profile.website}
                  onChange={(e) => setProfile({...profile, website: e.target.value})}
                />
              </div>
            </div>
          </div>
          <div className="custom-box">
            <h2>Social Media</h2>
            <div className="profile-form">
              <div className="form-group">
                <label>LinkedIn</label>
                <input 
                  type="url" 
                  value={profile.socialMedia.linkedin}
                  onChange={(e) => setProfile({
                    ...profile, 
                    socialMedia: {...profile.socialMedia, linkedin: e.target.value}
                  })}
                />
              </div>
              <div className="form-group">
                <label>Twitter</label>
                <input 
                  type="url" 
                  value={profile.socialMedia.twitter}
                  onChange={(e) => setProfile({
                    ...profile, 
                    socialMedia: {...profile.socialMedia, twitter: e.target.value}
                  })}
                />
              </div>
              <div className="form-group">
                <label>Facebook</label>
                <input 
                  type="url" 
                  value={profile.socialMedia.facebook}
                  onChange={(e) => setProfile({
                    ...profile, 
                    socialMedia: {...profile.socialMedia, facebook: e.target.value}
                  })}
                />
              </div>
            </div>
          </div>
          <div className="profile-actions">
            <button className="save-btn">Save Changes</button>
            <button className="cancel-btn">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
