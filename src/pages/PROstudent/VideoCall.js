import React, { useState, useEffect } from 'react';

const PROStudentVideoCall = () => {
  const [callState, setCallState] = useState({
    isInCall: false,
    isVideoEnabled: true,
    isMuted: false,
    isScreenSharing: false,
    remoteUser: null
  });

  const [incomingCall, setIncomingCall] = useState(null);

  // Add a test incoming call for development
  useEffect(() => {
    // Simulate an incoming call after 2 seconds
    const timer = setTimeout(() => {
      setIncomingCall({
        caller: "Test Caller",
        time: new Date().toLocaleTimeString()
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleAcceptCall = () => {
    setCallState(prev => ({
      ...prev,
      isInCall: true,
      remoteUser: incomingCall.caller
    }));
    setIncomingCall(null);
    // Additional call acceptance logic can be added here
  };

  const handleRejectCall = () => {
    setIncomingCall(null);
    // Additional call rejection logic can be added here
  };

  const handleToggleVideo = () => {
    setCallState(prev => ({
      ...prev,
      isVideoEnabled: !prev.isVideoEnabled
    }));
    // Additional video toggle logic can be added here
  };

  const handleToggleMute = () => {
    setCallState(prev => ({
      ...prev,
      isMuted: !prev.isMuted
    }));
    // Additional mute toggle logic can be added here
  };

  const handleToggleScreenShare = () => {
    setCallState(prev => ({
      ...prev,
      isScreenSharing: !prev.isScreenSharing
    }));
    // Additional screen sharing toggle logic can be added here
  };

  const handleEndCall = () => {
    setCallState({
      isInCall: false,
      isVideoEnabled: true,
      isMuted: false,
      isScreenSharing: false,
      remoteUser: null
    });
    // Additional call ending logic can be added here
  };

  const handleShareWindow = () => {
    // Window sharing logic
    if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
      navigator.mediaDevices.getDisplayMedia({ video: true })
        .then(stream => {
          // Handle the stream for window sharing
          console.log('Window sharing started');
        })
        .catch(err => {
          console.error('Error sharing window:', err);
        });
    }
  };

  const handleShareScreen = () => {
    // Screen sharing logic
    if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
      navigator.mediaDevices.getDisplayMedia({ video: true })
        .then(stream => {
          // Handle the stream for screen sharing
          console.log('Screen sharing started');
        })
        .catch(err => {
          console.error('Error sharing screen:', err);
        });
    }
  };

  const handleShareTab = () => {
    // Tab sharing logic
    if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
      navigator.mediaDevices.getDisplayMedia({ video: true })
        .then(stream => {
          // Handle the stream for tab sharing
          console.log('Tab sharing started');
        })
        .catch(err => {
          console.error('Error sharing tab:', err);
        });
    }
  };

  return (
    <div className="video-call-container">
      <div className="page-header">
        <h1>Video Call</h1>
      </div>

      <div className="video-call">
        {!callState.isInCall && incomingCall && (
          <div className="incoming-call">
            <h2>Incoming Call</h2>
            <p>From: {incomingCall.caller}</p>
            <div className="call-actions">
              <button 
                className="accept-call-btn"
                onClick={handleAcceptCall}
              >
                Accept
              </button>
              <button 
                className="reject-call-btn"
                onClick={handleRejectCall}
              >
                Reject
              </button>
            </div>
          </div>
        )}

        {callState.isInCall && (
          <div className="active-call">
            <div className="video-container">
              <div className="remote-video">
                <div className="video-placeholder">
                  Remote Video Stream
                </div>
              </div>
              <div className="local-video">
                <div className="video-placeholder">
                  Local Video Stream
                </div>
              </div>
            </div>

            <div className="call-controls">
              <button 
                className={`video-toggle ${!callState.isVideoEnabled ? 'disabled' : ''}`}
                onClick={handleToggleVideo}
              >
                {callState.isVideoEnabled ? 'Disable Video' : 'Enable Video'}
              </button>

              <button 
                className={`mute-toggle ${callState.isMuted ? 'muted' : ''}`}
                onClick={handleToggleMute}
              >
                {callState.isMuted ? 'Unmute' : 'Mute'}
              </button>

              <button 
                className={`screen-share ${callState.isScreenSharing ? 'active' : ''}`}
                onClick={handleToggleScreenShare}
              >
                {callState.isScreenSharing ? 'Stop Sharing' : 'Share Screen'}
              </button>

              <button 
                className="end-call"
                onClick={handleEndCall}
              >
                End Call
              </button>
            </div>

            {callState.isScreenSharing && (
              <div className="screen-share-controls">
                <h3>Screen Sharing</h3>
                <div className="share-options">
                  <button onClick={handleShareWindow}>Share Window</button>
                  <button onClick={handleShareScreen}>Share Screen</button>
                  <button onClick={handleShareTab}>Share Tab</button>
                </div>
              </div>
            )}
          </div>
        )}

        {!callState.isInCall && !incomingCall && (
          <div className="no-call">
            <h2>No Active Call</h2>
            <p>Waiting for incoming calls...</p>
          </div>
        )}

        <div className="call-status">
          {callState.remoteUser && (
            <p>Connected with: {callState.remoteUser}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PROStudentVideoCall; 