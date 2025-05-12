// src/pages/AssessmentsPage.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';

export default function AssessmentsPage() {
  const [availableAssessments, setAvailableAssessments] = useState([]);
  const [selectedAssessmentIndex, setSelectedAssessmentIndex] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(null);
  const [postToProfile, setPostToProfile] = useState(false);
  const [answers, setAnswers] = useState({});
  const [storedScore, setStoredScore] = useState(null);

  const mockAssessmentQuestions = [
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
    setSelectedAssessmentIndex(idx);
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
    const asmt = availableAssessments[selectedAssessmentIndex];
    if (asmt.isMock) {
      let correct = 0;
      mockAssessmentQuestions.forEach((q, i) => {
        if (answers[i] === q.correct) correct++;
      });
      final = Math.round((correct / mockAssessmentQuestions.length) * 100);
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

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#00D6A0] to-[#00106A] text-white py-16 mb-8"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold mb-4">📝 Online Assessments</h1>
          <p className="text-lg opacity-90">
            Choose an assessment, answer questions, and track your score.
          </p>
          {storedScore !== null && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
              className="mt-6 inline-block bg-yellow-300 text-gray-900 px-5 py-2 rounded-full font-semibold shadow-lg"
            >
              🎓 Last Score: {storedScore} / 100
            </motion.div>
          )}
        </div>
      </motion.div>

      <div className="max-w-3xl mx-auto px-6 space-y-8">
        {/* Assessment List */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 gap-6"
        >
          {availableAssessments.map((a, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 }
              }}
              whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
              className="bg-white rounded-xl p-6 border border-gray-200 cursor-pointer"
              onClick={() => handleTake(idx)}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{a.title}</h2>
              <p className="text-gray-600">{a.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Selected Assessment */}
        {selectedAssessmentIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl p-6 border border-gray-200 shadow"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {availableAssessments[selectedAssessmentIndex].title}
            </h3>

            {!completed ? (
              <div className="space-y-4">
                {availableAssessments[selectedAssessmentIndex].isMock && (
                  mockAssessmentQuestions.map((q, i) => (
                    <div key={i} className="space-y-2">
                      <strong className="block">{i + 1}. {q.question}</strong>
                      {q.options.map((opt, j) => (
                        <label key={j} className="inline-flex items-center">
                          <input
                            type="radio"
                            name={`q-${i}`}
                            checked={answers[i] === j}
                            onChange={() => handleAnswerChange(i, j)}
                            className="mr-2"
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  ))
                )}
                {!availableAssessments[selectedAssessmentIndex].isMock && (
                  <p className="text-gray-600">
                    Click “Complete Assessment” for a randomized score.
                  </p>
                )}

                <div className="flex items-center space-x-4 mt-4">
                  <button
                    onClick={handleComplete}
                    className="bg-gradient-to-r from-[#00F0B5] to-[#00D6A0] text-black font-semibold py-2 px-6 rounded-full shadow hover:shadow-lg transition-all"
                  >
                    Complete Assessment
                  </button>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={postToProfile}
                      onChange={() => setPostToProfile(p => !p)}
                      className="mr-2"
                    />
                    Post score to my profile
                  </label>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600 mb-4">
                  ✅ Assessment Completed!
                </p>
                <p className="text-xl">Your Score: {score} / 100</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
