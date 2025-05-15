import React, { useState, useEffect } from 'react';
import './VideoCall.css';

const VideoCall = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      with: 'SCAD Officer',
      date: '2024-03-20',
      time: '14:00',
      duration: '30 minutes',
      status: 'pending',
      type: 'video',
      isIncoming: true
    },
    {
      id: 2,
      with: 'Career Advisor',
      date: '2024-03-22',
      time: '15:30',
      duration: '45 minutes',
      status: 'accepted',
      type: 'video',
      isIncoming: true
    }
  ]);

  const [activeCall, setActiveCall] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [incomingCall, setIncomingCall] = useState(null);
  const [showCallNotification, setShowCallNotification] = useState(false);
  const [showEndCallNotification, setShowEndCallNotification] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    with: '',
    date: '',
    time: '',
    duration: '30 minutes'
  });
  const [lastCallTime, setLastCallTime] = useState(0);

  // Simulate online status changes
  useEffect(() => {
    const interval = setInterval(() => {
      setIsOnline(Math.random() > 0.3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Simulate incoming appointments
  useEffect(() => {
    const appointmentInterval = setInterval(() => {
      const randomAppointment = Math.random() > 0.7; // 30% chance of incoming appointment
      if (randomAppointment) {
        const callers = ['SCAD Officer', 'Career Advisor', 'Academic Advisor'];
        const randomCaller = callers[Math.floor(Math.random() * callers.length)];
        const newIncomingAppointment = {
          id: Date.now(),
          with: randomCaller,
          date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
          time: '14:00',
          duration: '30 minutes',
          status: 'pending',
          type: 'video',
          isIncoming: true
        };
        setAppointments(prev => [...prev, newIncomingAppointment]);
      }
    }, 20000); // Check every 20 seconds

    return () => clearInterval(appointmentInterval);
  }, []);

  // Simulate incoming calls
  useEffect(() => {
    const callInterval = setInterval(() => {
      if (!activeCall && !incomingCall) {
        const currentTime = Date.now();
        const timeSinceLastCall = currentTime - lastCallTime;
        
        // First call appears quickly, subsequent calls have a longer delay
        if (lastCallTime === 0 || timeSinceLastCall > 30000) { // 30 seconds between calls
          const randomCall = Math.random() > 0.5; // 50% chance of incoming call
          if (randomCall) {
            const callers = ['SCAD Officer', 'Career Advisor', 'Academic Advisor'];
            const randomCaller = callers[Math.floor(Math.random() * callers.length)];
            handleIncomingCall({
              id: Date.now(),
              with: randomCaller,
              type: 'video'
            });
            setLastCallTime(currentTime);
          }
        }
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(callInterval);
  }, [activeCall, incomingCall, lastCallTime]);

  // Simulate other caller leaving after some time
  useEffect(() => {
    if (activeCall) {
      const leaveTimeout = setTimeout(() => {
        // Remove the appointment from the list
        setAppointments(prev => prev.filter(apt => apt.id !== activeCall.id));
        
        setActiveCall(null);
        setIsVideoEnabled(true);
        setIsMuted(false);
        setIsScreenSharing(false);
        setShowEndCallNotification(true);
        setTimeout(() => {
          setShowEndCallNotification(false);
        }, 3000);
      }, 30000); // Other caller leaves after 30 seconds

      return () => clearTimeout(leaveTimeout);
    }
  }, [activeCall]);

  const handleNewAppointmentChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const requestAppointment = (e) => {
    e.preventDefault();
    const newApt = {
      id: Date.now(),
      ...newAppointment,
      status: 'pending',
      type: 'video',
      isIncoming: false
    };
    setAppointments(prev => [...prev, newApt]);
    setNewAppointment({
      with: '',
      date: '',
      time: '',
      duration: '30 minutes'
    });

    // Simulate appointment acceptance after 3 seconds
    setTimeout(() => {
      setAppointments(prev => 
        prev.map(apt => 
          apt.id === newApt.id 
            ? { ...apt, status: 'accepted' }
            : apt
        )
      );
    }, 3000);
  };

  const handleAppointmentResponse = (appointmentId, accept) => {
    if (accept) {
      setAppointments(prev => 
        prev.map(apt => 
          apt.id === appointmentId 
            ? { ...apt, status: 'accepted' }
            : apt
        )
      );
    } else {
      // Remove the appointment if rejected
      setAppointments(prev => prev.filter(apt => apt.id !== appointmentId));
    }
  };

  const startCall = (appointment) => {
    if (appointment.status === 'accepted') {
      setActiveCall(appointment);
    }
  };

  const handleIncomingCall = (call) => {
    setIncomingCall(call);
    setShowCallNotification(true);
  };

  const handleCallResponse = (accept) => {
    if (accept) {
      setActiveCall(incomingCall);
    }
    setIncomingCall(null);
    setShowCallNotification(false);
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleScreenShare = async () => {
    if (!isScreenSharing) {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: {
            cursor: "always"
          },
          audio: false
        });
        
        // Create a video element for screen sharing
        const screenVideo = document.createElement('video');
        screenVideo.srcObject = stream;
        screenVideo.autoplay = true;
        
        // Add the video element to the screen-share container
        const screenShareContainer = document.querySelector('.screen-share');
        if (screenShareContainer) {
          screenShareContainer.innerHTML = '';
          screenShareContainer.appendChild(screenVideo);
        }
        
        setIsScreenSharing(true);
        
        // Handle when user stops sharing
        stream.getVideoTracks()[0].onended = () => {
          setIsScreenSharing(false);
          if (screenShareContainer) {
            screenShareContainer.innerHTML = `
              <div class="video-placeholder">
                <p>Screen Sharing</p>
                <p>Stopped</p>
              </div>
            `;
          }
        };
      } catch (err) {
        console.error("Error sharing screen:", err);
        setIsScreenSharing(false);
      }
    } else {
      setIsScreenSharing(false);
      const screenShareContainer = document.querySelector('.screen-share');
      if (screenShareContainer) {
        screenShareContainer.innerHTML = `
          <div class="video-placeholder">
            <p>Screen Sharing</p>
            <p>Stopped</p>
          </div>
        `;
      }
    }
  };

  const endCall = () => {
    // Remove the appointment from the list
    setAppointments(prev => prev.filter(apt => apt.id !== activeCall.id));
    
    setActiveCall(null);
    setIsVideoEnabled(true);
    setIsMuted(false);
    setIsScreenSharing(false);
  };

  return (
    <div className="video-call-container">
      <div className="appointments-section">
        <h2>Video Call Appointments</h2>
        
        {/* New Appointment Form */}
        <form onSubmit={requestAppointment} className="new-appointment-form">
          <h3>Request New Appointment</h3>
          <div className="form-group">
            <input
              type="text"
              name="with"
              value={newAppointment.with}
              onChange={handleNewAppointmentChange}
              placeholder="With whom?"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="date"
              name="date"
              value={newAppointment.date}
              onChange={handleNewAppointmentChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="time"
              name="time"
              value={newAppointment.time}
              onChange={handleNewAppointmentChange}
              required
            />
          </div>
          <div className="form-group">
            <select
              name="duration"
              value={newAppointment.duration}
              onChange={handleNewAppointmentChange}
            >
              <option value="30 minutes">30 minutes</option>
              <option value="45 minutes">45 minutes</option>
              <option value="1 hour">1 hour</option>
            </select>
          </div>
          <button type="submit" className="request-btn">Request Appointment</button>
        </form>

        <div className="appointments-list">
          {appointments.map(appointment => (
            <div key={appointment.id} className="appointment-card">
              <div className="appointment-info">
                <h3>{appointment.with}</h3>
                <p>Date: {appointment.date}</p>
                <p>Time: {appointment.time}</p>
                <p>Duration: {appointment.duration}</p>
                <p>Status: {appointment.status}</p>
                <p>Online Status: {isOnline ? 'Online' : 'Offline'}</p>
              </div>
              <div className="appointment-actions">
                {appointment.isIncoming && appointment.status === 'pending' && (
                  <>
                    <button 
                      className="accept-btn"
                      onClick={() => handleAppointmentResponse(appointment.id, true)}
                    >
                      Accept
                    </button>
                    <button 
                      className="reject-btn"
                      onClick={() => handleAppointmentResponse(appointment.id, false)}
                    >
                      Reject
                    </button>
                  </>
                )}
                {appointment.status === 'accepted' && (
                  <button 
                    className="start-call-btn"
                    onClick={() => startCall(appointment)}
                    disabled={!isOnline}
                  >
                    Start Call
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeCall && (
        <div className="active-call">
          <div className="video-container">
            <div className="remote-video">
              <div className="video-placeholder">
                <p>{activeCall.with}</p>
                <p>Remote Video Feed</p>
              </div>
            </div>
            <div className="local-video">
              <div className="video-placeholder">
                <p>You</p>
                <p>{isVideoEnabled ? 'Video Enabled' : 'Video Disabled'}</p>
                <p>{isMuted ? 'Muted' : 'Unmuted'}</p>
              </div>
            </div>
            {isScreenSharing && (
              <div className="screen-share">
                <div className="video-placeholder">
                  <p>Screen Sharing</p>
                  <p>Active</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="call-controls">
            <button 
              className={`control-btn ${isVideoEnabled ? 'active' : ''}`}
              onClick={toggleVideo}
            >
              {isVideoEnabled ? 'Disable Video' : 'Enable Video'}
            </button>
            <button 
              className={`control-btn ${isMuted ? 'active' : ''}`}
              onClick={toggleMute}
            >
              {isMuted ? 'Unmute' : 'Mute'}
            </button>
            <button 
              className={`control-btn ${isScreenSharing ? 'active' : ''}`}
              onClick={toggleScreenShare}
            >
              {isScreenSharing ? 'Stop Sharing' : 'Share Screen'}
            </button>
            <button 
              className="end-call-btn"
              onClick={endCall}
            >
              End Call
            </button>
          </div>
        </div>
      )}

      {showCallNotification && incomingCall && (
        <div className="incoming-call-notification">
          <div className="notification-content">
            <h3>Incoming Call</h3>
            <p>From: {incomingCall.with}</p>
            <div className="notification-actions">
              <button 
                className="accept-btn"
                onClick={() => handleCallResponse(true)}
              >
                Accept
              </button>
              <button 
                className="reject-btn"
                onClick={() => handleCallResponse(false)}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {showEndCallNotification && (
        <div className="end-call-notification">
          <div className="notification-content">
            <h3>Call Ended</h3>
            <p>The other participant has left the call</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCall; 