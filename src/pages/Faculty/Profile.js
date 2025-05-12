import React, { useState } from 'react';

const Profile = () => {
    const [profile, setProfile] = useState({
        name: 'Dr. John Smith',
        email: 'john.smith@scad.edu',
        department: 'Computer Science',
        position: 'Associate Professor',
        phone: '+1 (555) 123-4567',
        office: 'Building A, Room 301',
        officeHours: 'Monday-Friday, 10:00 AM - 12:00 PM',
        bio: 'Specializing in Software Engineering and Data Science. Over 10 years of experience in industry and academia.'
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState(profile);

    const handleEdit = () => {
        setIsEditing(true);
        setEditedProfile(profile);
    };

    const handleSave = () => {
        setProfile(editedProfile);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedProfile(profile);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProfile(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="student-profile">
            <div className="page-header">
                <h1>Faculty Profile</h1>
            </div>

            <div className="profile-sections">
                <div className="basic-info-section">
                    <h2>Basic Information</h2>
                    <div className="profile-form">
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={isEditing ? editedProfile.name : profile.name}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={isEditing ? editedProfile.email : profile.email}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>

                        <div className="form-group">
                            <label>Department</label>
                            <select
                                name="department"
                                value={isEditing ? editedProfile.department : profile.department}
                                onChange={handleChange}
                                disabled={!isEditing}
                            >
                                <option value="">Select Department</option>
                                <option value="Computer Science">Computer Science</option>
                                <option value="Media Engineering and Technology">Media Engineering and Technology</option>
                                <option value="Mechatronics">Mechatronics</option>
                                <option value="Networks">Networks</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Communications Engineering">Communications Engineering</option>
                                <option value="Management">Management</option>
                                <option value="Business Informatics">Business Informatics</option>
                                <option value="Applied Arts">Applied Arts</option>
                                <option value="Pharmacy">Pharmacy</option>
                                <option value="Biotechnology">Biotechnology</option>
                                <option value="Law">Law</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Position</label>
                            <select
                                name="position"
                                value={isEditing ? editedProfile.position : profile.position}
                                onChange={handleChange}
                                disabled={!isEditing}
                            >
                                <option value="">Select Position</option>
                                <option value="Professor">Professor</option>
                                <option value="Associate Professor">Associate Professor</option>
                                <option value="Assistant Professor">Assistant Professor</option>
                                <option value="Lecturer">Lecturer</option>
                                <option value="Adjunct Professor">Adjunct Professor</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={isEditing ? editedProfile.phone : profile.phone}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>

                        <div className="form-group">
                            <label>Office</label>
                            <input
                                type="text"
                                name="office"
                                value={isEditing ? editedProfile.office : profile.office}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>

                        <div className="form-group">
                            <label>Office Hours</label>
                            <input
                                type="text"
                                name="officeHours"
                                value={isEditing ? editedProfile.officeHours : profile.officeHours}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>

                        <div className="form-group">
                            <label>Biography</label>
                            <textarea
                                name="bio"
                                value={isEditing ? editedProfile.bio : profile.bio}
                                onChange={handleChange}
                                rows="4"
                                disabled={!isEditing}
                            />
                        </div>
                    </div>
                </div>

                <div className="documents-section">
                    <h2>Documents</h2>
                    <div className="documents-form">
                        <div className="form-group">
                            <label>CV/Resume</label>
                            <input type="file" accept=".pdf,.doc,.docx" />
                        </div>
                        <div className="form-group">
                            <label>Certificates</label>
                            <input type="file" multiple accept=".pdf,.jpg,.png" />
                        </div>
                        <div className="form-group">
                            <label>Publications</label>
                            <input type="file" multiple accept=".pdf" />
                        </div>
                    </div>
                </div>

                <div className="profile-actions">
                    {!isEditing ? (
                        <button className="save-btn" onClick={handleEdit}>
                            Edit Profile
                        </button>
                    ) : (
                        <>
                            <button className="save-btn" onClick={handleSave}>
                                Save Changes
                            </button>
                            <button className="cancel-btn" onClick={handleCancel}>
                                Cancel
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile; 