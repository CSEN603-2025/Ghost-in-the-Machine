// src/pages/AssessmentsPage.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';

export default function AssessmentsPage() {
  const [availableAssessments, setAvailableAssessments] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(null);
  const [postToProfile, setPostToProfile] = useState(false);
  const [answers, setAnswers] = useState({});
  const [storedScore, setStoredScore] = useState(null);

  const mockQuestions = [
    {
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
      correct: 1,
    },
    {
      question: "Which data structure uses FIFO order?",
      options: ["Stack", "Queue", "Tree", "Graph"],
      correct: 1,
    },
    {
      question: "What is the output of 2 ** 3 in JavaScript?",
      options: ["6", "8", "9", "5"],
      correct: 1,
    },
  ];

  useEffect(() => {
    setAvailableAssessments([
      {
        title: "Software Engineering Fundamentals",
        description: "Test your knowledge of software engineering concepts.",
        isMock: false,
      },
      {
        title: "Data Structures & Algorithms",
        description: "Assess your skills in data structures and algorithms.",
        isMock: false,
      },
      {
        title: "Mock Assessment",
        description: "Try this sample multiple-choice test.",
        isMock: true,
      },
    ]);
    const saved = localStorage.getItem('onlineAssessmentScore');
    if (saved !== null) setStoredScore(Number(saved));
  }, []);

  const handleTake = idx => {
    setSelectedIdx(idx);
    setCompleted(false);
    setScore(null);
    setPostToProfile(false);
    setAnswers({});
  };

  const handleAnswerChange = (qIdx, optIdx) => {
    setAnswers(a => ({ ...a, [qIdx]: optIdx }));
  };

  const handleComplete = () => {
    let final;
    const asmt = availableAssessments[selectedIdx];
    if (asmt.isMock) {
      let correct = 0;
      mockQuestions.forEach((q, i) => {
        if (answers[i] === q.correct) correct++;
      });
      final = Math.round((correct / mockQuestions.length) * 100);
    } else {
      final = Math.floor(Math.random() * 101);
    }
    setScore(final);
    setCompleted(true);
    if (postToProfile) {
      localStorage.setItem('onlineAssessmentScore', final);
      setStoredScore(final);
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    hover: { scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#00106A] to-[#0038A0] opacity-95" />
        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            📝 Online Assessments
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-blue-100 max-w-2xl mx-auto"
          >
            Choose an assessment, answer questions, and track your score.
          </motion.p>
          {storedScore !== null && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
              className="inline-block mt-6 bg-yellow-300 text-gray-900 px-5 py-2 rounded-full font-semibold shadow-lg"
            >
              🎓 Last Score: {storedScore} / 100
            </motion.span>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent" />
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 -mt-10 relative z-20 space-y-8">
        {/* List of Assessments */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {availableAssessments.map((a, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover="hover"
              className="bg-white rounded-xl overflow-hidden cursor-pointer border border-gray-100"
              onClick={() => handleTake(idx)}
            >
              <div className="h-2 w-full bg-gradient-to-r from-[#00106A] to-[#0038A0]" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{a.title}</h3>
                <p className="text-gray-600">{a.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Selected Assessment */}
        <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            key="details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {availableAssessments[selectedIdx].title}
            </h3>

            {!completed ? (
              <div className="space-y-4">
                {availableAssessments[selectedIdx].isMock && mockQuestions.map((q, i) => (
                  <div key={i} className="space-y-2">
                    <strong className="block">{i + 1}. {q.question}</strong>
                    {q.options.map((opt, j) => (
                      <label key={j} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name={`q-${i}`}
                          checked={answers[i] === j}
                          onChange={() => handleAnswerChange(i, j)}
                          className="form-radio text-[#00106A]"
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                ))}

                {!availableAssessments[selectedIdx].isMock && (
                  <p className="text-gray-600">
                    Click “Complete Assessment” for a randomized score.
                  </p>
                )}

                <div className="flex flex-wrap items-center space-x-4 mt-6">
                  <button
                    onClick={handleComplete}
                    className="px-6 py-2 bg-gradient-to-r from-[#00F0B5] to-[#00D6A0] text-black font-semibold rounded-full shadow hover:shadow-lg transition"
                  >
                    Complete Assessment
                  </button>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={postToProfile}
                      onChange={() => setPostToProfile(p => !p)}
                      className="form-checkbox text-[#00106A]"
                    />
                    <span className="text-gray-700">Post score to my profile</span>
                  </label>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <p className="text-2xl font-semibold text-green-600">✅ Assessment Completed!</p>
                <p className="text-xl">Your Score: {score} / 100</p>
                <button
                  onClick={() => setSelectedIdx(null)}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-[#00106A] to-[#0038A0] text-white rounded-full"
                >
                  Back to List
                </button>
              </div>
            )}

          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </div>
  );
}
