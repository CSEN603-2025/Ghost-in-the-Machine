import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterCompanyPage() {
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [documentFile, setDocumentFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [globalError, setGlobalError] = useState('');

  const [errors, setErrors] = useState({
    companyName: '',
    industry: '',
    companySize: '',
    email: '',
    phone: '',
    address: '',
    imageFile: '',
    documentFile: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    let formErrors = {
      companyName: '',
      industry: '',
      companySize: '',
      email: '',
      phone: '',
      address: '',
      imageFile: '',
      documentFile: ''
    };

    if (!companyName) formErrors.companyName = 'Company name is required';
    if (!industry) formErrors.industry = 'Industry is required';
    if (!companySize) formErrors.companySize = 'Company size is required';
    if (!email) formErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) formErrors.email = 'Invalid email format';
    if (!phone) formErrors.phone = 'Phone number is required';
    if (!address) formErrors.address = 'Address is required';
    if (!imageFile) formErrors.imageFile = 'Please upload a company image';
    if (!documentFile) formErrors.documentFile = 'Please upload a company document';

    if (Object.values(formErrors).some((error) => error !== '')) {
      setErrors(formErrors);
      setGlobalError('Please fix the highlighted fields.');
      setSuccessMessage('');
      return;
    }

    console.log({
      companyName, industry, companySize, email, phone, address, imageFile, documentFile
    });

    setCompanyName('');
    setIndustry('');
    setCompanySize('');
    setEmail('');
    setPhone('');
    setAddress('');
    setImageFile(null);
    setDocumentFile(null);
    setImagePreview(null);
    setErrors({
      companyName: '',
      industry: '',
      companySize: '',
      email: '',
      phone: '',
      address: '',
      imageFile: '',
      documentFile: ''
    });
    setGlobalError('');
    setSuccessMessage('Company registered successfully!');
  };

  return (
    <div className="min-h-screen bg-white py-20 px-4 text-center">
      <div className="w-full max-w-lg mx-auto bg-[#F5F5F5] shadow-lg rounded-lg p-10 space-y-8 border border-[#E0E6EF]">

        <h2 className="text-3xl font-semibold text-[#20368F] tracking-wide">Register Your Company</h2>

        <form onSubmit={handleSubmit} className="space-y-7">

          {/* Company Name */}
          <div>
            <label className="block text-[#20368F] font-semibold mb-2">Company Name</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-5 py-3 border-2 border-[#E1E4E8] rounded-lg focus:ring-2 focus:ring-[#20368F] focus:outline-none transition"
            />
            {errors.companyName && <p className="text-red-500 text-sm font-bold mt-1">{errors.companyName}</p>}
          </div>

          {/* Industry */}
          <div>
            <label className="block text-[#20368F] font-semibold mb-2">Industry</label>
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-5 py-3 border-2 border-[#E1E4E8] rounded-lg focus:ring-2 focus:ring-[#20368F] focus:outline-none transition"
            />
            {errors.industry && <p className="text-red-500 text-sm font-bold mt-1">{errors.industry}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-[#20368F] font-semibold mb-2">Company Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 border-2 border-[#E1E4E8] rounded-lg focus:ring-2 focus:ring-[#20368F] focus:outline-none transition"
            />
            {errors.email && <p className="text-red-500 text-sm font-bold mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-[#20368F] font-semibold mb-2">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-5 py-3 border-2 border-[#E1E4E8] rounded-lg focus:ring-2 focus:ring-[#20368F] focus:outline-none transition"
            />
            {errors.phone && <p className="text-red-500 text-sm font-bold mt-1">{errors.phone}</p>}
          </div>

          {/* Address */}
          <div>
            <label className="block text-[#20368F] font-semibold mb-2">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-5 py-3 border-2 border-[#E1E4E8] rounded-lg focus:ring-2 focus:ring-[#20368F] focus:outline-none transition"
            />
            {errors.address && <p className="text-red-500 text-sm font-bold mt-1">{errors.address}</p>}
          </div>

          {/* Company Size */}
          <div>
            <label className="block text-[#20368F] font-semibold mb-2">Company Size</label>
            <select
              value={companySize}
              onChange={(e) => setCompanySize(e.target.value)}
              className="w-full px-5 py-3 border-2 border-[#E1E4E8] rounded-lg bg-white text-[#20368F] focus:ring-2 focus:ring-[#20368F] focus:outline-none transition"
            >
              <option value="">-- Select Company Size --</option>
              <option value="Small">Small (≤ 50 employees)</option>
              <option value="Medium">Medium (51–100 employees)</option>
              <option value="Large">Large (101–500 employees)</option>
              <option value="Corporate">Corporate (&gt;500 employees)</option>
            </select>
            {errors.companySize && <p className="text-red-500 text-sm font-bold mt-1">{errors.companySize}</p>}
          </div>

          {/* Upload Image */}
          <div>
            <label className="block text-[#20368F] font-semibold mb-2">Upload Company Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setImageFile(file);
                if (file) {
                  setImagePreview(URL.createObjectURL(file));
                }
              }}
              className="w-full py-3 border-2 border-[#E1E4E8] rounded-lg focus:ring-2 focus:ring-[#20368F] focus:outline-none transition"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-24 h-24 object-cover mt-4 rounded-lg border border-[#E1E4E8]"
              />
            )}
            {errors.imageFile && <p className="text-red-500 text-sm font-bold mt-1">{errors.imageFile}</p>}
          </div>

          {/* Upload Document */}
          <div>
            <label className="block text-[#20368F] font-semibold mb-2">Upload Company Document</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setDocumentFile(e.target.files[0])}
              className="w-full py-3 border-2 border-[#E1E4E8] rounded-lg focus:ring-2 focus:ring-[#20368F] focus:outline-none transition"
            />
            {documentFile && (
              <p className="text-gray-500 text-sm mt-2">{documentFile.name}</p>
            )}
            {errors.documentFile && <p className="text-red-500 text-sm font-bold mt-1">{errors.documentFile}</p>}
          </div>

          {/* Error Message */}
          {globalError && (
            <div className="relative w-full flex flex-wrap items-center justify-center py-3 pl-4 pr-14 rounded-lg text-base font-medium transition-all border-solid border border-[#f85149] text-[#b22b2b] bg-[linear-gradient(#f851491a,#f851491a)]">
              <p className="flex flex-row items-center mr-auto gap-x-2 text-sm">
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  height="20"
                  width="20"
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                  <path d="M12 9v4" />
                  <path d="M12 17h.01" />
                </svg>
                {globalError}
              </p>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-100 text-green-700 font-semibold p-3 rounded-lg">
              {successMessage}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#20368F] to-[#1D4D8C] text-white font-semibold py-3 rounded-lg hover:bg-[#1c5d8d] transition duration-300"
          >
            Register
          </button>

          {/* Already Registered */}
          <button
            type="button"
            onClick={() => navigate('/welcome')}
            className="w-full mt-4 bg-[#E1E4E8] text-[#20368F] font-medium py-3 rounded-lg hover:bg-[#D1D7DC] transition"
          >
            Already registered? Login
          </button>

        </form>
      </div>
    </div>
  );
}

export default RegisterCompanyPage;
