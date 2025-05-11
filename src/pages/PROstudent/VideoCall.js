import React, { useState, useEffect } from 'react';

const VideoCall = () => {
  const [callState, setCallState] = useState({
    isInCall: false,
    isVideoEnabled: true,
    isMuted: false,
    isScreenSharing: false,
    remoteUser: null
  });

  const [incomingCall, setIncomingCall] = useState(null);

  return (
    <div className="video-call">
      {!callState.isInCall && incomingCall && (
        <div className="incoming-call">
          <h2>Incoming Call</h2>
          <p>From: {incomingCall.caller}</p>
          <div className="call-actions">
            <button 
              className="accept-call-btn"
              onClick={() => handleAcceptCall()}
            >
              Accept
            </button>
            <button 
              className="reject-call-btn"
              onClick={() => handleRejectCall()}
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
              {/* Remote user's video stream */}
            </div>
            <div className="local-video">
              {/* Local user's video stream */}
            </div>
          </div>

          <div className="call-controls">
            <button 
              className={`video-toggle ${!callState.isVideoEnabled ? 'disabled' : ''}`}
              onClick={() => handleToggleVideo()}
            >
              {callState.isVideoEnabled ? 'Disable Video' : 'Enable Video'}
            </button>

            <button 
              className={`mute-toggle ${callState.isMuted ? 'muted' : ''}`}
              onClick={() => handleToggleMute()}
            >
              {callState.isMuted ? 'Unmute' : 'Mute'}
            </button>

            <button 
              className={`screen-share ${callState.isScreenSharing ? 'active' : ''}`}
              onClick={() => handleToggleScreenShare()}
            >
              {callState.isScreenSharing ? 'Stop Sharing' : 'Share Screen'}
            </button>

            <button 
              className="end-call"
              onClick={() => handleEndCall()}
            >
              End Call
            </button>
          </div>

          {callState.isScreenSharing && (
            <div className="screen-share-controls">
              <h3>Screen Sharing</h3>
              <div className="share-options">
                <button onClick={() => handleShareWindow()}>Share Window</button>
                <button onClick={() => handleShareScreen()}>Share Screen</button>
                <button onClick={() => handleShareTab()}>Share Tab</button>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="call-status">
        {callState.remoteUser && (
          <p>Connected with: {callState.remoteUser}</p>
        )}
      </div>
    </div>
  );
};

export default VideoCall; 