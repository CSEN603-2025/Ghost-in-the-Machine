import { useState, useEffect } from 'react';
import { FiMic, FiMicOff, FiVideo, FiVideoOff, FiMonitor, FiX } from 'react-icons/fi';

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

  return (
    <div className="video-call-container">
      <h2>Career Guidance Appointments</h2>
      
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
                  {appointment.status === 'pending' && (
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
          
          <div className="video-container">
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
            
            {callStatus === 'ringing' && (
              <div className="ringing-animation">
                <div className="spinner"></div>
                <p>Calling {appointments[0].studentName}...</p>
              </div>
            )}
          </div>
          
          <div className="call-controls">
            <button 
              onClick={() => setMicEnabled(!micEnabled)}
              className={micEnabled ? 'active' : ''}
            >
              {micEnabled ? <FiMic /> : <FiMicOff />}
            </button>
            
            <button 
              onClick={() => setVideoEnabled(!videoEnabled)}
              className={videoEnabled ? 'active' : ''}
            >
              {videoEnabled ? <FiVideo /> : <FiVideoOff />}
            </button>
            
            {callStatus === 'in-progress' && (
              <button 
                onClick={() => setScreenSharing(!screenSharing)}
                className={screenSharing ? 'active' : ''}
              >
                <FiMonitor />
              </button>
            )}
            
            <button 
              onClick={endCall}
              className="end-call-btn"
            >
              <FiX /> End Call
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCallPage;