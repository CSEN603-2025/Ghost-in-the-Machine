import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ApplicationsContext } from '../contexts/ApplicationsContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const statusColors = {
  'Current Intern': 'bg-blue-100 text-blue-800',
  'Internship Complete': 'bg-gray-100 text-gray-700',
};

function InternDetails() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();
  const navigate = useNavigate();
  const { applications, setApplications, evaluations, setEvaluations } = useContext(ApplicationsContext);

  const [intern, setIntern] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showEvalForm, setShowEvalForm] = useState(false);
  const [feedbackInput, setFeedbackInput] = useState('');
  const [scoreInput, setScoreInput] = useState('');
  const [uploadFile, setUploadFile] = useState(null);

  useEffect(() => {
    const selectedIntern = applications.find((i) => i.id === parseInt(id));
    if (selectedIntern) {
      setIntern(selectedIntern);
    }
  }, [id, applications]);

  const confirmStatusChange = () => {
    setApplications((prev) =>
      prev.map((app) => (app.id === parseInt(id) ? { ...app, status: 'Internship Complete' } : app))
    );
    setIntern((prev) => ({ ...prev, status: 'Internship Complete' }));
    setAlertMessage('Status updated to: Internship Complete');
    setAlertType('success');
    setShowConfirmModal(false);
    setTimeout(() => setAlertMessage(null), 2000);
  };

  const saveEvaluation = () => {
    if (!feedbackInput.trim() || !scoreInput) {
      setAlertMessage('Please complete all fields.');
      setAlertType('error');
      setTimeout(() => setAlertMessage(null), 2000);
      return;
    }
    const fileData = uploadFile ? uploadFile.name : null;
    setEvaluations((prev) => {
      const existing = prev.find((ev) => ev.internId === intern.id);
      if (existing) {
        return prev.map((ev) =>
          ev.internId === intern.id ? { ...ev, feedback: feedbackInput, score: scoreInput, file: fileData } : ev
        );
      } else {
        return [...prev, { internId: intern.id, feedback: feedbackInput, score: scoreInput, file: fileData }];
      }
    });
    setShowEvalForm(false);
    setFeedbackInput('');
    setScoreInput('');
    setUploadFile(null);
  };

  const deleteEvaluation = () => {
    setEvaluations((prev) => prev.filter((ev) => ev.internId !== intern.id));
    setAlertMessage('Evaluation deleted');
    setAlertType('success');
    setTimeout(() => setAlertMessage(null), 2000);
  };

  const evaluation = evaluations.find((ev) => ev.internId === intern?.id);

  const starStyles = {
    container: {
      direction: 'rtl',
      display: 'inline-block',
      marginBottom: '1rem'
    },
    input: {
      display: 'none'
    },
    label: {
      fontSize: '32px',
      color: '#ccc',
      padding: '0 4px',
      cursor: 'pointer',
      transition: 'color 0.2s'
    },
    labelHover: {
      color: '#f59e0b'
    }
  };

  if (!intern) {
    return <div className="p-6 text-red-600">Intern not found.</div>;
  }

  return (
    <div className="min-h-screen bg-[#f4f4f4] p-6 relative">
      <AnimatePresence>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          {alertMessage && (
            <div
              className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-md z-50 text-white text-sm font-medium transition-all duration-300 ${alertType === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
            >
              {alertMessage}
            </div>
          )}

          {showConfirmModal && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl text-center">
                <h3 className="text-xl font-semibold mb-4">Confirm Status Change</h3>
                <p className="text-gray-600 mb-6">Are you sure you want to mark this intern as "Internship Complete"?</p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmStatusChange}
                    className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          <motion.button
            whileHover={{ x: -5 }}
            onClick={() => navigate(-1)}
            className="absolute top-6 left-6 text-[#00106A] hover:underline flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back
          </motion.button>

          <motion.div
            className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {intern.image && (
              <motion.img
                src={intern.image}
                alt={intern.studentName}
                className="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-2 border-blue-600"
                layoutId={`intern-image-${id}`}
                transition={{ duration: 0.3 }}
              />
            )}

            <h2 className="text-xl font-bold text-[#00106A]">{intern.studentName}</h2>
            <p className="text-gray-600">{intern.major}</p>
            <p className="text-sm text-gray-500 mb-4">{intern.phone}</p>

            <div className="text-sm text-gray-700 space-y-2 text-center">
              <p><strong>Email:</strong> {intern.email}</p>
              <p><strong>Internship Title:</strong> {intern.internshipTitle}</p>
              <p>
                <strong>Status:</strong>{' '}
                <span className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded ${statusColors[intern.status]}`}>
                  {intern.status}
                </span>
              </p>
              <p>
                <strong>CV:</strong>{' '}
                <a href={`/${intern.cv}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>{' | '}
                <a href={`/${intern.cv}`} download className="text-blue-600 hover:underline">Download</a>
              </p>
            </div>

            {intern.status === 'Internship Complete' && (
              <div className="mt-6 space-y-3">
                {evaluation ? (
                  <div className="text-left">
                    <p><strong>Score:</strong> {evaluation.score}/5</p>
                    <p><strong>Feedback:</strong> {evaluation.feedback}</p>
                    {evaluation.file && <p><strong>File:</strong> {evaluation.file}</p>}
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => {
                          setFeedbackInput(evaluation.feedback);
                          setScoreInput(evaluation.score);
                          setShowEvalForm(true);
                        }}
                        className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                      >
                        Edit Evaluation
                      </button>
                      <button
                        onClick={deleteEvaluation}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete Evaluation
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowEvalForm(true)}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 w-full"
                  >
                    Create Evaluation
                  </button>
                )}
              </div>
            )}

            {showEvalForm && (
              <div className="mt-4 text-left">
                <label className="block mb-1 font-medium">Feedback</label>
                <textarea
                  value={feedbackInput}
                  onChange={(e) => setFeedbackInput(e.target.value)}
                  className="w-full border p-2 rounded mb-2"
                  placeholder="Enter feedback..."
                />

                <label className="block mb-1 font-medium">Performance</label>
                <div style={starStyles.container}>
                  {[5, 4, 3, 2, 1].map((star) => (
                    <React.Fragment key={star}>
                      <input
                        type="radio"
                        id={`star${star}`}
                        name="rating"
                        value={star}
                        checked={parseInt(scoreInput) === star}
                        onChange={() => setScoreInput(String(star))}
                        style={starStyles.input}
                      />
                      <label
                        htmlFor={`star${star}`}
                        style={{
                          ...starStyles.label,
                          color: parseInt(scoreInput) >= star ? '#f59e0b' : starStyles.label.color
                        }}
                      >
                        ★
                      </label>
                    </React.Fragment>
                  ))}
                </div>

                <label className="block mb-1 font-medium">Upload File</label>
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const f = e.dataTransfer.files[0];
                    if (f) setUploadFile(f);
                  }}
                  className="border-2 border-blue-500 border-dashed rounded-lg p-4 mb-4 text-center cursor-pointer bg-white"
                  onClick={() => document.getElementById('eval-upload').click()}
                >
                  {uploadFile ? (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-800 truncate">{uploadFile.name}</span>
                      <button
                        type="button"
                        className="text-red-600 text-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setUploadFile(null);
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <>
                      <img src="https://img.icons8.com/dusk/64/000000/file.png" className="mx-auto w-10 mb-2" />
                      <p className="text-gray-600">Drag & drop or click to upload</p>
                    </>
                  )}
                  <input
                    id="eval-upload"
                    type="file"
                    accept=".pdf,.doc,.docx,.png,.jpg"
                    style={{ display: 'none' }}
                    onChange={(e) => setUploadFile(e.target.files[0])}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowEvalForm(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveEvaluation}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Save Evaluation
                  </button>
                </div>
              </div>
            )}

            {intern.status === 'Current Intern' && (
              <div className="mt-6">
                <button
                  onClick={() => setShowConfirmModal(true)}
                  className="w-full px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
                >
                  Mark as Complete
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default InternDetails;