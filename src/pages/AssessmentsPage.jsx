import React, { useState, useEffect } from 'react';

const AssessmentsPage = () => {
  const [availableAssessments, setAvailableAssessments] = useState([]);
  const [selectedAssessmentIndex, setSelectedAssessmentIndex] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(null);
  const [postToProfile, setPostToProfile] = useState(false);
  const [answers, setAnswers] = useState({});
  const [storedScore, setStoredScore] = useState(null); // ✅ new

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
    const assessments = [
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
    ];
    setAvailableAssessments(assessments);

    const savedScore = localStorage.getItem('onlineAssessmentScore'); // ✅ new
    if (savedScore !== null) {
      setStoredScore(Number(savedScore)); // ✅ new
    }
  }, []);

  const handleTakeAssessment = (index) => {
    setSelectedAssessmentIndex(index);
    setScore(null);
    setCompleted(false);
    setPostToProfile(false);
    setAnswers({});
  };

  const handleAnswerChange = (questionIndex, optionIndex) => {
    setAnswers({ ...answers, [questionIndex]: optionIndex });
  };

  const handleCompleteAssessment = () => {
    let finalScore;

    if (availableAssessments[selectedAssessmentIndex].isMock) {
      let correctAnswers = 0;
      mockAssessmentQuestions.forEach((q, index) => {
        if (answers[index] === q.correct) correctAnswers++;
      });
      finalScore = Math.round((correctAnswers / mockAssessmentQuestions.length) * 100);
    } else {
      finalScore = Math.floor(Math.random() * 101);
    }

    setScore(finalScore);
    setCompleted(true);

    if (postToProfile) {
      localStorage.setItem('onlineAssessmentScore', finalScore);
      setStoredScore(finalScore); // ✅ update state too
    }
  };

  return (
    <div style={styles.container}>
      <h1>Online Assessments</h1>

      {storedScore !== null && ( // ✅ display score
        <h3 style={{ color: "#2b7de9" }}>
          🎓 Your Last Assessment Score: {storedScore} / 100
        </h3>
      )}

      <div style={styles.listContainer}>
        {availableAssessments.map((assessment, index) => (
          <div key={index} style={styles.assessmentCard}>
            <h3>{assessment.title}</h3>
            <p>{assessment.description}</p>
            <button style={styles.button} onClick={() => handleTakeAssessment(index)}>
              Take Assessment
            </button>
          </div>
        ))}
      </div>

      {selectedAssessmentIndex !== null && (
        <div style={styles.selectedSection}>
          <h2>{availableAssessments[selectedAssessmentIndex].title}</h2>

          {!completed ? (
            <>
              {availableAssessments[selectedAssessmentIndex].isMock ? (
                <div>
                  {mockAssessmentQuestions.map((q, i) => (
                    <div key={i} style={{ marginBottom: '10px' }}>
                      <strong>{i + 1}. {q.question}</strong>
                      {q.options.map((opt, j) => (
                        <div key={j}>
                          <label>
                            <input
                              type="radio"
                              name={`question-${i}`}
                              value={j}
                              checked={answers[i] === j}
                              onChange={() => handleAnswerChange(i, j)}
                            />
                            {' '}{opt}
                          </label>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                <p>Click below to complete your assessment.</p>
              )}

              <button style={styles.completeButton} onClick={handleCompleteAssessment}>
                Complete Assessment
              </button>

              <div style={{ marginTop: '10px' }}>
                <label>
                  <input
                    type="checkbox"
                    checked={postToProfile}
                    onChange={() => setPostToProfile(!postToProfile)}
                  />
                  {' '}Post score to my profile
                </label>
              </div>
            </>
          ) : (
            <p style={{ fontWeight: 'bold', color: 'green' }}>
              ✅ Assessment Completed! Your Score: {score}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  listContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '10px',
    marginTop: '20px',
  },
  assessmentCard: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  button: {
    backgroundColor: '#2b7de9',
    color: 'white',
    padding: '8px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  completeButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '8px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    marginTop: '10px',
  },
  selectedSection: {
    backgroundColor: '#fff',
    marginTop: '30px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
};

export default AssessmentsPage;
