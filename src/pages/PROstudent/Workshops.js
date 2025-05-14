import React, { useState } from 'react';

const PROStudentWorkshops = () => {
  const [workshops, setWorkshops] = useState({
    upcoming: [],
    registered: [],
    recorded: []
  });

  const [activeWorkshop, setActiveWorkshop] = useState(null);
  const [notes, setNotes] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const handleRegister = (workshopId) => {
    // Add workshop to registered list
    const workshop = workshops.upcoming.find(w => w.id === workshopId);
    if (workshop) {
      setWorkshops(prev => ({
        ...prev,
        registered: [...prev.registered, workshop],
        upcoming: prev.upcoming.filter(w => w.id !== workshopId)
      }));
    }
  };

  const handleJoinWorkshop = (workshopId) => {
    // Set the active workshop and initialize workshop session
    const workshop = workshops.registered.find(w => w.id === workshopId);
    if (workshop) {
      setActiveWorkshop(workshop);
      // Additional workshop joining logic can be added here
    }
  };

  return (
    <div className="main-content">
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
                  </div>
                  <button 
                    className="register-btn"
                    onClick={() => handleRegister(workshop.id)}
                  >
                    Register
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
                    <button className="play-btn">Play</button>
                    <button className="pause-btn">Pause</button>
                    <button className="stop-btn">Stop</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {activeWorkshop && (
          <div className="active-workshop">
            <div className="workshop-video">
              {/* Video player component will go here */}
            </div>
            
            <div className="workshop-notes">
              <h3>Notes</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Take your notes here..."
              />
            </div>

            <div className="workshop-chat">
              <h3>Chat with Attendees</h3>
              <div className="chat-messages">
                {chatMessages.map((message, index) => (
                  <div key={index} className="chat-message">
                    <span className="sender">{message.sender}</span>
                    <p>{message.text}</p>
                  </div>
                ))}
              </div>
              <div className="chat-input">
                <input type="text" placeholder="Type your message..." />
                <button className="send-btn">Send</button>
              </div>
            </div>

            <div className="workshop-feedback">
              <h3>Workshop Feedback</h3>
              <div className="rating">
                <span>Rate this workshop:</span>
                {/* Rating component will go here */}
              </div>
              <textarea
                placeholder="Share your feedback..."
                className="feedback-input"
              />
              <button className="submit-feedback-btn">Submit Feedback</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PROStudentWorkshops; 