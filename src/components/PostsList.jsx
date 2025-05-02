import React, { useState } from 'react';

function PostsList({ posts, setPosts }) {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [editingPostId, setEditingPostId] = useState(null);
    const [newPost, setNewPost] = useState({
        title: '',
        duration: '',
        paid: false,
        salary: '',
        skillInput: '',
        skills: [],
        description: '',
    });
    const [currentPage, setCurrentPage] = useState(1);

    const postsPerPage = 5;

    const [searchQuery, setSearchQuery] = useState('');
    const [filterPaid, setFilterPaid] = useState('all');
    const [filterSalary, setFilterSalary] = useState('all');

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewPost(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSkillInputChange = (e) => {
        setNewPost(prev => ({
            ...prev,
            skillInput: e.target.value,
        }));
    };

    const handleAddSkill = () => {
        if (newPost.skillInput.trim() !== '') {
            setNewPost(prev => ({
                ...prev,
                skills: [...prev.skills, prev.skillInput.trim()],
                skillInput: '',
            }));
        }
    };

    const handleRemoveSkill = (index) => {
        const updatedSkills = [...newPost.skills];
        updatedSkills.splice(index, 1);
        setNewPost(prev => ({
            ...prev,
            skills: updatedSkills,
        }));
    };

    const handleAddPost = () => {
        if (newPost.title && newPost.duration && newPost.skills.length > 0 && newPost.description) {
            if (editingPostId) {
                setPosts(prev =>
                    prev.map(post => post.id === editingPostId ? { ...post, ...newPost } : post)
                );
                setEditingPostId(null);
            } else {
                setPosts(prev => [
                    ...prev,
                    { ...newPost, id: Date.now(), applications: Math.floor(Math.random() * 10) },
                ]);
            }
            resetForm();
        } else {
            alert("Please fill all required fields!");
        }
    };

    const handleDeletePost = (id) => {
        setPosts(prev => prev.filter(post => post.id !== id));
    };

    const handleEditPost = (post) => {
        setNewPost({
            title: post.title,
            duration: post.duration,
            paid: post.paid,
            salary: post.salary,
            skillInput: '',
            skills: [...post.skills],
            description: post.description,
        });
        setShowCreateForm(true);
        setEditingPostId(post.id);
    };

    const resetForm = () => {
        setNewPost({
            title: '',
            duration: '',
            paid: false,
            salary: '',
            skillInput: '',
            skills: [],
            description: '',
        });
        setShowCreateForm(false);
        setEditingPostId(null);
    };

    // Filtering Logic
    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPaid = filterPaid === 'all' || (filterPaid === 'paid' && post.paid) || (filterPaid === 'unpaid' && !post.paid);
        let matchesSalary = true;
        if (filterSalary === '<1000') {
            matchesSalary = post.paid && Number(post.salary) < 1000;
        } else if (filterSalary === '1000-3000') {
            matchesSalary = post.paid && Number(post.salary) >= 1000 && Number(post.salary) <= 3000;
        } else if (filterSalary === '>3000') {
            matchesSalary = post.paid && Number(post.salary) > 3000;
        }
        return matchesSearch && matchesPaid && matchesSalary;
    });

    // Pagination
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    return (
        <div style={styles.container}>
            <h2>My Internship Posts</h2>

            {/* Create Post Button */}
            <button style={styles.createButton} onClick={() => setShowCreateForm(prev => !prev)}>
                {showCreateForm ? 'Cancel Create' : 'Create New Post'}
            </button>

            {/* Create Form */}
            {showCreateForm && (
                <div style={styles.formContainer}>
                    <div style={styles.row}>
                        <input
                            style={styles.inputHalf}
                            type="text"
                            name="title"
                            placeholder="Job Title"
                            value={newPost.title}
                            onChange={handleInputChange}
                        />
                        <input
                            style={styles.inputHalf}
                            type="text"
                            name="duration"
                            placeholder="Duration (e.g. 3 months)"
                            value={newPost.duration}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div style={styles.row}>
                        {newPost.paid && (
                            <input
                                style={styles.inputHalf}
                                type="text"
                                name="salary"
                                placeholder="Expected Salary"
                                value={newPost.salary}
                                onChange={handleInputChange}
                            />
                        )}
                        <input
                            style={styles.inputHalf}
                            type="text"
                            placeholder="Skill Name"
                            value={newPost.skillInput}
                            onChange={handleSkillInputChange}
                        />
                        <button style={styles.addSkillButton} onClick={handleAddSkill}>Add Skill</button>
                    </div>

                    <div style={styles.skillsTags}>
                        {newPost.skills.map((skill, index) => (
                            <div key={index} style={styles.skillTag}>
                                {skill}
                                <button onClick={() => handleRemoveSkill(index)} style={styles.removeSkillButton}>x</button>
                            </div>
                        ))}
                    </div>

                    <div style={styles.row}>
                        <textarea
                            style={styles.inputFull}
                            name="description"
                            placeholder="Job Description"
                            value={newPost.description}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div style={styles.row}>
                        <label style={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                name="paid"
                                checked={newPost.paid}
                                onChange={handleInputChange}
                            />
                            Paid
                        </label>
                        <button style={styles.addButton} onClick={handleAddPost}>
                            {editingPostId ? 'Save Changes' : 'Add Post'}
                        </button>
                    </div>
                </div>
            )}

            {/* Filters */}
            <div style={styles.filterRow}>
                <input
                    style={styles.inputHalf}
                    type="text"
                    placeholder="Search by title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select
                    style={styles.inputHalf}
                    value={filterPaid}
                    onChange={(e) => setFilterPaid(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="paid">Paid</option>
                    <option value="unpaid">Unpaid</option>
                </select>
                <select
                    style={styles.inputHalf}
                    value={filterSalary}
                    onChange={(e) => setFilterSalary(e.target.value)}
                >
                    <option value="all">All Salaries</option>
                    <option value="<1000">Less than 1000</option>
                    <option value="1000-3000">Between 1000 and 3000</option>
                    <option value=">3000">More than 3000</option>
                </select>
            </div>

            {/* Posts List */}
            <div style={styles.postsContainer}>
                {currentPosts.length === 0 ? (
                    <p>No posts found.</p>
                ) : (
                    currentPosts.map(post => (
                        <div key={post.id} style={styles.postCard}>
                            <h3>{post.title}</h3>
                            <p><strong>Duration:</strong> {post.duration}</p>
                            <p><strong>Paid:</strong> {post.paid ? 'Yes' : 'No'}</p>
                            {post.paid && <p><strong>Salary:</strong> {post.salary} $</p>}
                            <p><strong>Skills:</strong></p>
                            <div style={styles.skillsTags}>
                                {post.skills.map((skill, idx) => (
                                    <div key={idx} style={styles.skillTag}>{skill}</div>
                                ))}
                            </div>
                            <p><strong>Description:</strong> {post.description}</p>
                            <p><strong>Applications:</strong> {post.applications}</p>
                            <button style={styles.smallButton} onClick={() => handleEditPost(post)}>Edit</button>
                            <button style={styles.smallButton} onClick={() => handleDeletePost(post.id)}>Delete</button>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div style={styles.pagination}>
                    <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>Previous</button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
                </div>
            )}
        </div>
    );
}

const styles = {
    container: { padding: '20px', textAlign: 'center' },
    createButton: { marginBottom: '20px', padding: '10px 20px', fontSize: '16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' },
    formContainer: { backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '10px', marginBottom: '30px' },
    row: { display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' },
    inputHalf: { padding: '10px', minWidth: '200px', fontSize: '16px' },
    inputFull: { width: '90%', padding: '10px', fontSize: '16px' },
    addButton: { padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' },
    addSkillButton: { padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' },
    skillsTags: { display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px', justifyContent: 'center' },
    skillTag: { backgroundColor: '#007bff', color: 'white', padding: '5px 10px', borderRadius: '15px' },
    removeSkillButton: { background: 'none', border: 'none', color: 'white', fontWeight: 'bold', marginLeft: '5px', cursor: 'pointer' },
    filterRow: { display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' },
    postsContainer: { display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' },
    postCard: { backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px', width: '90%', maxWidth: '700px', textAlign: 'left' },
    smallButton: { marginRight: '10px', padding: '5px 10px', cursor: 'pointer' },
    pagination: { marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px', alignItems: 'center' },
};

export default PostsList;
