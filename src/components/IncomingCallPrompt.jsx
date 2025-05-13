import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FiCamera, FiPhone, FiX, FiArrowRight } from 'react-icons/fi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const IncomingCallPrompt = ({
  participantName,
  onAcceptVideo,
  onAcceptAudio,
  onReject
}) => {
  const [visible, setVisible] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          toast.error('Audio autoplay prevented by browser due to no interaction:', err);
        });
      }
    }
    const timer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setVisible(false);
      onReject();
    }, 30000); // auto-dismiss after 30 seconds
    return () => {
      clearTimeout(timer);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const handleAcceptVideo = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setVisible(false);
    onAcceptVideo();
  };

  const handleAcceptAudio = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setVisible(false);
    onAcceptAudio();
  };

  const handleReject = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setVisible(false);
    onReject();
  };

  if (!visible) return null;

  return (
  <div className="fixed bottom-4 right-4 w-80 bg-white shadow-xl rounded-lg p-4 z-50">
    {/* ringtone player */}
    <audio ref={audioRef} src="/ringtone.mp3" loop />
    <div className="flex justify-between items-center mb-2">
      <h4 className="text-lg font-semibold text-[#00106A]">Incoming Call</h4>
      <button
        onClick={handleReject}
        className="text-gray-400 hover:text-gray-600"
      >
        <FiArrowRight size={20} />
      </button>
    </div>
    <p className="text-sm text-gray-700 mb-4">from {participantName}</p>
    <div className="flex justify-center space-x-4">
      <button
        onClick={handleAcceptVideo}
        className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full"
      >
        <FiCamera size={24} />
      </button>
      <button
        onClick={handleAcceptAudio}
        className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full"
      >
        <FiPhone size={24} />
      </button>
      <button
        onClick={handleReject}
        className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full"
      >
        <FiX size={24} />
      </button>
    </div>
  </div>
  );
};

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