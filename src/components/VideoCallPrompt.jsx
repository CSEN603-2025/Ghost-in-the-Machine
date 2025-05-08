import React from 'react';
import PropTypes from 'prop-types';
import { FiMic, FiMicOff, FiVideo, FiVideoOff, FiMonitor, FiX, FiPhone, FiPhoneOff } from 'react-icons/fi';

const VideoCallPrompt = ({
  callStatus,
  participantName,
  videoEnabled,
  micEnabled,
  screenSharing,
  onAccept,
  onReject,
  onStartCall,
  onEndCall,
  onToggleMic,
  onToggleVideo,
  onToggleScreen
}) => (
  <div className="fixed bottom-4 right-4 w-80 bg-white shadow-xl rounded-lg p-4 z-50">
    <div className="flex justify-between items-center mb-2">
      <h4 className="text-lg font-semibold text-[#00106A]">
        {callStatus === 'ringing' ? `Incoming call` : 'Call'}
      </h4>
      <button onClick={onEndCall} className="text-gray-400 hover:text-gray-600">
        <FiX size={20} />
      </button>
    </div>
    <p className="text-sm text-gray-700 mb-4">
      {callStatus === 'ringing'
        ? `from ${participantName}`
        : `In call with ${participantName}`}
    </p>

    <div className="flex justify-center space-x-4 mb-4">
      {callStatus === 'ringing' ? (
        <>
          <button onClick={onAccept}
            className="bg-[#00D6A0] hover:bg-[#00F0B5] text-white p-2 rounded-full">
            <FiPhone size={24} />
          </button>
          <button onClick={onReject}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full">
            <FiPhoneOff size={24} />
          </button>
        </>
      ) : (
        <>
          <button onClick={onToggleMic}
            className={`p-2 rounded-full ${micEnabled ? 'bg-gray-100' : 'bg-red-100 text-red-600'}`}>
            {micEnabled ? <FiMic size={20} /> : <FiMicOff size={20} />}
          </button>
          <button onClick={onToggleVideo}
            className={`p-2 rounded-full ${videoEnabled ? 'bg-gray-100' : 'bg-red-100 text-red-600'}`}>
            {videoEnabled ? <FiVideo size={20} /> : <FiVideoOff size={20} />}
          </button>
          <button onClick={onToggleScreen}
            className={`p-2 rounded-full ${screenSharing ? 'bg-gray-100' : ''}`}>
            <FiMonitor size={20} />
          </button>
          <button onClick={onEndCall}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full">
            <FiX size={20} />
          </button>
        </>
      )}
    </div>
  </div>
);

VideoCallPrompt.propTypes = {
  callStatus: PropTypes.oneOf(['idle', 'ringing', 'in-progress']).isRequired,
  participantName: PropTypes.string.isRequired,
  videoEnabled: PropTypes.bool.isRequired,
  micEnabled: PropTypes.bool.isRequired,
  screenSharing: PropTypes.bool,
  onAccept: PropTypes.func,
  onReject: PropTypes.func,
  onStartCall: PropTypes.func,
  onEndCall: PropTypes.func,
  onToggleMic: PropTypes.func,
  onToggleVideo: PropTypes.func,
  onToggleScreen: PropTypes.func,
};

VideoCallPrompt.defaultProps = {
  screenSharing: false,
  onAccept: () => {},
  onReject: () => {},
  onStartCall: () => {},
  onEndCall: () => {},
  onToggleMic: () => {},
  onToggleVideo: () => {},
  onToggleScreen: () => {},
};

export default VideoCallPrompt;