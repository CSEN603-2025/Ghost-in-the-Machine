import React from 'react';
import PropTypes from 'prop-types';
import { FiCamera, FiPhone, FiX } from 'react-icons/fi';

const IncomingCallPrompt = ({
  participantName,
  onAcceptVideo,
  onAcceptAudio,
  onReject
}) => (
  <div className="fixed bottom-4 right-4 w-80 bg-white shadow-xl rounded-lg p-4 z-50">
    <div className="flex justify-between items-center mb-2">
      <h4 className="text-lg font-semibold text-[#00106A]">Incoming Call</h4>
      <button
        onClick={onReject}
        className="text-gray-400 hover:text-gray-600"
      >
        <FiX size={20} />
      </button>
    </div>
    <p className="text-sm text-gray-700 mb-4">from {participantName}</p>
    <div className="flex justify-center space-x-4">
      <button
        onClick={onAcceptVideo}
        className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full"
      >
        <FiCamera size={24} />
      </button>
      <button
        onClick={onAcceptAudio}
        className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full"
      >
        <FiPhone size={24} />
      </button>
      <button
        onClick={onReject}
        className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full"
      >
        <FiX size={24} />
      </button>
    </div>
  </div>
);

IncomingCallPrompt.propTypes = {
  participantName: PropTypes.string.isRequired,
  onAcceptVideo: PropTypes.func,
  onAcceptAudio: PropTypes.func,
  onReject: PropTypes.func
};

IncomingCallPrompt.defaultProps = {
  onAcceptVideo: () => {},
  onAcceptAudio: () => {},
  onReject: () => {}
};

export default IncomingCallPrompt;