import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FiMic, FiMicOff, FiVideo, FiVideoOff, FiMonitor, FiX, FiPhone, FiPhoneOff, FiArrowUpLeft } from 'react-icons/fi';

const VideoCallPrompt = ({
  callStatus,
  participantName,
  videoEnabled,
  micEnabled,
  screenSharing,
  onAcceptVideo,
  onAcceptAudio,
  onReject,
  onEndCall,
  onToggleMic,
  onToggleVideo,
  onToggleScreen
}) => {
  const navigate = useNavigate();
  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white shadow-xl rounded-lg p-4 z-50">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-lg font-semibold text-[#00106A]">
          {callStatus === 'ringing' ? `Incoming call` : 'Call'}
        </h4>
        <div className="flex space-x-2">
          {/* Pop-out button: auto accept first call and redirect */}
          <button
            onClick={() => { onAcceptVideo(); navigate('/VideoCallPage'); }}
            className="text-blue-500 hover:text-blue-700"
            title="Pop-out call"
          >
            <FiArrowUpLeft size={20} />
          </button>
          {/* Close end call */}
          <button onClick={onEndCall} className="text-gray-400 hover:text-gray-600">
            <FiX size={20} />
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-700 mb-4">
        {callStatus === 'ringing'
          ? `from ${participantName}`
          : `In call with ${participantName}`}
      </p>

      <div className="flex justify-center space-x-4 mb-4">
        {callStatus === 'ringing' ? (
          <>
            <button onClick={onAcceptVideo}
              className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full">
              <FiVideo size={24} />
            </button>
            <button onClick={onAcceptAudio}
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full">
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
};

VideoCallPrompt.propTypes = {
  callStatus: PropTypes.oneOf(['idle', 'ringing', 'in-progress']).isRequired,
  participantName: PropTypes.string.isRequired,
  videoEnabled: PropTypes.bool.isRequired,
  micEnabled: PropTypes.bool.isRequired,
  screenSharing: PropTypes.bool,
  onAcceptVideo: PropTypes.func,
  onAcceptAudio: PropTypes.func,
  onReject: PropTypes.func,
  onEndCall: PropTypes.func,
  onToggleMic: PropTypes.func,
  onToggleVideo: PropTypes.func,
  onToggleScreen: PropTypes.func,
};

VideoCallPrompt.defaultProps = {
  screenSharing: false,
  onAcceptVideo: () => {},
  onAcceptAudio: () => {},
  onReject: () => {},
  onEndCall: () => {},
  onToggleMic: () => {},
  onToggleVideo: () => {},
  onToggleScreen: () => {},
};

export default VideoCallPrompt;