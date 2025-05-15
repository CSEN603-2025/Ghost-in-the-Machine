// src/components/VideoCallPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMic, FiMicOff, FiVideo, FiVideoOff,
  FiCast, FiPhoneMissed
} from 'react-icons/fi';
import { useToastNotifications } from '../hooks/useToastNotifications';

export default function VideoCallPage() {
  const [callStatus, setCallStatus] = useState('idle');
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [appointments, setAppointments] = useState([{
    id: 1,
    studentName: "Ahmed Mohamed",
    date: new Date().toLocaleDateString(),
    time: "14:00",
    status: "pending"
  }]);
  const [remoteOnline, setRemoteOnline] = useState(true);
  const availablePeople = ["John Doe", "Jane Smith", "Mohamed Ahmed", "Sara Ali", "Ali Hassan"];
  const [selectedPerson, setSelectedPerson] = useState(availablePeople[0]);
  const { success, error } = useToastNotifications();

  // Guards so each toast only fires once
  const firedAccept = useRef(false);
  const firedReject = useRef(false);

  useEffect(() => {
    if (!firedAccept.current) {
      firedAccept.current = true;
      const t1 = setTimeout(() => {
        const msg = "Ahmed Mohamed just accepted your appointment request! Click accept to start the call.";
        success(msg);
      }, 100);
      return () => clearTimeout(t1);
    }
  }, [success]);

  useEffect(() => {
    if (!firedReject.current) {
      firedReject.current = true;
      const t2 = setTimeout(() => {
        const msg = "Yassin Sayed just rejected your appointment request! Call removed from the list.";
        error(msg);
      }, 800);
      return () => clearTimeout(t2);
    }
  }, [error]);

  const startCall = (id) => {
    setCallStatus('ringing');

    // after ringing, go to in-progress and show remote
    const ringTimer = setTimeout(() => {
      setCallStatus('in-progress');
      setRemoteOnline(true);

      // after 5s remote goes offline
      const offlineTimer = setTimeout(() => {
        setRemoteOnline(false);
      }, 5000);

      // after 7s, notify that caller left
      const leaveTimer = setTimeout(() => {
        error('📞 The caller has left the call.');
      }, 7000);

      // cleanup nested timers if call ends early
      return () => {
        clearTimeout(offlineTimer);
        clearTimeout(leaveTimer);
      };
    }, 3000);

    // cleanup ringing timer if component unmounts or call ends
    return () => clearTimeout(ringTimer);
  };

  const endCall = () => {
    setCallStatus('idle');
    setVideoEnabled(true);
    setMicEnabled(true);
    setScreenSharing(false);
  };

  const updateStatus = (id, st) => {
    setAppointments(a => a.map(x => x.id === id ? { ...x, status: st } : x));
  };

  const requestAppointment = () => {
    const newApp = {
      id: Date.now(),
      studentName: selectedPerson,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString().slice(0,5),
      status: 'pending',
      requested: true
    };
    setAppointments(a => [...a, newApp]);
  };

  const variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero */}
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#00106A] to-[#0038A0] opacity-95" />
        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 text-center text-white">
          <motion.h1
            variants={variants}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            📞 Career Guidance Appointments
          </motion.h1>
          <motion.p
            variants={variants}
            transition={{ delay: 0.3 }}
            className="text-xl text-blue-100 max-w-2xl mx-auto"
          >
            Request, accept, and join live video guidance calls.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 -mt-10 relative z-20 space-y-8">
        {/* Request Appointment */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex items-center space-x-4"
        >
          <select
            value={selectedPerson}
            onChange={e => setSelectedPerson(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00D6A0] focus:border-transparent"
          >
            {availablePeople.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <button
            onClick={requestAppointment}
            className="px-6 py-2 bg-gradient-to-r from-[#00F0B5] to-[#00D6A0] text-black font-semibold rounded-full shadow hover:shadow-lg transition"
          >
            Request Appointment
          </button>
        </motion.div>

        {/* Appointments */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {appointments.map(app => (
            <motion.div
              key={app.id}
              variants={variants}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
              className="bg-white rounded-xl border border-gray-100 p-6 space-y-4"
            >
              <h3 className="text-xl font-semibold text-gray-800">{app.studentName}</h3>
              <p className="text-gray-600">{app.date} @ {app.time}</p>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs">{app.status}</span>
                {app.status === 'pending' && !app.requested && (
                  <>
                    <button onClick={() => updateStatus(app.id, 'accepted')} className="text-[#00D6A0] hover:underline">Accept</button>
                    <button onClick={() => updateStatus(app.id, 'rejected')} className="text-red-600 hover:underline">Reject</button>
                  </>
                )}
                {app.status === 'accepted' && !app.requested && (
                  <button
                    onClick={() => startCall(app.id)}
                    className="px-4 py-1 bg-gradient-to-r from-[#00D6A0] to-[#2b7de9] text-white rounded-full"
                  >
                    Start Call
                  </button>
                )}
                {app.requested && <span className="text-gray-500 italic">Requested</span>}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Live Video */}
        <AnimatePresence>
          {callStatus !== 'idle' && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={variants}
              className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 space-y-6"
            >
              <h3 className="text-xl font-bold text-gray-800">
                {callStatus === 'ringing' ? 'Calling...' : 'Call in Progress'}
              </h3>

              {callStatus === 'in-progress' && (
                <div className="grid grid-cols-2 gap-6">
                  {/* Remote */}
                  <div className="space-y-2">
                    <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-6xl font-bold text-gray-400">
                        {appointments[0].studentName.charAt(0)}
                      </span>
                    </div>
                    <p className="text-center">{appointments[0].studentName}</p>
                    <p className={`text-center text-sm ${remoteOnline ? 'text-green-600' : 'text-red-600'}`}>
                      {remoteOnline ? 'Online' : 'Offline'}
                    </p>
                  </div>
                  {/* Local */}
                  <div className="space-y-2">
                    <div className={`w-full h-40 rounded-lg flex items-center justify-center ${videoEnabled ? 'bg-gray-100' : 'bg-red-100'}`}>
                      {videoEnabled ? <FiVideo size={48}/> : <FiVideoOff size={48}/>}
                    </div>
                    <p className="text-center">You</p>
                  </div>
                </div>
              )}

              {/* Controls */}
              <div className="flex justify-center items-center space-x-4">
                <button
                  onClick={() => setMicEnabled(m => !m)}
                  className={`p-3 rounded-full ${micEnabled ? 'bg-gray-100' : 'bg-red-600'} transition`}
                >
                  {micEnabled ? <FiMic/> : <FiMicOff/>}
                </button>
                <button
                  onClick={() => setVideoEnabled(v => !v)}
                  className={`p-3 rounded-full ${videoEnabled ? 'bg-gray-100' : 'bg-red-600'} transition`}
                >
                  {videoEnabled ? <FiVideo/> : <FiVideoOff/>}
                </button>
                {callStatus === 'in-progress' && (
                  <button
                    onClick={() => setScreenSharing(s => !s)}
                    className={`p-3 rounded-full ${screenSharing ? 'bg-green-600 text-white' : 'bg-gray-100'} transition`}
                  >
                    <FiCast/>
                  </button>
                )}
                <button
                  onClick={endCall}
                  className="p-3 rounded-full bg-red-600 text-white transition"
                >
                  <FiPhoneMissed/>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
