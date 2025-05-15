import React, { useContext, useState, useEffect } from 'react';
import { ApplicationsContext } from '../contexts/ApplicationsContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';



const statusColors = {
  'Internship Complete': 'bg-gray-100 text-gray-700',
};

function EvaluationsList() {
   const handleBack = () => {
  navigate('/dashboard'); 
};
  const { applications, evaluations, setEvaluations } = useContext(ApplicationsContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFormId, setShowFormId] = useState(null);
  const [feedbackInput, setFeedbackInput] = useState('');
  const [scoreInput, setScoreInput] = useState('');
  const [uploadFile, setUploadFile] = useState(null);
  const [filterInternship, setFilterInternship] = useState('');
  const [filterName, setFilterName] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const navigate = useNavigate();
  const internsPerPage = 6;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const completedInterns = applications.filter(
    (intern) =>
      intern.status === 'Internship Complete' &&
      (filterInternship === '' || intern.internshipTitle === filterInternship) &&
      intern.studentName.toLowerCase().includes(filterName.toLowerCase())
  );

  const indexOfLastIntern = currentPage * internsPerPage;
  const indexOfFirstIntern = indexOfLastIntern - internsPerPage;
  const currentInterns = completedInterns.slice(indexOfFirstIntern, indexOfLastIntern);
  const totalPages = Math.ceil(completedInterns.length / internsPerPage);

  const handleSaveEvaluation = (internId) => {
    if (!feedbackInput.trim() || !scoreInput) {
      alert('Please fill all fields.');
      return;
    }

    const fileData = uploadFile ? uploadFile.name : null;

    setEvaluations((prev) => {
      const existing = prev.find((ev) => ev.internId === internId);
      if (existing) {
        return prev.map((ev) =>
          ev.internId === internId
            ? { ...ev, feedback: feedbackInput, score: scoreInput, file: fileData }
            : ev
        );
      } else {
        return [...prev, { internId, feedback: feedbackInput, score: scoreInput, file: fileData }];
      }
    });

    setShowFormId(null);
    setFeedbackInput('');
    setScoreInput('');
    setUploadFile(null);
  };

  const handleDeleteEvaluation = (internId) => {
    setConfirmDeleteId(internId);
  };

  const confirmDelete = () => {
    setEvaluations((prev) => prev.filter((ev) => ev.internId !== confirmDeleteId));
    setConfirmDeleteId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <motion.div className="relative overflow-hidden">
         <motion.button
    whileHover={{ x: -5 }}
    onClick={handleBack}
    className="absolute top-6 left-6 z-20 flex items-center text-white hover:underline"
  >
    <ArrowLeft className="mr-1 w-5 h-5" /> Back
  </motion.button>
        <div className="absolute inset-0 bg-gradient-to-r from-[#00106A] to-[#0038A0] opacity-95"></div>
        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Internship Evaluations</h1>
          <p className="text-lg text-blue-100 mb-6">
            Feedback and score tracking for completed internships
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <input
              type="text"
              placeholder="Filter by student name"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 min-w-[200px]"
            />
            <select
              value={filterInternship}
              onChange={(e) => setFilterInternship(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 min-w-[200px]"
            >
              <option value="">All Internships</option>
              {[...new Set(applications.map((a) => a.internshipTitle))].map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-8 -mt-10 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {currentInterns.map((intern) => {
            const evaluation = evaluations.find((ev) => ev.internId === intern.id);
            return (
              <motion.div
                key={intern.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition flex flex-col items-center cursor-pointer"
                onClick={() => navigate(`/interns/${intern.id}`)}
              >
                <img
                  src={intern.image || '/default-avatar.png'}
                  alt={intern.studentName}
                  className="w-20 h-20 rounded-full object-cover shadow mb-3 border-2 border-blue-600"
                />
                <div className="text-center mb-3">
                  <h3 className="text-lg font-semibold text-[#00106A]">{intern.studentName}</h3>
                  <p className="text-sm text-gray-600">{intern.major}</p>
                  <span className={`inline-block mt-3 text-xs font-medium px-3 py-1 rounded-full ${statusColors[intern.status]}`}>
                    {intern.status}
                  </span>
                </div>

                {evaluation ? (
                  <>
                    <p className="text-sm text-gray-600"><strong>Performance:</strong> {evaluation.score}/5</p>
                    <p className="text-sm text-gray-600"><strong>Feedback:</strong> {evaluation.feedback}</p>
                    {evaluation.file && (
                      <p className="text-sm text-blue-600">📎 {evaluation.file}</p>
                    )}
                    <div className="flex gap-2 mt-2">
                      <button
                        className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowFormId(intern.id);
                          setFeedbackInput(evaluation.feedback);
                          setScoreInput(evaluation.score);
                        }}
                      >
                        Edit Evaluation
                      </button>
                      <button
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteEvaluation(intern.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                ) : (
                  <button
                    className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowFormId(intern.id);
                    }}
                  >
                    Create Evaluation
                  </button>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {showFormId && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
              <h3 className="text-xl font-semibold mb-4">Create/Edit Evaluation</h3>

              <label className="block mb-2 font-medium">Feedback</label>
              <textarea
                value={feedbackInput}
                onChange={(e) => setFeedbackInput(e.target.value)}
                className="w-full border p-2 rounded mb-4"
                placeholder="Write feedback here..."
              />
     <label className="block mb-2 font-medium">Performance</label>
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



              <label className="block mb-2 font-medium">Upload File</label>
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const f = e.dataTransfer.files[0];
                  if (f) setUploadFile(f);
                }}
                className="border-2 border-blue-500 border-dashed rounded-lg p-4 mb-4 text-center cursor-pointer bg-white"
                onClick={() => document.getElementById('evaluation-file').click()}
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
                  id="evaluation-file"
                  type="file"
                  accept=".pdf,.doc,.docx,.png,.jpg"
                  style={{ display: 'none' }}
                  onChange={(e) => setUploadFile(e.target.files[0])}
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                  onClick={() => setShowFormId(null)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                  onClick={() => handleSaveEvaluation(showFormId)}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        <AnimatePresence>
          {confirmDeleteId && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full text-center"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
              >
                <h3 className="text-xl font-semibold mb-4">
                  Are you sure you want to delete this evaluation?
                </h3>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setConfirmDeleteId(null)}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Yes, Delete
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
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
export default EvaluationsList;