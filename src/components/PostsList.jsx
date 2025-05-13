import React, { useState } from 'react';
import { FaSearch, FaCalendarAlt, FaDollarSign, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

const dummyCompany = {
  name: "Google LLC",
  industry: "Technology",
  size: "Corporate",
  email: "contact@google.com",
  logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
};



const dummyPosts = [
  {
    id: 1,
    title: 'Frontend Developer Intern',
    duration: '3 Months',
    paid: true,
    salary: '$3000/month',
    skills: ['React', 'CSS'],
    description: 'Work on frontend development for scalable web apps.',
    applications: 4,
  },
  {
    id: 2,
    title: 'Data Analyst Intern',
    duration: '2 Months',
    paid: false,
    salary: '',
    skills: ['Excel', 'SQL'],
    description: 'Assist with reporting and data cleansing tasks.',
    applications: 2,
  },
  {
    id: 3,
    title: 'Devops Intern',
    duration: '1 Month',
    paid: true,
    salary: '$2000/month',
    skills: ['Flutter', 'Dart','container'],
    description: 'Work with our Devops team to automate our deployment process.',
    applications: 3,
  }
];

const PostsList = () => {
  const navigate = useNavigate();
  useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  
const getCompanyLogo = () => dummyCompany.logoUrl;
const [posts, setPosts] = useState(() => {
  const stored = sessionStorage.getItem('posts');
  return stored ? JSON.parse(stored) : dummyPosts;
});

useEffect(() => {
  sessionStorage.setItem('posts', JSON.stringify(posts));
}, [posts]);
const [successMessage, setSuccessMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [durationFilter, setDurationFilter] = useState('');
  const [paidFilter, setPaidFilter] = useState('');
  const [skillFilterInput, setSkillFilterInput] = useState('');
  const [filterSkills, setFilterSkills] = useState([]);
  const [creating, setCreating] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [formData, setFormData] = useState(null);
  const [errors, setErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteMessage, setDeleteMessage] = useState('');
const [showConfirmDelete, setShowConfirmDelete] = useState(false);
const [postToDelete, setPostToDelete] = useState(null);

  const postsPerPage = 6;

  const validateFields = (data) => {
    const newErrors = {};
    if (!data.title.trim()) newErrors.title = 'Title is required';
    if (!data.duration) newErrors.duration = 'Duration is required';
    if (data.paid && !data.salary) newErrors.salary = 'Salary is required for paid posts';
    if (data.skills.length === 0) newErrors.skills = 'Add at least one skill';
    if (!data.description.trim()) newErrors.description = 'Description is required';
    return newErrors;
  };

  const handleSkillFilterAdd = () => {
    if (skillFilterInput.trim()) {
      setFilterSkills(prev => [...prev, skillFilterInput.trim()]);
      setSkillFilterInput('');
    }
  };

  const handleSkillFilterRemove = (index) => {
    const updated = [...filterSkills];
    updated.splice(index, 1);
    setFilterSkills(updated);
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDuration = durationFilter === '' || post.duration === durationFilter;
    const matchesPaid = paidFilter === '' || (paidFilter === 'paid' && post.paid) || (paidFilter === 'unpaid' && !post.paid);
    const matchesSkills = filterSkills.length === 0 || filterSkills.every(skill => post.skills.includes(skill));
    return matchesSearch && matchesDuration && matchesPaid && matchesSkills;
  });
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const resetForm = () => {
    setFormData(null);
    setErrors({});
    setCreating(false);
    setEditingPostId(null);
  };

  const handleCreateClick = () => {
    setFormData({
      id: Date.now(),
      title: '',
      company: dummyCompany.name,
      industry: dummyCompany.industry,
      duration: '',
      paid: false,
      salary: '',
      skills: [],
      skillInput: '',
      description: '',
      applications: 0,
    });
    setCreating(true);
  };

  const handleEditClick = (post) => {
    setFormData({ ...post, skillInput: '' });
    setEditingPostId(post.id);
    setCreating(true);
  };

  const confirmDeletePost = () => {
  if (!postToDelete) return;
  setPosts(prev => prev.filter(post => post.id !== postToDelete.id));
  setDeleteMessage('Post deleted successfully!');
  setTimeout(() => setDeleteMessage(''), 3000);
  setPostToDelete(null);
  setShowConfirmDelete(false);
};

const handleDelete = (post) => {
  setPostToDelete(post);
  setShowConfirmDelete(true);
};

  const handleSkillAdd = () => {
    if (formData.skillInput.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, prev.skillInput.trim()],
        skillInput: ''
      }));
    }
  };

  const handleSkillRemove = (index) => {
    const updated = [...formData.skills];
    updated.splice(index, 1);
    setFormData(prev => ({ ...prev, skills: updated }));
  };

  const handleSave = () => {
    const validation = validateFields(formData);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    let updatedFormData = { ...formData };
    if (updatedFormData.paid && !updatedFormData.salary.trim().toLowerCase().endsWith('/month')) {
      updatedFormData.salary = updatedFormData.salary.trim() + '/month';
    }

  if (editingPostId !== null) {
  setPosts(prev => prev.map(p => p.id === editingPostId ? updatedFormData : p));
 setSuccessMessage('Post updated successfully!');
setTimeout(() => setSuccessMessage(''), 3000);


} else {
  setPosts(prev => [updatedFormData, ...prev]);
setSuccessMessage('Post added successfully!');
setTimeout(() => setSuccessMessage(''), 3000); 
}

resetForm();


setTimeout(() => setSuccessMessage(''), 3000);

  };

  const handleViewApplications = (title) => {
  const url = `/applications/${title.toLowerCase().replace(/\s+/g, '-')}`;
  navigate(url);
};

  return (
   
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Red alert for deletion */}
{deleteMessage && (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 30 }}
    className="fixed bottom-6 right-6 bg-red-100 text-red-800 px-6 py-3 rounded-lg shadow-lg z-50"
  >
    {deleteMessage}
  </motion.div>
)}

{/* Confirmation Modal */}
<AnimatePresence>
  {showConfirmDelete && (
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
        <h3 className="text-xl font-semibold mb-4">Are you sure you want to delete this post?</h3>
        <p className="text-gray-600 mb-6">This action cannot be undone.</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setShowConfirmDelete(false)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={confirmDeletePost}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Yes, Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
   {successMessage && (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 30 }}
    className="fixed bottom-6 right-6 bg-green-100 text-green-800 px-6 py-3 rounded-lg shadow-lg z-50"
  >
    {successMessage}
  </motion.div>
)}

      <motion.div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00106A] to-[#0038A0] opacity-95"></div>
        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Manage Your Internship Posts</h1>
          <p className="text-lg text-blue-100 mb-6">Create, view, and modify your available internship posts</p>
          <div className="flex justify-center">
            <div className="w-full max-w-md relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-blue-300" />
              </div>
              <input
                type="text"
                placeholder="Search by job title or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-blue-300/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleCreateClick}
              className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-all"
            >
              + Create Post
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-8 -mt-10 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100"
        >
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {/* Duration */}
  <div className="flex flex-col translate-y-[6.5px]">
    <label className="text-sm font-medium text-gray-700 mb-1">Duration</label>
    <div className="relative">
      <FaCalendarAlt className="absolute top-3 left-3 text-gray-400" />
      <select
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={durationFilter}
        onChange={(e) => setDurationFilter(e.target.value)}
      >
        <option value="">All Durations</option>
        <option value="1 Month">1 Month</option>
        <option value="2 Months">2 Months</option>
        <option value="3 Months">3 Months</option>
        <option value="6 Months">6 Months</option>
      </select>
    </div>
  </div>

  {/* Compensation */}
  <div className="flex flex-col translate-y-[6.5px]">
    <label className="text-sm font-medium text-gray-700 mb-1">Compensation</label>
    <div className="relative">
      <FaDollarSign className="absolute top-3 left-3 text-gray-400" />
      <select
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={paidFilter}
        onChange={(e) => setPaidFilter(e.target.value)}
      >
        <option value="">All</option>
        <option value="paid">Paid</option>
        <option value="unpaid">Unpaid</option>
      </select>
    </div>
  </div>

  {/* Filter by Skill */}
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1">Filter by Skill</label>
    <div className="flex mt-[5px]">
      <input
        type="text"
        value={skillFilterInput}
        onChange={(e) => setSkillFilterInput(e.target.value)}
        placeholder="Enter skill..."
        className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <button
        onClick={handleSkillFilterAdd}
        className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
      >
        Add
      </button>
    </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {filterSkills.map((skill, i) => (
                  <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                    {skill}
                    <button className="ml-2 text-blue-600 hover:text-blue-800" onClick={() => handleSkillFilterRemove(i)}>×</button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        <AnimatePresence>
          {creating && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => resetForm()}
            >
              <motion.div
                className="bg-white rounded-xl p-6 w-full max-w-lg relative shadow-xl"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <button onClick={resetForm} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                  <FaTimes />
                </button>
                <h2 className="text-2xl font-bold mb-4">{editingPostId ? 'Edit Post' : 'Create Post'}</h2>

                <input
                  type="text"
                  placeholder="Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full mb-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.title && <p className="text-red-700 font-bold text-sm mb-2">{errors.title}</p>}

                <select
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full mb-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Duration</option>
                  <option value="1 Month">1 Month</option>
                  <option value="2 Months">2 Months</option>
                  <option value="3 Months">3 Months</option>
                  <option value="6 Months">6 Months</option>
                </select>
                {errors.duration && <p className="text-red-700 font-bold text-sm mb-2">{errors.duration}</p>}

                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    checked={formData.paid}
                    onChange={(e) => setFormData({ ...formData, paid: e.target.checked })}
                  />
                  <span>Paid</span>
                </div>

                {formData.paid && (
                  <>
                    <input
                      type="text"
                      placeholder="Salary"
                      value={formData.salary}
                      onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                      onBlur={() => {
                        if (formData.salary && !formData.salary.toLowerCase().includes('/month')) {
                          setFormData(prev => ({
                            ...prev,
                            salary: prev.salary.trim() + '/month'
                          }));
                        }
                      }}
                      className="w-full mb-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.salary && <p className="text-red-700 font-bold text-sm mb-2">{errors.salary}</p>}
                  </>
                )}

                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Add skill"
                    value={formData.skillInput}
                    onChange={(e) => setFormData({ ...formData, skillInput: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={handleSkillAdd}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.skills.map((skill, i) => (
                    <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                      {skill}
                      <button
                        onClick={() => handleSkillRemove(i)}
                        className="ml-2 text-blue-600 hover:text-blue-900"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                {errors.skills && <p className="text-red-700 font-bold text-sm mb-2">{errors.skills}</p>}

                <textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full mb-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.description && <p className="text-red-700 font-bold text-sm mb-2">{errors.description}</p>}

                <div className="flex justify-end gap-2">
                  <button onClick={resetForm} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">
                    Cancel
                  </button>
                  <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    {editingPostId ? 'Save Changes' : 'Create Post'}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentPosts.map(post => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:ring-2 hover:ring-opacity-30 hover:ring-[#0038A0] transition-all h-full flex flex-col"
            >
              <div className="h-2 w-full bg-gradient-to-r from-blue-600 to-blue-800"></div>
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <img
                    src={getCompanyLogo()}
                    alt="logo"
                    className="w-12 h-12 object-contain rounded mr-4"
                  />
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{post.title}</h2>
                    <p className="text-sm text-gray-600">{post.company || 'Google LLC'}</p>
                  </div>
                </div>

                <p className="text-gray-600 mb-1"><strong>Duration:</strong> {post.duration}</p>

                <span
  className={`w-fit px-3 py-1 rounded-full text-xs font-medium mb-3 ${
    post.paid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
  }`}
>
  {post.paid ? `Paid • ${post.salary}` : 'Unpaid'}
</span>


                <p className="text-gray-600 text-sm mb-2">
                  <strong>Skills:</strong> {post.skills.join('- ')}
                </p>

                <p className="text-gray-600 text-sm mb-4 flex-grow"> <strong>Description:</strong> {post.description}</p>

                <div className="mt-auto flex justify-center gap-2">
                  <button
                    onClick={() => handleEditClick(post)}
                    className="px-3 py-1 bg-blue-700 text-white text-sm rounded-lg hover:bg-blue-800 transition"
                  >
                    Edit
                  </button>
                  <button
                   onClick={() => handleDelete(post)}

                    className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleViewApplications(post.title)}
                    className="px-3 py-1 bg-gray-700 text-white text-sm rounded-lg hover:bg-gray-800 transition"
                  >
                    View Applications
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {totalPages > 1 && (
          <div className="mt-10 flex justify-center items-center gap-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Prev
            </button>

            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsList;
