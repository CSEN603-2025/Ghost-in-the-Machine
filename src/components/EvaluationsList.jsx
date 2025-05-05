import React, { useContext, useState } from 'react';
import { ApplicationsContext } from '../contexts/ApplicationsContext';

function EvaluationsList() {
  const { applications } = useContext(ApplicationsContext);

  const [evaluations, setEvaluations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const internsPerPage = 5;

  const [showFormId, setShowFormId] = useState(null);
  const [feedbackInput, setFeedbackInput] = useState('');
  const [scoreInput, setScoreInput] = useState('');

  const completedInterns = applications.filter(
    (intern) => intern.status === 'Internship Complete'
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

    setEvaluations((prev) => {
      const existing = prev.find((ev) => ev.internId === internId);
      if (existing) {
        return prev.map((ev) =>
          ev.internId === internId ? { ...ev, feedback: feedbackInput, score: scoreInput } : ev
        );
      } else {
        return [...prev, { internId, feedback: feedbackInput, score: scoreInput }];
      }
    });

    setShowFormId(null);
    setFeedbackInput('');
    setScoreInput('');
  };

  const handleDeleteEvaluation = (internId) => {
    setEvaluations((prev) => prev.filter((ev) => ev.internId !== internId));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Internship Evaluations</h2>

      {currentInterns.length === 0 ? (
        <p>No interns available for evaluation.</p>
      ) : (
        currentInterns.map((intern) => {
          const evaluation = evaluations.find((ev) => ev.internId === intern.id);

          return (
            <div key={intern.id} style={styles.internCard}>
              <h3>{intern.studentName}</h3>
              <p><strong>Major:</strong> {intern.major}</p>
              <p><strong>Email:</strong> {intern.email}</p>
              <p><strong>Phone:</strong> {intern.phone}</p>
              <p><strong>Internship:</strong> {intern.internshipTitle}</p>
              <div style={styles.cvLinks}>
                <a href={`/${intern.cv}`} download style={styles.linkButton}>Download CV</a>
                <a href={`/${intern.cv}`} target="_blank" rel="noopener noreferrer" style={styles.linkButton}>Preview CV</a>
              </div>

              {evaluation ? (
                <>
                  <p><strong>Feedback:</strong> {evaluation.feedback}</p>
                  <p><strong>Score:</strong> {evaluation.score}/5</p>

                  <button style={styles.editButton} onClick={() => {
                    setShowFormId(intern.id);
                    setFeedbackInput(evaluation.feedback);
                    setScoreInput(evaluation.score);
                  }}>Edit Evaluation</button>

                  <button style={styles.deleteButton} onClick={() => handleDeleteEvaluation(intern.id)}>Delete Evaluation</button>
                </>
              ) : (
                <button style={styles.createButton} onClick={() => setShowFormId(intern.id)}>
                  Create Evaluation
                </button>
              )}

              {showFormId === intern.id && (
                <div style={styles.formContainer}>
                  <textarea
                    style={styles.input}
                    placeholder="Enter feedback..."
                    value={feedbackInput}
                    onChange={(e) => setFeedbackInput(e.target.value)}
                  />
                  <select
                    style={styles.input}
                    value={scoreInput}
                    onChange={(e) => setScoreInput(e.target.value)}
                  >
                    <option value="">Select Score</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>

                  <button style={styles.saveButton} onClick={() => handleSaveEvaluation(intern.id)}>Save Evaluation</button>
                  <button style={styles.cancelButton} onClick={() => setShowFormId(null)}>Cancel</button>
                </div>
              )}
            </div>
          );
        })
      )}

      {/* Pagination */}
      {completedInterns.length > internsPerPage && (
        <div style={styles.pagination}>
          <button
            style={styles.pageButton}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
          >Prev</button>
          <span style={styles.pageNumber}>Page {currentPage} of {totalPages}</span>
          <button
            style={styles.pageButton}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
          >Next</button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: '20px', maxWidth: '700px', margin: '0 auto' },
  title: { textAlign: 'center', fontSize: '28px', marginBottom: '20px' },
  internCard: { backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '10px', marginBottom: '20px' },
  createButton: { marginTop: '10px', backgroundColor: '#28a745', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '5px', cursor: 'pointer' },
  editButton: { marginTop: '10px', backgroundColor: '#007bff', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '5px', cursor: 'pointer' },
  deleteButton: { marginTop: '10px', backgroundColor: '#dc3545', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '5px', cursor: 'pointer' },
  saveButton: { marginTop: '10px', backgroundColor: '#007bff', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '5px', cursor: 'pointer' },
  cancelButton: { marginTop: '10px', backgroundColor: '#6c757d', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '5px', cursor: 'pointer' },
  input: { width: '100%', padding: '10px', marginTop: '10px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px' },
  cvLinks: { display: 'flex', gap: '10px', marginTop: '10px' },
  linkButton: { backgroundColor: '#007bff', color: 'white', padding: '6px 10px', borderRadius: '5px', textDecoration: 'none', fontSize: '14px' },
  formContainer: { marginTop: '15px' },
  pagination: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '20px' },
  pageButton: { padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' },
  pageNumber: { fontSize: '16px' },
};

export default EvaluationsList;
