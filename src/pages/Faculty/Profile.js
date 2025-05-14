import React, { useState, useEffect } from 'react';

const Profile = () => {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        department: '',
        position: '',
        phone: '',
        office: '',
        officeHours: '',
        biography: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState({});

    useEffect(() => {
        // Dummy data for demonstration
        setProfile({
            name: 'Dr. Sarah Johnson',
            email: 'sarah.johnson@university.edu',
            department: 'Computer Science',
            position: 'Associate Professor',
            phone: '+1 (555) 123-4567',
            office: 'Building A, Room 302',
            officeHours: 'Monday, Wednesday 2:00 PM - 4:00 PM',
            biography: 'Dr. Sarah Johnson is an Associate Professor in the Computer Science department with over 10 years of experience in software engineering and artificial intelligence research.'
        });
    }, []);

    const handleEdit = () => {
        setEditedProfile({ ...profile });
        setIsEditing(true);
    };

    const handleSave = () => {
        setProfile(editedProfile);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProfile(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="main-content">
            <div className="faculty-profile">
                <h1>Profile </h1>

                <div className="profile-section">
                    <div className="profile-header">
                        <h2>Personal Information</h2>
                        {!isEditing ? (
                            <button className="edit-btn" onClick={handleEdit}>
                                Edit Profile
                            </button>
                        ) : (
                            <div className="edit-actions">
                                <button className="save-btn" onClick={handleSave}>
                                    Save Changes
                                </button>
                                <button className="cancel-btn" onClick={handleCancel}>
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="profile-content">
                        <div className="profile-field">
                            <label>Name</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={editedProfile.name}
                                    onChange={handleChange}
                                />
                            ) : (
                                <p>{profile.name}</p>
                            )}
                        </div>

                        <div className="profile-field">
                            <label>Email</label>
                            {isEditing ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={editedProfile.email}
                                    onChange={handleChange}
                                />
                            ) : (
                                <p>{profile.email}</p>
                            )}
                        </div>

                        <div className="profile-field">
                            <label>Department</label>
                            {isEditing ? (
                                <select
                                    name="department"
                                    value={editedProfile.department}
                                    onChange={handleChange}
                                >
                                    <option value="Computer Science">Computer Science</option>
                                    <option value="Data Science">Data Science</option>
                                    <option value="UI/UX Design">UI/UX Design</option>
                                </select>
                            ) : (
                                <p>{profile.department}</p>
                            )}
                        </div>

                        <div className="profile-field">
                            <label>Position</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="position"
                                    value={editedProfile.position}
                                    onChange={handleChange}
                                />
                            ) : (
                                <p>{profile.position}</p>
                            )}
                        </div>

                        <div className="profile-field">
                            <label>Phone</label>
                            {isEditing ? (
                                <input
                                    type="tel"
                                    name="phone"
                                    value={editedProfile.phone}
                                    onChange={handleChange}
                                />
                            ) : (
                                <p>{profile.phone}</p>
                            )}
                        </div>

                        <div className="profile-field">
                            <label>Office</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="office"
                                    value={editedProfile.office}
                                    onChange={handleChange}
                                />
                            ) : (
                                <p>{profile.office}</p>
                            )}
                        </div>

                        <div className="profile-field">
                            <label>Office Hours</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="officeHours"
                                    value={editedProfile.officeHours}
                                    onChange={handleChange}
                                />
                            ) : (
                                <p>{profile.officeHours}</p>
                            )}
                        </div>

                        <div className="profile-field">
                            <label>Biography</label>
                            {isEditing ? (
                                <textarea
                                    name="biography"
                                    value={editedProfile.biography}
                                    onChange={handleChange}
                                    rows="4"
                                />
                            ) : (
                                <p>{profile.biography}</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="documents-section">
                    <h2>Documents</h2>
                    <div className="document-uploads">
                        <div className="document-item">
                            <h3>CV</h3>
                            <input type="file" accept=".pdf,.doc,.docx" />
                        </div>
                        <div className="document-item">
                            <h3>Certificates</h3>
                            <input type="file" accept=".pdf,.jpg,.png" multiple />
                        </div>
                        <div className="document-item">
                            <h3>Publications</h3>
                            <input type="file" accept=".pdf" multiple />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile; 