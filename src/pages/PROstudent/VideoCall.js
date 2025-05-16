import React, { useState, useEffect, useRef } from "react";

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        background: "rgba(0,0,0,0.8)",
        color: "white",
        padding: "12px 24px",
        borderRadius: 6,
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        marginTop: 8,
        maxWidth: 320,
        fontSize: 14,
        zIndex: 9999,
      }}
    >
      {message}
    </div>
  );
};

const PROStudentVideoCall = () => {
  const [callState, setCallState] = useState({
    isInCall: false,
    isVideoEnabled: true,
    isMuted: false,
    isScreenSharing: false,
    remoteUser: null,
  });

  const [incomingCall, setIncomingCall] = useState(null);
  const [incomingAppointment, setIncomingAppointment] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState({}); // { username: boolean }
  const [toasts, setToasts] = useState([]);

  const [requestedUser, setRequestedUser] = useState("");
  const [requestedTime, setRequestedTime] = useState("");

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const screenStreamRef = useRef(null);
  const localStreamRef = useRef(null);

  // Helper to add toast notifications
  const addToast = (message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  // Simulate remote users online status update every 10 sec
  useEffect(() => {
    const users = ["Alice", "Bob", "Charlie", "Test Caller"];
    const interval = setInterval(() => {
      const statusUpdate = {};
      users.forEach((user) => {
        statusUpdate[user] = Math.random() > 0.3;
      });
      setOnlineUsers(statusUpdate);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Simulate incoming appointment and call notifications (timed)
  useEffect(() => {
    const appointmentTimer = setTimeout(() => {
      setIncomingAppointment({
        requester: "Alice",
        time: "3:30 PM",
      });
      addToast("New appointment request from Alice at 3:30 PM");
    }, 5000);

    const callTimer = setTimeout(() => {
      setIncomingCall({
        caller: "Test Caller",
        time: new Date().toLocaleTimeString(),
      });
      addToast("Incoming call from Test Caller");
    }, 15000);

    return () => {
      clearTimeout(appointmentTimer);
      clearTimeout(callTimer);
    };
  }, []);

  // Accept or reject appointment
  const handleAcceptAppointment = () => {
    setAppointments((prev) => [
      ...prev,
      { user: incomingAppointment.requester, time: incomingAppointment.time },
    ]);
    setIncomingAppointment(null);
    addToast("Appointment accepted.");
  };

  const handleRejectAppointment = () => {
    setIncomingAppointment(null);
    addToast("Appointment rejected.");
  };

  // Request an appointment
  const handleRequestAppointment = () => {
    if (!requestedUser.trim() || !requestedTime.trim()) {
      addToast("Please enter user and time.");
      return;
    }
    addToast(`Requested appointment with ${requestedUser} at ${requestedTime}`);
    setRequestedUser("");
    setRequestedTime("");
  };

  // Start local camera stream
  const startLocalStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localStreamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    } catch (err) {
      addToast("Error accessing camera/mic.");
      console.error(err);
    }
  };

  // Stop local stream
  const stopLocalStream = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
  };

  // Accept incoming call
  const handleAcceptCall = async () => {
    setCallState((prev) => ({
      ...prev,
      isInCall: true,
      remoteUser: incomingCall.caller,
    }));
    setIncomingCall(null);
    addToast(`Call accepted with ${incomingCall.caller}`);

    await startLocalStream();
    // In a real app, here you'd also set up remote stream (WebRTC etc)
  };

  // Reject incoming call
  const handleRejectCall = () => {
    setIncomingCall(null);
    addToast("Call rejected.");
  };

  // Toggle video on/off
  const handleToggleVideo = () => {
    if (!localStreamRef.current) {
      addToast("No video stream available.");
      return;
    }
    localStreamRef.current.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    setCallState((prev) => {
      addToast(`Video ${prev.isVideoEnabled ? "disabled" : "enabled"}.`);
      return { ...prev, isVideoEnabled: !prev.isVideoEnabled };
    });
  };

  // Toggle mute/unmute
  const handleToggleMute = () => {
    if (!localStreamRef.current) {
      addToast("No audio stream available.");
      return;
    }
    localStreamRef.current.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    setCallState((prev) => {
      addToast(`${prev.isMuted ? "Unmuted" : "Muted"}.`);
      return { ...prev, isMuted: !prev.isMuted };
    });
  };

  // Toggle screen sharing on/off
  const handleToggleScreenShare = async () => {
    if (callState.isScreenSharing) {
      // Stop screen sharing, revert to camera
      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach((track) => track.stop());
        screenStreamRef.current = null;
      }
      await startLocalStream();
      setCallState((prev) => ({ ...prev, isScreenSharing: false }));
      addToast("Stopped screen sharing.");
    } else {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        screenStreamRef.current = screenStream;

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = screenStream;
        }
        // Stop the camera stream while sharing screen
        if (localStreamRef.current) {
          localStreamRef.current.getTracks().forEach((track) => track.stop());
          localStreamRef.current = null;
        }
        setCallState((prev) => ({ ...prev, isScreenSharing: true }));
        addToast("Started screen sharing.");

        // When user stops sharing screen from browser UI
        screenStream.getVideoTracks()[0].addEventListener("ended", () => {
          handleToggleScreenShare();
        });
      } catch (err) {
        addToast("Screen sharing permission denied.");
        console.error(err);
      }
    }
  };

  // End the call, stop streams
  const handleEndCall = () => {
    stopLocalStream();
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach((track) => track.stop());
      screenStreamRef.current = null;
    }
    addToast("You left the call.");
    setCallState({
      isInCall: false,
      isVideoEnabled: true,
      isMuted: false,
      isScreenSharing: false,
      remoteUser: null,
    });
  };

  // Simulate remote user leaving after 1 minute in call with dummy notifications
  useEffect(() => {
    if (callState.isInCall) {
      const remoteLeaveTimer = setTimeout(() => {
        addToast(`${callState.remoteUser} has left the call.`);
        handleEndCall();
      }, 60000);

      return () => clearTimeout(remoteLeaveTimer);
    }
  }, [callState.isInCall, callState.remoteUser]);

  return (
    <div className="main-content" style={{ padding: 20 }}>
      <div className="video-call-container" style={{ maxWidth: 850, margin: "auto" }}>
        <div className="page-header" style={{ marginBottom: 20 }}>
          <h1>Video Call</h1>
        </div>

        {/* Appointment request form */}
        <div style={{ marginBottom: 30 }}>
          <h2 style={{ color: '#E2E8F0' }}>Request Appointment</h2>
          <input
            type="text"
            placeholder="User"
            value={requestedUser}
            onChange={(e) => setRequestedUser(e.target.value)}
            style={{ 
              marginRight: 10, 
              padding: '8px 12px', 
              width: 200,
              backgroundColor: '#2D3748',
              border: '1px solid #4A5568',
              borderRadius: '6px',
              color: '#E2E8F0',
              outline: 'none'
            }}
          />
          <input
            type="text"
            placeholder="Time (e.g. 5:00 PM)"
            value={requestedTime}
            onChange={(e) => setRequestedTime(e.target.value)}
            style={{ 
              marginRight: 10, 
              padding: '8px 12px', 
              width: 140,
              backgroundColor: '#2D3748',
              border: '1px solid #4A5568',
              borderRadius: '6px',
              color: '#E2E8F0',
              outline: 'none'
            }}
          />
          <button 
            className="accept-btn" 
            onClick={handleRequestAppointment}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: 'linear-gradient(135deg, #6B46C1 0%, #553C9A 100%)',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Request
          </button>
        </div>

        {/* Incoming appointment notification */}
        {incomingAppointment && (
          <div
            className="incoming-appointment"
            style={{
              background: 'linear-gradient(135deg, #2D3748 0%, #1A202C 100%)',
              padding: '20px',
              borderRadius: '12px',
              marginBottom: '20px',
              border: '1px solid #4A5568',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          >
            <p style={{ color: '#E2E8F0', marginBottom: '16px' }}>
              Appointment request from <b style={{ color: '#6B46C1' }}>{incomingAppointment.requester}</b> at <b style={{ color: '#6B46C1' }}>{incomingAppointment.time}</b>.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                className="accept-btn" 
                onClick={handleAcceptAppointment}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #48BB78 0%, #38A169 100%)',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                Accept
              </button>
              <button 
                className="reject-btn" 
                onClick={handleRejectAppointment}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #F56565 0%, #C53030 100%)',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                Reject
              </button>
            </div>
          </div>
        )}

        {/* Incoming call notification */}
        {incomingCall && (
          <div
            className="incoming-call"
            style={{
              background: 'linear-gradient(135deg, #2D3748 0%, #1A202C 100%)',
              padding: '20px',
              borderRadius: '12px',
              marginBottom: '20px',
              border: '1px solid #4A5568',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          >
            <p style={{ color: '#E2E8F0', marginBottom: '16px' }}>
              Incoming call from <b style={{ color: '#6B46C1' }}>{incomingCall.caller}</b>.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                className="accept-btn" 
                onClick={handleAcceptCall}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #48BB78 0%, #38A169 100%)',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                Accept
              </button>
              <button 
                className="reject-btn" 
                onClick={handleRejectCall}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #F56565 0%, #C53030 100%)',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                Reject
              </button>
            </div>
          </div>
        )}

        {/* Video call UI */}
        {callState.isInCall && (
          <div
            className="video-call-ui"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 30,
            }}
          >
            <div
              style={{
                flex: 1,
                marginRight: 20,
                border: "1px solid #4A5568",
                borderRadius: 12,
                overflow: "hidden",
                backgroundColor: '#2D3748'
              }}
            >
              <video
                ref={localVideoRef}
                autoPlay
                muted
                playsInline
                style={{ width: "100%", height: "auto" }}
              />
              <div
                style={{
                  textAlign: "center",
                  padding: 12,
                  backgroundColor: "#1A202C",
                  color: "#E2E8F0",
                  fontWeight: "500",
                }}
              >
                You
              </div>
            </div>
            <div
              style={{
                flex: 1,
                border: "1px solid #4A5568",
                borderRadius: 12,
                overflow: "hidden",
                backgroundColor: '#2D3748'
              }}
            >
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                style={{ width: "100%", height: "auto" }}
              />
              <div
                style={{
                  textAlign: "center",
                  padding: 12,
                  backgroundColor: "#1A202C",
                  color: "#E2E8F0",
                  fontWeight: "500",
                }}
              >
                {callState.remoteUser}
              </div>
            </div>
          </div>
        )}

        {/* Call controls */}
        {callState.isInCall && (
          <div className="call-controls" style={{ marginBottom: 40, textAlign: "center" }}>
            <button 
              className="accept-btn" 
              onClick={handleToggleVideo} 
              style={{ 
                marginRight: 10,
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                background: 'linear-gradient(135deg, #6B46C1 0%, #553C9A 100%)',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              {callState.isVideoEnabled ? "Disable Video" : "Enable Video"}
            </button>
            <button 
              className="accept-btn" 
              onClick={handleToggleMute} 
              style={{ 
                marginRight: 10,
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                background: 'linear-gradient(135deg, #6B46C1 0%, #553C9A 100%)',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              {callState.isMuted ? "Unmute" : "Mute"}
            </button>
            <button 
              className="accept-btn" 
              onClick={handleToggleScreenShare} 
              style={{ 
                marginRight: 10,
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                background: 'linear-gradient(135deg, #6B46C1 0%, #553C9A 100%)',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              {callState.isScreenSharing ? "Stop Screen Share" : "Share Screen"}
            </button>
            <button 
              className="reject-btn" 
              onClick={handleEndCall}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                background: 'linear-gradient(135deg, #F56565 0%, #C53030 100%)',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              End Call
            </button>
          </div>
        )}

        {/* Appointments list */}
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ color: '#E2E8F0' }}>Appointments</h2>
          {appointments.length === 0 ? (
            <p style={{ color: '#A0AEC0' }}>No appointments scheduled.</p>
          ) : (
            <ul style={{ color: '#E2E8F0' }}>
              {appointments.map((appt, i) => (
                <li key={i} style={{ marginBottom: '8px' }}>
                  {appt.user} at {appt.time}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Online users */}
        <div>
          <h2 style={{ color: '#E2E8F0' }}>Users Online</h2>
          {Object.keys(onlineUsers).length === 0 ? (
            <p style={{ color: '#A0AEC0' }}>Loading users...</p>
          ) : (
            <ul style={{ color: '#E2E8F0' }}>
              {Object.entries(onlineUsers).map(([user, isOnline]) => (
                <li key={user} style={{ 
                  color: isOnline ? '#48BB78' : '#A0AEC0',
                  marginBottom: '8px'
                }}>
                  {user} - {isOnline ? "Online" : "Offline"}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Toast notifications */}
        <div
          className="toast-container"
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 8,
            zIndex: 9999,
          }}
        >
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              message={toast.message}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PROStudentVideoCall; 