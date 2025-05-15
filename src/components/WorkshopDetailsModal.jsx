// src/components/WorkshopDetailsModal.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaRegCalendarCheck, FaCertificate, FaStar, FaComments } from 'react-icons/fa';
import { useToastNotifications } from '../hooks/useToastNotifications';
import { jsPDF } from 'jspdf';

export default function WorkshopDetailsModal({ workshop, onClose }) {
  const { id, name, speaker, description, start, end, videoUrl, isLive } = workshop;
  const regKey = `ws_registered_${id}`;
  const [registered, setRegistered] = useState(() => !!localStorage.getItem(regKey));

  const notesKey = `ws_notes_${id}`;
  const [notes, setNotes] = useState(() => localStorage.getItem(notesKey) || '');

  const rateKey = `ws_rate_${id}`;
  const [rating, setRating] = useState(() => Number(localStorage.getItem(rateKey)) || 0);
  const [feedback, setFeedback] = useState('');

  const chatKey = `ws_chat_${id}`;
  const [chat, setChat] = useState(() => JSON.parse(localStorage.getItem(chatKey) || '[]'));
  const [msg, setMsg] = useState('');
  const chatEndRef = useRef();

  const [viewMode, setViewMode] = useState(isLive ? 'live' : 'recorded');
  const { info } = useToastNotifications();

  // persist
  useEffect(() => { localStorage.setItem(notesKey, notes); }, [notes]);
  useEffect(() => { localStorage.setItem(rateKey, rating); }, [rating]);
  useEffect(() => {
    localStorage.setItem(chatKey, JSON.stringify(chat));
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  function toggleRegister() {
    if (registered) {
      localStorage.removeItem(regKey);
      setRegistered(false);
    } else {
      localStorage.setItem(regKey, '1');
      setRegistered(true);
      const msUntil = new Date(start) - Date.now() - 3600000;
      if (msUntil > 0) {
        setTimeout(() => info(`🔔 "${name}" starts in 1 hour!`), msUntil);
      }
    }
  }

  function sendMsg() {
    if (!msg.trim()) return;
    setChat(c => [...c, { fromMe: true, text: msg }]);
    setMsg('');
    setTimeout(() => {
      const reply = '👍 Got your message!';
      setChat(c => [...c, { fromMe: false, text: reply }]);
      info(`New message from ${speaker}: "${reply}"`);
    }, 2000);
  }

  // generate and download PDF certificate
  function handleDownloadCertificate() {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'pt',
      format: 'letter',
    });

    // Certificate title
    doc.setFontSize(30);
    doc.text('Certificate of Completion', doc.internal.pageSize.getWidth() / 2, 100, { align: 'center' });

    // Subtitle
    doc.setFontSize(20);
    doc.text('This certifies that', doc.internal.pageSize.getWidth() / 2, 180, { align: 'center' });

    // Recipient name
    doc.setFontSize(24);
    doc.text(name, doc.internal.pageSize.getWidth() / 2, 240, { align: 'center' });

    // Workshop details
    doc.setFontSize(16);
    doc.text(`has successfully completed the workshop "${name}" by ${speaker}.`, doc.internal.pageSize.getWidth() / 2, 300, { align: 'center' });

    // Date
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, doc.internal.pageSize.getWidth() / 2, 360, { align: 'center' });

    // Trigger download
    doc.save(`${name.replace(/\s+/g, '_')}_Certificate.pdf`);
    info('📜 Certificate downloaded!');
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        initial={{ y: 30 }} animate={{ y: 0 }} exit={{ y: 30 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-4 rounded-t-xl">
          <div>
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-sm">by {speaker}</p>
          </div>
          <button onClick={onClose}><FaTimes size={24} /></button>
        </div>

        <div className="p-6 space-y-6">
          {/* About */}
          <section>
            <h3 className="text-lg font-semibold mb-2">About this Workshop</h3>
            <p className="text-gray-700">{description}</p>
            <p className="mt-2 text-sm text-gray-500 flex items-center">
              <FaRegCalendarCheck className="mr-1" />
              {new Date(start).toLocaleString()} – {new Date(end).toLocaleString()}
            </p>
            <button
              onClick={toggleRegister}
              className={`mt-4 w-full py-2 rounded-full font-medium ${
                registered
                  ? 'bg-gray-300 text-gray-800'
                  : 'bg-gradient-to-r from-blue-600 to-blue-800 text-white'
              }`}
            >
              {registered ? 'Registered ✓' : 'Register to Attend'}
            </button>
          </section>

          {/* View Toggle */}
          {registered && (
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('live')}
                disabled={!isLive}
                className={`flex-1 py-2 rounded-lg font-medium ${
                  viewMode === 'live'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700'
                } ${!isLive ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Join Live
              </button>
              <button
                onClick={() => setViewMode('recorded')}
                className={`flex-1 py-2 rounded-lg font-medium ${
                  viewMode === 'recorded'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                Watch Recording
              </button>
            </div>
          )}

          {/* Video + Notes */}
          {registered && (
            <section>
              <h3 className="text-lg font-semibold mb-2">
                {viewMode === 'live' ? 'Live Stream' : 'Recording'}
              </h3>
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src={videoUrl}
                  title="Workshop Video"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                />
              </div>

              <h4 className="mt-6 mb-2 font-medium text-gray-700">Notes</h4>
              <textarea
                className="w-full border rounded-lg p-2"
                rows={4}
                placeholder="Take your notes here..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
              />
            </section>
          )}

          {/* Certificate & Feedback */}
          {registered && (
            <div className="space-y-6">
              <button
                onClick={handleDownloadCertificate}
                className="w-full py-2 bg-green-500 text-white rounded-full font-medium"
              >
                <FaCertificate className="inline mr-2" />
                Download Certificate
              </button>

              <div>
                <h3 className="text-lg font-semibold mb-2">Rate & Feedback</h3>
                <div className="flex items-center space-x-1 mb-2">
                  {[1,2,3,4,5].map(n => (
                    <FaStar
                      key={n}
                      size={24}
                      className={`cursor-pointer ${n <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      onClick={() => setRating(n)}
                    />
                  ))}
                </div>
                <textarea
                  className="w-full border rounded-lg p-2"
                  rows={2}
                  placeholder="Leave your feedback..."
                  value={feedback}
                  onChange={e => setFeedback(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Chat */}
          {registered && viewMode === 'live' && (
            <section>
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <FaComments className="mr-1" /> Live Chat
              </h3>
              <div className="border rounded-lg h-40 overflow-y-auto p-2 bg-gray-50 space-y-2">
                {chat.map((m, i) => (
                  <div key={i} className={m.fromMe ? 'text-right' : ''}>
                    <span className={`${m.fromMe ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'} inline-block px-3 py-1 rounded-lg`}>
                      {m.text}
                    </span>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              <div className="mt-2 flex space-x-2">
                <input
                  className="flex-1 border rounded-lg p-2"
                  placeholder="Type a message..."
                  value={msg}
                  onChange={e => setMsg(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMsg()}
                />
                <button
                  onClick={sendMsg}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full"
                >
                  Send
                </button>
              </div>
            </section>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
