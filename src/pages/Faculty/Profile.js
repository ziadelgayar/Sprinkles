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
            <div className="p-6 max-w-3xl mx-auto space-y-8">
                <h1 className="text-2xl font-bold mb-4">Profile</h1>

                <div className="custom-box mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Personal Information</h2>
                        {!isEditing ? (
                            <button className="accept-btn" onClick={handleEdit}>
                                Edit Profile
                            </button>
                        ) : (
                            <div className="flex gap-2">
                                <button className="save-btn" onClick={handleSave}>
                                    Save Changes
                                </button>
                                <button className="cancel-btn" onClick={handleCancel}>
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block font-semibold mb-1">Name: </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="name"
                                    className="w-full p-2 border rounded"
                                    value={editedProfile.name}
                                    onChange={handleChange}
                                />
                            ) : (
                                <p className="p-2 bg-gray-50 rounded">{profile.name}</p>
                            )}
                        </div>

                        <div>
                            <label className="block font-semibold mb-1">Email: </label>
                            {isEditing ? (
                                <input
                                    type="email"
                                    name="email"
                                    className="w-full p-2 border rounded"
                                    value={editedProfile.email}
                                    onChange={handleChange}
                                />
                            ) : (
                                <p className="p-2 bg-gray-50 rounded">{profile.email}</p>
                            )}
                        </div>

                        <div>
                            <label className="block font-semibold mb-1">Department: </label>
                            {isEditing ? (
                                <select
                                    name="department"
                                    className="w-full p-2 border rounded bg-white text-gray-900"
                                    value={editedProfile.department}
                                    onChange={handleChange}
                                >
                                    <option value="Computer Science">Computer Science</option>
                                    <option value="Data Science">Data Science</option>
                                    <option value="UI/UX Design">UI/UX Design</option>
                                </select>
                            ) : (
                                <p className="p-2 bg-gray-50 rounded">{profile.department}</p>
                            )}
                        </div>

                        <div>
                            <label className="block font-semibold mb-1">Position: </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="position"
                                    className="w-full p-2 border rounded"
                                    value={editedProfile.position}
                                    onChange={handleChange}
                                />
                            ) : (
                                <p className="p-2 bg-gray-50 rounded">{profile.position}</p>
                            )}
                        </div>

                        <div>
                            <label className="block font-semibold mb-1">Phone: </label>
                            {isEditing ? (
                                <input
                                    type="tel"
                                    name="phone"
                                    className="w-full p-2 border rounded"
                                    value={editedProfile.phone}
                                    onChange={handleChange}
                                />
                            ) : (
                                <p className="p-2 bg-gray-50 rounded">{profile.phone}</p>
                            )}
                        </div>

                        <div>
                            <label className="block font-semibold mb-1">Office: </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="office"
                                    className="w-full p-2 border rounded"
                                    value={editedProfile.office}
                                    onChange={handleChange}
                                />
                            ) : (
                                <p className="p-2 bg-gray-50 rounded">{profile.office}</p>
                            )}
                        </div>

                        <div>
                            <label className="block font-semibold mb-1">Office Hours: </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="officeHours"
                                    className="w-full p-2 border rounded"
                                    value={editedProfile.officeHours}
                                    onChange={handleChange}
                                />
                            ) : (
                                <p className="p-2 bg-gray-50 rounded">{profile.officeHours}</p>
                            )}
                        </div>

                        <div>
                            <label className="block font-semibold mb-1 ">Biography: </label>
                            {isEditing ? (
                                <textarea
                                    name="biography"
                                    className="w-full p-2 border rounded"
                                    value={editedProfile.biography}
                                    onChange={handleChange}
                                    rows="4"
                                />
                            ) : (
                                <p className="p-2 bg-gray-50 rounded">{profile.biography}</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="custom-box">
                    <h2 className="text-xl font-bold mb-4">Documents</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="document-item">
                            <h3 className="font-semibold mb-2">CV</h3>
                            <input type="file" accept=".pdf,.doc,.docx" className="w-full p-2 border rounded bg-white text-gray-900" />
                        </div>
                        <div className="document-item">
                            <h3 className="font-semibold mb-2">Certificates</h3>
                            <input type="file" accept=".pdf,.jpg,.png" multiple className="w-full p-2 border rounded bg-white text-gray-900" />
                        </div>
                        <div className="document-item">
                            <h3 className="font-semibold mb-2">Publications</h3>
                            <input type="file" accept=".pdf" multiple className="w-full p-2 border rounded bg-white text-gray-900" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile; 