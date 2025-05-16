import React, { useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PROStudentWorkshops = () => {
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

  return (
    <div className="main-content">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="student-workshops">
        <div className="page-header">
          <h1>Career Workshops</h1>
        </div>
        <div className="workshops-content">
          {/* Upcoming Workshops */}
          <div className="upcoming-workshops">
            <h2>Upcoming Workshops</h2>
            <div className="workshop-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {workshops.upcoming.map((workshop) => (
                <div key={workshop.id} className="custom-box">
                  <h3>{workshop.title}</h3>
                  <p>{workshop.description}</p>
                  <div className="workshop-details">
                    <p>Date: {workshop.date}</p>
                    <p>Time: {workshop.time}</p>
                    <p>Duration: {workshop.duration}</p>
                  </div>
                  <button className="reject-btn" onClick={() => handleRegister(workshop.id)}>Register</button>
                </div>
              ))}
            </div>
          </div>
          {/* Registered Workshops */}
          <div className="registered-workshops">
            <h2>My Registered Workshops</h2>
            <div className="workshop-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {workshops.registered.map((workshop) => (
                <div key={workshop.id} className="custom-box">
                  <h3>{workshop.title}</h3>
                  <p>{workshop.description}</p>
                  <div className="workshop-details">
                    <p>Date: {workshop.date}</p>
                    <p>Time: {workshop.time}</p>
                  </div>
                  <button className="accept-btn" onClick={() => handleJoinWorkshop(workshop.id)}>Join Workshop</button>
                </div>
              ))}
            </div>
          </div>
          {/* Recorded Workshops */}
          <div className="recorded-workshops">
            <h2>Recorded Workshops</h2>
            <div className="workshop-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {workshops.recorded.map((workshop) => (
                <div key={workshop.id} className="custom-box">
                  <h3>{workshop.title}</h3>
                  <p>{workshop.description}</p>
                  <video ref={videoRef} width="100%" controls src={workshop.videoUrl}></video>
                  <div className="video-controls" style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
                    <button className="accept-btn" onClick={handlePlay}>Play</button>
                    <button className="cancel-btn" onClick={handlePause}>Pause</button>
                    <button className="reject-btn" onClick={handleStop}>Stop</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Active Workshop Section */}
        {activeWorkshop && (
          <div className="active-workshop" style={{ marginTop: '24px' }}>
            <div className="custom-box">
              <h3>Live workshop in session: {activeWorkshop.title}</h3>
              <p>{activeWorkshop.description}</p>
              <video width="100%" controls autoPlay>
                <source src="https://pixabay.com/videos/id-1234567/" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="custom-box" style={{ marginTop: '16px' }}>
              <h3>Notes</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Take your notes here..."
                style={{ width: '100%', minHeight: '60px', borderRadius: '8px', border: '1px solid #4fd1c5', background: '#181c2a', color: '#fff', padding: '8px' }}
              />
            </div>
            <div className="custom-box" style={{ marginTop: '16px' }}>
              <h3>Chat with Attendees</h3>
              <div className="chat-messages" style={{ maxHeight: '120px', overflowY: 'auto', marginBottom: '8px' }}>
                {chatMessages.map((message, index) => (
                  <div key={index} className="chat-message">
                    <span className="sender">{message.sender}:</span>
                    <span style={{ marginLeft: '6px' }}>{message.text}</span>
                  </div>
                ))}
              </div>
              <div className="chat-input" style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  style={{ flex: 1, borderRadius: '8px', border: '1px solid #4fd1c5', background: '#181c2a', color: '#fff', padding: '8px' }}
                />
                <button className="accept-btn" onClick={handleSendMessage}>Send</button>
              </div>
            </div>
            <div className="custom-box" style={{ marginTop: '16px' }}>
              <h3>Workshop Feedback</h3>
              <div className="rating" style={{ marginBottom: '8px' }}>
                <span>Rate this workshop:</span>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  style={{ marginLeft: '8px', width: '60px', borderRadius: '8px', border: '1px solid #4fd1c5', background: '#181c2a', color: '#fff', padding: '4px' }}
                />
              </div>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your feedback..."
                className="feedback-input"
                style={{ width: '100%', minHeight: '60px', borderRadius: '8px', border: '1px solid #4fd1c5', background: '#181c2a', color: '#fff', padding: '8px', marginBottom: '8px' }}
              />
              <button className="accept-btn" onClick={handleSubmitFeedback}>
                Submit Feedback
              </button>
            </div>
            <div className="custom-box" style={{ marginTop: '16px', textAlign: 'center' }}>
              <button className="accept-btn" onClick={handleDownloadCertificate}>
                Download Certificate
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PROStudentWorkshops; 