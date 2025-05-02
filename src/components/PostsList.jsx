import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PostsList({ posts, setPosts }) {
  const navigate = useNavigate();

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editPostData, setEditPostData] = useState(null);

  const [newPost, setNewPost] = useState({
    title: '',
    duration: '',
    paid: false,
    salary: '',
    skillInput: '',
    skills: [],
    description: '',
  });

  const [errors, setErrors] = useState({});
  const [editErrors, setEditErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPaid, setFilterPaid] = useState('all');
  const [filterSalary, setFilterSalary] = useState('all');
  const [filterDuration, setFilterDuration] = useState('');
  const [filterSkills, setFilterSkills] = useState([]);
  const [skillFilterInput, setSkillFilterInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 5;

  useEffect(() => {
    if (posts.length === 0) {
      setPosts([
        {
          id: 1,
          title: 'Frontend Developer Intern',
          duration: '2 Months',
          paid: true,
          salary: 1500,
          skills: ['React', 'CSS'],
          description: 'Work on frontend development projects.',
          applications: 2,
        },
        {
          id: 2,
          title: 'Data Analyst Intern',
          duration: '3 Months',
          paid: false,
          salary: '',
          skills: ['Excel', 'SQL'],
          description: 'Analyze business data and generate reports.',
          applications: 2,
        },
        {
          id: 3,
          title: 'Mobile Developer Intern',
          duration: '1 Month',
          paid: true,
          salary: 2000,
          skills: ['Flutter', 'Dart'],
          description: 'Work on mobile applications development.',
          applications: 1,
        },
      ]);
    }
  }, [posts, setPosts]);
  const validateFields = (data) => {
    const newErrors = {};
    if (!data.title.trim()) newErrors.title = 'Title is required';
    if (!data.duration) newErrors.duration = 'Duration is required';
    if (data.paid && !data.salary) newErrors.salary = 'Salary is required if paid';
    if (data.skills.length === 0) newErrors.skills = 'At least one skill is required';
    if (!data.description.trim()) newErrors.description = 'Description is required';
    return newErrors;
  };

  const handleInputChange = (e, isEdit = false) => {
    const { name, value, type, checked } = e.target;
    if (isEdit) {
      setEditPostData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    } else {
      setNewPost(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSkillInputChange = (e, isEdit = false) => {
    if (isEdit) {
      setEditPostData(prev => ({ ...prev, skillInput: e.target.value }));
    } else {
      setNewPost(prev => ({ ...prev, skillInput: e.target.value }));
    }
  };

  const handleAddSkill = (isEdit = false) => {
    if (isEdit) {
      if (editPostData.skillInput.trim() !== '') {
        setEditPostData(prev => ({
          ...prev,
          skills: [...prev.skills, prev.skillInput.trim()],
          skillInput: '',
        }));
      }
    } else {
      if (newPost.skillInput.trim() !== '') {
        setNewPost(prev => ({
          ...prev,
          skills: [...prev.skills, prev.skillInput.trim()],
          skillInput: '',
        }));
      }
    }
  };

  const handleRemoveSkill = (index, isEdit = false) => {
    if (isEdit) {
      const updatedSkills = [...editPostData.skills];
      updatedSkills.splice(index, 1);
      setEditPostData(prev => ({ ...prev, skills: updatedSkills }));
    } else {
      const updatedSkills = [...newPost.skills];
      updatedSkills.splice(index, 1);
      setNewPost(prev => ({ ...prev, skills: updatedSkills }));
    }
  };

  const handleAddPost = () => {
    const validationErrors = validateFields(newPost);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setPosts(prev => [...prev, { ...newPost, id: Date.now(), applications: 0 }]);
    resetNewPost();
    setShowCreateForm(false);
    setErrors({});
  };

  const handleEditPost = (post) => {
    setEditingPostId(post.id);
    setEditPostData({ ...post, skillInput: '' });
    setEditErrors({});
  };

  const handleUpdatePost = () => {
    const validationErrors = validateFields(editPostData);
    if (Object.keys(validationErrors).length > 0) {
      setEditErrors(validationErrors);
      return;
    }
    setPosts(prev => prev.map(post => post.id === editingPostId ? { ...editPostData } : post));
    setEditingPostId(null);
    setEditPostData(null);
    setEditErrors({});
  };

  const handleDeletePost = (id) => {
    setPosts(prev => prev.filter(post => post.id !== id));
  };

  const resetNewPost = () => {
    setNewPost({
      title: '',
      duration: '',
      paid: false,
      salary: '',
      skillInput: '',
      skills: [],
      description: '',
    });
  };

  const handleSkillFilterAdd = () => {
    if (skillFilterInput.trim() !== '') {
      setFilterSkills(prev => [...prev, skillFilterInput.trim()]);
      setSkillFilterInput('');
    }
  };

  const handleRemoveSkillFilter = (index) => {
    const updated = [...filterSkills];
    updated.splice(index, 1);
    setFilterSkills(updated);
  };

  const handleShowApplications = (postTitle) => {
    const postUrl = postTitle.replace(/\s+/g, '-').toLowerCase();
    navigate(`/applications/${postUrl}`);
  };
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPaid = filterPaid === 'all' || (filterPaid === 'paid' && post.paid) || (filterPaid === 'unpaid' && !post.paid);
    let matchesSalary = true;
    if (filterPaid === 'paid') {
      if (filterSalary === '<1000') matchesSalary = post.salary && Number(post.salary) < 1000;
      if (filterSalary === '1000-3000') matchesSalary = post.salary && Number(post.salary) >= 1000 && Number(post.salary) <= 3000;
      if (filterSalary === '>3000') matchesSalary = post.salary && Number(post.salary) > 3000;
    }
    const matchesDuration = filterDuration === '' || post.duration === filterDuration;
    const matchesSkills = filterSkills.length === 0 || filterSkills.every(skill => post.skills.includes(skill));

    return matchesSearch && matchesPaid && matchesSalary && matchesDuration && matchesSkills;
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div style={{ padding: '20px' }}>
      {/* Create Post Form */}
      <h2>Create New Post</h2>
      <button onClick={() => setShowCreateForm(prev => !prev)} style={styles.createButton}>
        {showCreateForm ? 'Cancel Create' : 'Create New Post'}
      </button>

      {showCreateForm && (
        <div style={styles.formContainer}>
          <div style={styles.row}>
            <input
              style={styles.input}
              type="text"
              name="title"
              placeholder="Job Title"
              value={newPost.title}
              onChange={(e) => handleInputChange(e)}
            />
            {errors.title && <div style={styles.errorText}>{errors.title}</div>}

            <select
              style={styles.input}
              name="duration"
              value={newPost.duration}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="">Select Duration</option>
              <option value="1 Month">1 Month</option>
              <option value="2 Months">2 Months</option>
              <option value="3 Months">3 Months</option>
            </select>
            {errors.duration && <div style={styles.errorText}>{errors.duration}</div>}
          </div>

          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="paid"
              checked={newPost.paid}
              onChange={(e) => handleInputChange(e)}
            />
            Paid
          </label>

          {newPost.paid && (
            <>
              <input
                style={styles.input}
                type="number"
                name="salary"
                placeholder="Salary"
                value={newPost.salary}
                onChange={(e) => handleInputChange(e)}
              />
              {errors.salary && <div style={styles.errorText}>{errors.salary}</div>}
            </>
          )}

          <div style={styles.row}>
            <input
              style={styles.input}
              type="text"
              placeholder="Add Skill"
              value={newPost.skillInput}
              onChange={(e) => handleSkillInputChange(e)}
            />
            <button style={styles.addSkillButton} onClick={() => handleAddSkill()}>
              Add Skill
            </button>
          </div>

          <div style={styles.skillsTags}>
            {newPost.skills.map((skill, index) => (
              <div key={index} style={styles.skillTag}>
                {skill}
                <button onClick={() => handleRemoveSkill(index)} style={styles.removeSkillButton}>
                  x
                </button>
              </div>
            ))}
          </div>
          {errors.skills && <div style={styles.errorText}>{errors.skills}</div>}

          <textarea
            style={styles.textarea}
            name="description"
            placeholder="Job Description"
            value={newPost.description}
            onChange={(e) => handleInputChange(e)}
          />
          {errors.description && <div style={styles.errorText}>{errors.description}</div>}

          <button style={styles.saveButton} onClick={handleAddPost}>
            Save Post
          </button>
        </div>
      )}

      {/* Filters */}
      <h2>Filters</h2>
      <div style={styles.filterRow}>
        <input
          style={styles.input}
          type="text"
          placeholder="Search by Job Title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          style={styles.input}
          value={filterPaid}
          onChange={(e) => setFilterPaid(e.target.value)}
        >
          <option value="all">All</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>

        {filterPaid === 'paid' && (
          <select
            style={styles.input}
            value={filterSalary}
            onChange={(e) => setFilterSalary(e.target.value)}
          >
            <option value="all">All Salaries</option>
            <option value="<1000">Less than 1000</option>
            <option value="1000-3000">Between 1000 and 3000</option>
            <option value=">3000">More than 3000</option>
          </select>
        )}

        <select
          style={styles.input}
          value={filterDuration}
          onChange={(e) => setFilterDuration(e.target.value)}
        >
          <option value="">All Durations</option>
          <option value="1 Month">1 Month</option>
          <option value="2 Months">2 Months</option>
          <option value="3 Months">3 Months</option>
        </select>
      </div>

      {/* Skill Filters */}
      <div style={styles.filterRow}>
        <input
          style={styles.input}
          type="text"
          placeholder="Add Skill Filter"
          value={skillFilterInput}
          onChange={(e) => setSkillFilterInput(e.target.value)}
        />
        <button style={styles.addSkillButton} onClick={handleSkillFilterAdd}>
          Add Skill Filter
        </button>

        <div style={styles.skillsTags}>
          {filterSkills.map((skill, index) => (
            <div key={index} style={styles.skillTag}>
              {skill}
              <button onClick={() => handleRemoveSkillFilter(index)} style={styles.removeSkillButton}>
                x
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Posts Listing */}
      <h2>Posts</h2>
      <div style={styles.postsContainer}>
        {currentPosts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          currentPosts.map(post => (
            <div key={post.id} style={styles.postCard}>
              {editingPostId === post.id && editPostData ? (
                <>
                  {/* Edit Form */}
                  <input
                    style={styles.input}
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={editPostData.title}
                    onChange={(e) => handleInputChange(e, true)}
                  />
                  {editErrors.title && <div style={styles.errorText}>{editErrors.title}</div>}

                  <select
                    style={styles.input}
                    name="duration"
                    value={editPostData.duration}
                    onChange={(e) => handleInputChange(e, true)}
                  >
                    <option value="">Select Duration</option>
                    <option value="1 Month">1 Month</option>
                    <option value="2 Months">2 Months</option>
                    <option value="3 Months">3 Months</option>
                  </select>
                  {editErrors.duration && <div style={styles.errorText}>{editErrors.duration}</div>}

                  <label style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="paid"
                      checked={editPostData.paid}
                      onChange={(e) => handleInputChange(e, true)}
                    />
                    Paid
                  </label>

                  {editPostData.paid && (
                    <>
                      <input
                        style={styles.input}
                        type="number"
                        name="salary"
                        placeholder="Salary"
                        value={editPostData.salary}
                        onChange={(e) => handleInputChange(e, true)}
                      />
                      {editErrors.salary && <div style={styles.errorText}>{editErrors.salary}</div>}
                    </>
                  )}

                  <div style={styles.row}>
                    <input
                      style={styles.input}
                      type="text"
                      placeholder="Add Skill"
                      value={editPostData.skillInput}
                      onChange={(e) => handleSkillInputChange(e, true)}
                    />
                    <button style={styles.addSkillButton} onClick={() => handleAddSkill(true)}>
                      Add Skill
                    </button>
                  </div>

                  <div style={styles.skillsTags}>
                    {editPostData.skills.map((skill, index) => (
                      <div key={index} style={styles.skillTag}>
                        {skill}
                        <button
                          onClick={() => handleRemoveSkill(index, true)}
                          style={styles.removeSkillButton}
                        >
                          x
                        </button>
                      </div>
                    ))}
                  </div>
                  {editErrors.skills && <div style={styles.errorText}>{editErrors.skills}</div>}

                  <textarea
                    style={styles.textarea}
                    name="description"
                    placeholder="Job Description"
                    value={editPostData.description}
                    onChange={(e) => handleInputChange(e, true)}
                  />
                  {editErrors.description && <div style={styles.errorText}>{editErrors.description}</div>}

                  <button style={styles.saveButton} onClick={handleUpdatePost}>
                    Save Changes
                  </button>
                </>
              ) : (
                <>
                  {/* Normal View */}
                  <h3>{post.title}</h3>
                  <p><strong>Duration:</strong> {post.duration}</p>
                  <p><strong>Paid:</strong> {post.paid ? 'Yes' : 'No'}</p>
                  {post.paid && <p><strong>Salary:</strong> {post.salary}</p>}
                  <p><strong>Skills:</strong> {post.skills.join(', ')}</p>
                  <p><strong>Description:</strong> {post.description}</p>

                  <button style={styles.smallButton} onClick={() => handleEditPost(post)}>Edit</button>
                  <button style={styles.smallButton} onClick={() => handleDeletePost(post.id)}>Delete</button>
                  <button style={styles.smallButton} onClick={() => handleShowApplications(post.title)}>Show Applications</button>
                </>
              )}
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={styles.pagination}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            style={styles.smallButton}
          >
            Previous
          </button>

          <span>Page {currentPage} of {totalPages}</span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
            style={styles.smallButton}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
const styles = {
  createButton: {
    marginBottom: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  formContainer: {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  },
  input: {
    padding: '10px',
    width: '90%',
    maxWidth: '400px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  textarea: {
    padding: '10px',
    width: '90%',
    maxWidth: '400px',
    height: '100px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  saveButton: {
    marginTop: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  addSkillButton: {
    marginLeft: '10px',
    padding: '8px 16px',
    fontSize: '14px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  skillsTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '10px',
    justifyContent: 'center',
  },
  skillTag: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  removeSkillButton: {
    background: 'none',
    border: 'none',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  checkboxLabel: {
    marginTop: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '16px',
  },
  postsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    alignItems: 'center',
    marginTop: '20px',
  },
  postCard: {
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '10px',
    width: '90%',
    maxWidth: '600px',
    textAlign: 'left',
    position: 'relative',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  smallButton: {
    marginTop: '10px',
    marginRight: '10px',
    padding: '5px 10px',
    fontSize: '14px',
    backgroundColor: '#555',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  pagination: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
  },
  row: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  filterRow: {
    marginTop: '30px',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '15px',
  },
  errorText: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '5px',
    textAlign: 'left',
    width: '90%',
    maxWidth: '400px',
  },
};
 export default PostsList;