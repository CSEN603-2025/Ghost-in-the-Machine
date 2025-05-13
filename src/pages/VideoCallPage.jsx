import { useState, useEffect } from 'react';
import { FiMic, FiMicOff, FiVideo, FiVideoOff, FiMonitor, FiX, FiCast, FiTv, FiPhoneOff, FiPhoneMissed } from 'react-icons/fi';
import { useToastNotifications } from '../hooks/useToastNotifications';

const VideoCallPage = () => {
  const [callStatus, setCallStatus] = useState('idle'); // 'idle', 'ringing', 'in-progress'
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      studentName: "Ahmed Mohamed",
      date: new Date().toLocaleDateString(),
      time: "14:00",
      status: "pending" // 'pending', 'accepted', 'rejected'
    }
  ]);
  // Available people to request appointments from
  const availablePeople = [ "John Doe", "Jane Smith","Mohamed Ahmed", "Sara Ali", "Ali Hassan" ];
  const [selectedPerson, setSelectedPerson] = useState(availablePeople[0]);
  const { success } = useToastNotifications();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
      const timer = setTimeout(() => {
        const msg = "Ahmed Mohamed just accepted your appointment request! Click accept to start the call.";
        // show toast
        success(msg);
        // add to bell notification center
        setNotifications(prev => [...prev,{ id: Date.now(), message: msg, date: new Date() }]);
      }, 100);
      return () => clearTimeout(timer);
    }, []);

  // Mock function to start a call
  const startCall = (appointmentId) => {
    setCallStatus('ringing');
    // Simulate call acceptance after 3 seconds
    setTimeout(() => {
      setCallStatus('in-progress');
    }, 3000);
  };

  // Mock function to end call
  const endCall = () => {
    setCallStatus('idle');
    setVideoEnabled(true);
    setMicEnabled(true);
    setScreenSharing(false);
  };

  // Update appointment status
  const updateAppointmentStatus = (id, status) => {
    setAppointments(appointments.map(app => 
      app.id === id ? { ...app, status } : app
    ));
  };

  // Request a new dummy appointment
  const requestAppointment = () => {
    const newAppointment = {
      id: Date.now(),
      studentName: selectedPerson,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString().slice(0,5),
      status: 'pending',
      requested: true
    };
    setAppointments(prev => [...prev, newAppointment]);
  };

  return (
    <div className="video-call-container">
      <h2>Career Guidance Appointments</h2>
      {/* Request Appointment Section */}
      <div className="request-appointment my-4 flex items-center space-x-2">
        <select
          value={selectedPerson}
          onChange={(e) => setSelectedPerson(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          {availablePeople.map(person => (
            <option key={person} value={person}>{person}</option>
          ))}
        </select>
        <button
          onClick={requestAppointment}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
        >
          Request Appointment
        </button>
      </div>

      {/* Appointments List */}
      <div className="appointments-section">
        <h3>Upcoming Appointments</h3>
        {appointments.length === 0 ? (
          <p>No upcoming appointments</p>
        ) : (
          <div className="appointments-list">
            {appointments.map(appointment => (
              <div key={appointment.id} className="appointment-card">
                <div className="appointment-info">
                  <h4>{appointment.studentName}</h4>
                  <p>{appointment.date} at {appointment.time}</p>
                  <div className={`status-badge ${appointment.status}`}>
                    {appointment.status}
                  </div>
                </div>
                
                <div className="appointment-actions">
                  {appointment.status === 'pending' && !appointment.requested && (
                    <>
                      <button 
                        onClick={() => updateAppointmentStatus(appointment.id, 'accepted')}
                        className="accept-btn"
                      >
                        Accept
                      </button>
                      <button 
                        onClick={() => updateAppointmentStatus(appointment.id, 'rejected')}
                        className="reject-btn"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {appointment.status === 'pending' && appointment.requested && (
                    <span className="text-gray-500 italic">Requested</span>
                  )}

                  {appointment.status === 'accepted' && (
                    <button 
                      onClick={() => startCall(appointment.id)}
                      className="call-btn"
                    >
                      Start Call
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Video Call Interface */}
      {callStatus !== 'idle' && (
        <div className={`video-call-section ${callStatus}`}>
          <h3>
            {callStatus === 'ringing' ? 'Calling...' : 'Call in Progress'}
          </h3>
          
          <div className="video-container relative">
            {callStatus === 'in-progress' && (
              <>
                <div className="remote-video">
                  <div className="video-placeholder">
                    <div className="user-avatar">
                      {appointments[0].studentName.charAt(0)}
                    </div>
                    <p>{appointments[0].studentName}</p>
                  </div>
                </div>
                
                <div className={`local-video ${!videoEnabled ? 'disabled' : ''}`}>
                  {videoEnabled ? (
                    <div className="video-placeholder">
                      <div className="user-avatar">Y</div>
                      <p>You</p>
                    </div>
                  ) : (
                    <div className="video-off">
                      <FiVideoOff size={48} />
                      <p>Camera is off</p>
                    </div>
                  )}
                </div>
              </>
            )}
            
            {/* Dummy shared screen preview */}
            {screenSharing && callStatus === 'in-progress' && (
              <video 
                autoPlay
                loop
                src="/dumdumvideo.mp4"
                alt="Shared Screen"
                className="absolute top-4 right-4 w-32 h-20 object-cover border rounded-lg shadow-lg"
              />
            )}
            
            {callStatus === 'ringing' && (
              <div className="ringing-animation">
                <div className="spinner"></div>
                <p>Calling {appointments[0].studentName}...</p>
              </div>
            )}
          </div>
          
          <div className="call-controls flex justify-center space-x-4 mt-4">
            {/* Mic toggle */}
            <button
              onClick={() => setMicEnabled(!micEnabled)}
              className={`p-3 rounded-full hover:bg-gray-200 ${
                micEnabled ? 'bg-gray-100 text-black' : 'bg-red-800 text-white'
              }`}
            >
              {micEnabled ? <FiMic size={20} /> : <FiMicOff size={20} />}
            </button>
            {/* Video toggle */}
            <button
              onClick={() => setVideoEnabled(!videoEnabled)}
              className={`p-3 rounded-full hover:bg-gray-200 ${
                videoEnabled ? 'bg-gray-100 text-black' : 'bg-red-800 text-white'
              }`}
            >
              {videoEnabled ? <FiVideo size={20} /> : <FiVideoOff size={20} />}
            </button>
            {/* Screen share toggle */}
            {callStatus === 'in-progress' && (
              <button
                onClick={() => setScreenSharing(!screenSharing)}
                className={`p-3 rounded-full hover:bg-gray-200 ${
                  screenSharing ? 'bg-green-600 text-white' : 'bg-red-800 text-white'
                }`}
              >
                <FiCast size={20} />
              </button>
            )}
            {/* End call */}
            <button
              onClick={endCall}
              className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full"
            >
              <FiPhoneMissed size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCallPage;