import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import './Workshops.css';

const PROStudentWorkshops = () => {
  const [workshops, setWorkshops] = useState({
    upcoming: [
      {
        id: 1,
        title: 'Resume Building Workshop',
        description: 'Learn how to create an impactful resume that stands out to employers.',
        date: '2024-03-20',
        time: '14:00',
        duration: '2 hours',
        type: 'live',
        instructor: 'John Smith',
        maxAttendees: 50,
        currentAttendees: 25,
        materials: ['Resume Template', 'Industry Guidelines'],
        requirements: ['Laptop', 'Microsoft Word'],
        category: 'Career Development'
      },
      {
        id: 2,
        title: 'Interview Preparation',
        description: 'Master the art of interviewing with practical tips and mock interviews.',
        date: '2024-03-25',
        time: '15:00',
        duration: '3 hours',
        type: 'live',
        instructor: 'Sarah Johnson',
        maxAttendees: 30,
        currentAttendees: 15,
        materials: ['Interview Questions Guide', 'Body Language Tips'],
        requirements: ['Webcam', 'Microphone'],
        category: 'Career Development'
      }
    ],
    registered: [],
    recorded: [
      {
        id: 3,
        title: 'Networking Strategies',
        description: 'Learn effective networking techniques for career growth.',
        duration: '1.5 hours',
        type: 'recorded',
        instructor: 'Michael Brown',
        videoUrl: 'https://example.com/workshop-video',
        materials: ['Networking Guide', 'LinkedIn Tips'],
        category: 'Career Development'
      }
    ]
  });

  const [activeWorkshop, setActiveWorkshop] = useState(null);
  const [notes, setNotes] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [videoState, setVideoState] = useState('paused'); // 'playing', 'paused', 'stopped'

  const handleRegister = (workshopId) => {
    const workshop = workshops.upcoming.find(w => w.id === workshopId);
    if (workshop && workshop.currentAttendees < workshop.maxAttendees) {
      setWorkshops(prev => ({
        ...prev,
        registered: [...prev.registered, workshop],
        upcoming: prev.upcoming.map(w => 
          w.id === workshopId 
            ? { ...w, currentAttendees: w.currentAttendees + 1 }
            : w
        )
      }));
    }
  };

  const handleJoinWorkshop = (workshopId) => {
    const workshop = workshops.registered.find(w => w.id === workshopId);
    if (workshop) {
      setActiveWorkshop(workshop);
      // Initialize workshop session
      setNotes('');
      setChatMessages([]);
      setVideoState('paused');
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages(prev => [...prev, {
        sender: 'You',
        text: newMessage,
        timestamp: new Date().toISOString()
      }]);
      setNewMessage('');
    }
  };

  const handleVideoControl = (action) => {
    setVideoState(action);
  };

  const generateCertificate = () => {
    if (!activeWorkshop) return;

    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Certificate of Attendance', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text(`This is to certify that`, 105, 40, { align: 'center' });
    doc.text(`[Student Name]`, 105, 50, { align: 'center' });
    doc.text(`has successfully attended the workshop`, 105, 60, { align: 'center' });
    doc.text(`"${activeWorkshop.title}"`, 105, 70, { align: 'center' });
    doc.text(`conducted by ${activeWorkshop.instructor}`, 105, 80, { align: 'center' });
    doc.text(`on ${activeWorkshop.date}`, 105, 90, { align: 'center' });
    
    doc.save(`certificate-${activeWorkshop.title}.pdf`);
  };

  const submitFeedback = () => {
    if (rating > 0 && feedback.trim()) {
      // Here you would typically send this to your backend
      alert('Thank you for your feedback!');
      setRating(0);
      setFeedback('');
    }
  };

  return (
    <div className="student-workshops">
      <div className="page-header">
        <h1>Career Workshops</h1>
      </div>

      <div className="workshops-content">
        <div className="upcoming-workshops">
          <h2>Upcoming Workshops</h2>
          <div className="workshop-list">
            {workshops.upcoming.map((workshop) => (
              <div key={workshop.id} className="workshop-card">
                <h3>{workshop.title}</h3>
                <p>{workshop.description}</p>
                <div className="workshop-details">
                  <p>Date: {workshop.date}</p>
                  <p>Time: {workshop.time}</p>
                  <p>Duration: {workshop.duration}</p>
                  <p>Instructor: {workshop.instructor}</p>
                  <p>Attendees: {workshop.currentAttendees}/{workshop.maxAttendees}</p>
                </div>
                <div className="workshop-materials">
                  <h4>Materials Required:</h4>
                  <ul>
                    {workshop.materials.map((material, index) => (
                      <li key={index}>{material}</li>
                    ))}
                  </ul>
                </div>
                <button 
                  className="register-btn"
                  onClick={() => handleRegister(workshop.id)}
                  disabled={workshop.currentAttendees >= workshop.maxAttendees}
                >
                  {workshop.currentAttendees >= workshop.maxAttendees ? 'Full' : 'Register'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="registered-workshops">
          <h2>My Registered Workshops</h2>
          <div className="workshop-list">
            {workshops.registered.map((workshop) => (
              <div key={workshop.id} className="workshop-card">
                <h3>{workshop.title}</h3>
                <p>{workshop.description}</p>
                <div className="workshop-details">
                  <p>Date: {workshop.date}</p>
                  <p>Time: {workshop.time}</p>
                  <p>Duration: {workshop.duration}</p>
                </div>
                <button 
                  className="join-btn"
                  onClick={() => handleJoinWorkshop(workshop.id)}
                >
                  Join Workshop
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="recorded-workshops">
          <h2>Recorded Workshops</h2>
          <div className="workshop-list">
            {workshops.recorded.map((workshop) => (
              <div key={workshop.id} className="workshop-card">
                <h3>{workshop.title}</h3>
                <p>{workshop.description}</p>
                <div className="video-controls">
                  <button 
                    className="play-btn"
                    onClick={() => handleVideoControl('playing')}
                    disabled={videoState === 'playing'}
                  >
                    Play
                  </button>
                  <button 
                    className="pause-btn"
                    onClick={() => handleVideoControl('paused')}
                    disabled={videoState === 'paused'}
                  >
                    Pause
                  </button>
                  <button 
                    className="stop-btn"
                    onClick={() => handleVideoControl('stopped')}
                    disabled={videoState === 'stopped'}
                  >
                    Stop
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {activeWorkshop && (
        <div className="active-workshop">
          <div className="workshop-header">
            <h2>{activeWorkshop.title}</h2>
            <button className="close-btn" onClick={() => setActiveWorkshop(null)}>×</button>
          </div>
          
          <div className="workshop-content">
            <div className="workshop-video">
              {/* Video player component would go here */}
              <div className="video-placeholder">
                <p>Live Workshop Session</p>
                <p>Instructor: {activeWorkshop.instructor}</p>
              </div>
            </div>
            
            <div className="workshop-notes">
              <h3>Notes</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Take your notes here..."
                rows={10}
              />
            </div>

            <div className="workshop-chat">
              <h3>Chat with Attendees</h3>
              <div className="chat-messages">
                {chatMessages.map((message, index) => (
                  <div key={index} className="chat-message">
                    <span className="sender">{message.sender}</span>
                    <p>{message.text}</p>
                    <span className="timestamp">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="chat-input">
                <input 
                  type="text" 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button className="send-btn" onClick={handleSendMessage}>Send</button>
              </div>
            </div>

            <div className="workshop-feedback">
              <h3>Workshop Feedback</h3>
              <div className="rating">
                <span>Rate this workshop:</span>
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className={`star ${star <= rating ? 'active' : ''}`}
                      onClick={() => setRating(star)}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your feedback..."
                className="feedback-input"
                rows={4}
              />
              <button 
                className="submit-feedback-btn"
                onClick={submitFeedback}
                disabled={!rating || !feedback.trim()}
              >
                Submit Feedback
              </button>
            </div>

            <div className="workshop-certificate">
              <button 
                className="certificate-btn"
                onClick={generateCertificate}
              >
                Download Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PROStudentWorkshops; 