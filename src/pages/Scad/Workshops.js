import React, { useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ScadWorkshops = () => {
  const [workshops, setWorkshops] = useState({
    upcoming: [
      {
        id: 1,
        title: 'Resume Building 101',
        description: 'Learn how to create a professional resume.',
        date: '2025-06-01',
        time: '10:00 AM',
        duration: '2 hours'
      },
      {
        id: 2,
        title: 'Ace Your Interviews',
        description: 'Tips and tricks for successful interviews.',
        date: '2025-06-05',
        time: '2:00 PM',
        duration: '1.5 hours'
      }
    ],
    registered: [],
    recorded: [
      {
        id: 3,
        title: 'LinkedIn Optimization',
        description: 'Make the most of your LinkedIn profile.',
        videoUrl: 'https://pixabay.com/videos/id-1234567/download/video.mp4'
      }
    ]
  });

  const [activeWorkshop, setActiveWorkshop] = useState(null);
  const [notes, setNotes] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const videoRef = useRef(null);

  // New state for add/edit workshop form
  const [newWorkshop, setNewWorkshop] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    duration: ''
  });
  const [editWorkshopId, setEditWorkshopId] = useState(null);
  const [editWorkshopData, setEditWorkshopData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    duration: ''
  });

  // Register a workshop (move upcoming -> registered)
  const handleRegister = (workshopId) => {
    const workshop = workshops.upcoming.find(w => w.id === workshopId);
    if (workshop) {
      setWorkshops(prev => ({
        ...prev,
        registered: [...prev.registered, workshop],
        upcoming: prev.upcoming.filter(w => w.id !== workshopId)
      }));
      toast.success(`You have successfully registered for "${workshop.title}"!`);
    }
  };

  const handleJoinWorkshop = (workshopId) => {
    const workshop = workshops.registered.find(w => w.id === workshopId);
    if (workshop) {
      setActiveWorkshop(workshop);
    }
  };

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      setChatMessages([...chatMessages, { sender: 'You', text: chatInput }]);
      setChatInput('');
    }
  };

  const handleDownloadCertificate = () => {
    const element = document.createElement('a');
    const file = new Blob([
      `Certificate of Attendance\n${activeWorkshop.title}\nDate: ${activeWorkshop.date}`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'Certificate.txt';
    document.body.appendChild(element);
    element.click();
  };

  const handlePlay = () => videoRef.current?.play();
  const handlePause = () => videoRef.current?.pause();
  const handleStop = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleSubmitFeedback = () => {
    if (!rating || !feedback.trim()) {
      toast.error('Please provide both a rating and feedback.');
      return;
    }
    toast.success('Thank you for your feedback!');
    setRating(0);
    setFeedback('');
  };

  // === New CRUD functions ===

  // Add new workshop
  const handleAddWorkshop = (e) => {
    e.preventDefault();
    const { title, description, date, time, duration } = newWorkshop;
    if (!title || !description || !date || !time || !duration) {
      toast.error('Please fill in all fields to add a workshop.');
      return;
    }
    const newId = Math.max(0, ...workshops.upcoming.map(w => w.id)) + 1;
    const workshopToAdd = { id: newId, ...newWorkshop };
    setWorkshops(prev => ({
      ...prev,
      upcoming: [...prev.upcoming, workshopToAdd]
    }));
    setNewWorkshop({ title: '', description: '', date: '', time: '', duration: '' });
    toast.success('Workshop added successfully.');
  };

  // Start editing a workshop
  const handleEditClick = (workshop) => {
    setEditWorkshopId(workshop.id);
    setEditWorkshopData({
      title: workshop.title,
      description: workshop.description,
      date: workshop.date,
      time: workshop.time,
      duration: workshop.duration
    });
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditWorkshopId(null);
    setEditWorkshopData({ title: '', description: '', date: '', time: '', duration: '' });
  };

  // Save edited workshop
  const handleSaveEdit = (workshopId) => {
    const { title, description, date, time, duration } = editWorkshopData;
    if (!title || !description || !date || !time || !duration) {
      toast.error('Please fill in all fields to update the workshop.');
      return;
    }
    setWorkshops(prev => ({
      ...prev,
      upcoming: prev.upcoming.map(w =>
        w.id === workshopId ? { ...w, title, description, date, time, duration } : w
      )
    }));
    setEditWorkshopId(null);
    toast.success('Workshop updated successfully.');
  };

  // Delete a workshop
  const handleDeleteWorkshop = (workshopId) => {
    setWorkshops(prev => ({
      ...prev,
      upcoming: prev.upcoming.filter(w => w.id !== workshopId)
    }));
    toast.info('Workshop deleted.');
    if (editWorkshopId === workshopId) {
      handleCancelEdit();
    }
  };

  return (
    <div className="main-content">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="student-workshops">
        <div className="page-header">
          <h1>Career Workshops</h1>
        </div>

        {/* Add New Workshop Form */}
        <div className="add-workshop-form" style={{ marginBottom: '24px', padding: '16px', border: '1px solid #4fd1c5', borderRadius: '8px', background: '#202940', color: '#fff' }}>
          <h2>Add New Workshop</h2>
          <form onSubmit={handleAddWorkshop} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input
              type="text"
              placeholder="Title"
              value={newWorkshop.title}
              onChange={e => setNewWorkshop({ ...newWorkshop, title: e.target.value })}
              style={{ padding: '8px', borderRadius: '6px', border: '1px solid #4fd1c5', background: '#181c2a', color: '#fff' }}
            />
            <textarea
              placeholder="Description"
              value={newWorkshop.description}
              onChange={e => setNewWorkshop({ ...newWorkshop, description: e.target.value })}
              style={{ padding: '8px', borderRadius: '6px', border: '1px solid #4fd1c5', background: '#181c2a', color: '#fff', minHeight: '60px' }}
            />
            <input
              type="date"
              value={newWorkshop.date}
              onChange={e => setNewWorkshop({ ...newWorkshop, date: e.target.value })}
              style={{ padding: '8px', borderRadius: '6px', border: '1px solid #4fd1c5', background: '#181c2a', color: '#fff' }}
            />
            <input
              type="time"
              value={newWorkshop.time}
              onChange={e => setNewWorkshop({ ...newWorkshop, time: e.target.value })}
              style={{ padding: '8px', borderRadius: '6px', border: '1px solid #4fd1c5', background: '#181c2a', color: '#fff' }}
            />
            <input
              type="text"
              placeholder="Duration (e.g., 2 hours)"
              value={newWorkshop.duration}
              onChange={e => setNewWorkshop({ ...newWorkshop, duration: e.target.value })}
              style={{ padding: '8px', borderRadius: '6px', border: '1px solid #4fd1c5', background: '#181c2a', color: '#fff' }}
            />
            <button type="submit" className="accept-btn" style={{ alignSelf: 'start' }}>Add Workshop</button>
          </form>
        </div>

        <div className="workshops-content">

          {/* Upcoming Workshops */}
          <div className="upcoming-workshops">
            <h2>Upcoming Workshops</h2>
            <div className="workshop-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {workshops.upcoming.map((workshop) => (
                <div key={workshop.id} className="custom-box" style={{ position: 'relative' }}>
                  {editWorkshopId === workshop.id ? (
                    // Edit form for this workshop
                    <>
                      <input
                        type="text"
                        value={editWorkshopData.title}
                        onChange={e => setEditWorkshopData({ ...editWorkshopData, title: e.target.value })}
                        style={{ padding: '6px', marginBottom: '6px', width: '100%', borderRadius: '6px', border: '1px solid #4fd1c5', background: '#181c2a', color: '#fff' }}
                      />
                      <textarea
                        value={editWorkshopData.description}
                        onChange={e => setEditWorkshopData({ ...editWorkshopData, description: e.target.value })}
                        style={{ padding: '6px', marginBottom: '6px', width: '100%', borderRadius: '6px', border: '1px solid #4fd1c5', background: '#181c2a', color: '#fff' }}
                      />
                      <input
                        type="date"
                        value={editWorkshopData.date}
                        onChange={e => setEditWorkshopData({ ...editWorkshopData, date: e.target.value })}
                        style={{ padding: '6px', marginBottom: '6px', borderRadius: '6px', border: '1px solid #4fd1c5', background: '#181c2a', color: '#fff' }}
                      />
                      <input
                        type="time"
                        value={editWorkshopData.time}
                        onChange={e => setEditWorkshopData({ ...editWorkshopData, time: e.target.value })}
                        style={{ padding: '6px', marginBottom: '6px', borderRadius: '6px', border: '1px solid #4fd1c5', background: '#181c2a', color: '#fff' }}
                      />
                      <input
                        type="text"
                        value={editWorkshopData.duration}
                        onChange={e => setEditWorkshopData({ ...editWorkshopData, duration: e.target.value })}
                        style={{ padding: '6px', marginBottom: '6px', borderRadius: '6px', border: '1px solid #4fd1c5', background: '#181c2a', color: '#fff' }}
                      />
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="accept-btn" onClick={() => handleSaveEdit(workshop.id)}>Save</button>
                        <button className="reject-btn" onClick={handleCancelEdit}>Cancel</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3>{workshop.title}</h3>
                      <p>{workshop.description}</p>
                      <p>Date: {workshop.date}</p>
                      <p>Time: {workshop.time}</p>
                      <p>Duration: {workshop.duration}</p>
                      <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                        <button className="accept-btn" onClick={() => handleRegister(workshop.id)}>Register</button>
                        <button className="edit-btn" onClick={() => handleEditClick(workshop)}>Edit</button>
                        <button className="reject-btn" onClick={() => handleDeleteWorkshop(workshop.id)}>Delete</button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Registered Workshops */}
          <div className="registered-workshops">
            <h2>Registered Workshops</h2>
            <div className="workshop-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {workshops.registered.length === 0 && <p>You have not registered for any workshops yet.</p>}
              {workshops.registered.map((workshop) => (
                <div key={workshop.id} className="custom-box">
                  <h3>{workshop.title}</h3>
                  <p>{workshop.description}</p>
                  <p>Date: {workshop.date}</p>
                  <p>Time: {workshop.time}</p>
                  <p>Duration: {workshop.duration}</p>
                  <button className="accept-btn" onClick={() => handleJoinWorkshop(workshop.id)}>Join Workshop</button>
                </div>
              ))}
            </div>
          </div>

          {/* Recorded Workshops */}
          <div className="recorded-workshops">
            <h2>Recorded Workshops</h2>
            <div className="workshop-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {workshops.recorded.length === 0 && <p>No recorded workshops available.</p>}
              {workshops.recorded.map((workshop) => (
                <div key={workshop.id} className="custom-box">
                  <h3>{workshop.title}</h3>
                  <p>{workshop.description}</p>
                  <video controls width="100%" src={workshop.videoUrl} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active Workshop Video & Interaction */}
        {activeWorkshop && (
          <div className="active-workshop" style={{ marginTop: '32px' }}>
            <h2>Active Workshop: {activeWorkshop.title}</h2>
            <video ref={videoRef} width="600" controls src={activeWorkshop.videoUrl || ''} style={{ maxWidth: '100%' }} />
            <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
              <button className="accept-btn" onClick={handlePlay}>Play</button>
              <button className="reject-btn" onClick={handlePause}>Pause</button>
              <button className="reject-btn" onClick={handleStop}>Stop</button>
              <button className="accept-btn" onClick={handleDownloadCertificate}>Download Certificate</button>
            </div>

            {/* Notes */}
            <div style={{ marginTop: '24px' }}>
              <h3>Notes</h3>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Write your notes here..."
                style={{ width: '100%', height: '120px', borderRadius: '8px', padding: '8px', background: '#181c2a', color: '#fff', border: '1px solid #4fd1c5' }}
              />
            </div>

            {/* Chat */}
            <div style={{ marginTop: '24px' }}>
              <h3>Chat</h3>
              <div className="chat-box" style={{ maxHeight: '200px', overflowY: 'auto', background: '#202940', padding: '12px', borderRadius: '8px', color: '#fff' }}>
                {chatMessages.map((msg, idx) => (
                  <p key={idx}><b>{msg.sender}:</b> {msg.text}</p>
                ))}
              </div>
              <input
                type="text"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message and hit Enter"
                style={{ marginTop: '8px', width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #4fd1c5', background: '#181c2a', color: '#fff' }}
              />
            </div>

            {/* Feedback & Rating */}
            <div style={{ marginTop: '24px' }}>
              <h3>Feedback & Rating</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    style={{
                      cursor: 'pointer',
                      color: star <= rating ? '#4fd1c5' : '#555',
                      fontSize: '24px'
                    }}
                    onClick={() => setRating(star)}
                    aria-label={`${star} star${star > 1 ? 's' : ''}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <textarea
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
                placeholder="Write your feedback here..."
                style={{ width: '100%', height: '80px', borderRadius: '8px', padding: '8px', background: '#181c2a', color: '#fff', border: '1px solid #4fd1c5', marginTop: '8px' }}
              />
              <button className="accept-btn" onClick={handleSubmitFeedback} style={{ marginTop: '8px' }}>Submit Feedback</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScadWorkshops;
