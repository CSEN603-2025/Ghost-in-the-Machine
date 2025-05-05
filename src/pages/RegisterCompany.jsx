import React, { useState } from 'react';
import InputField from '../components/InputField';
import MainActionButton from '../components/MainActionButton';
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

    alert('Company registered successfully!');
  };

    return (
        <div style={styles.container}>
            <h2>Register Company</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <InputField
                    type="text"
                    placeholder="Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                />
                <InputField
                    type="text"
                    placeholder="Industry"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                />
                <InputField
                    type="email"
                    placeholder="Company Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputField
                    type="text"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <InputField
                    type="text"
                    placeholder="Company Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <label style={styles.label}>Select Company Size:</label>
                <select
                    value={companySize}
                    onChange={(e) => setCompanySize(e.target.value)}
                    style={styles.select}
                >
                    <option value="">-- Select Company Size --</option>
                    <option value="Small">Small (≤ 50 employees)</option>
                    <option value="Medium">Medium (51–100 employees)</option>
                    <option value="Large">Large (101–500 employees)</option>
                    <option value="Corporate">Corporate ({'>'}500 employees)</option>
                </select>

          {/* Company Image Upload */}
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
            {errors.imageFile && <p className="text-red-500 text-sm mt-1">{errors.imageFile}</p>}
          </div>

          {/* Company Document Upload */}
          <div>
            <label className="block text-[#20368F] font-semibold mb-2">Upload Company Document</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setDocumentFile(e.target.files[0])}
              className="w-full py-3 border-2 border-[#E1E4E8] rounded-lg focus:ring-2 focus:ring-[#20368F] focus:outline-none transition"
            />
            {errors.documentFile && <p className="text-red-500 text-sm mt-1">{errors.documentFile}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#20368F] to-[#1D4D8C] text-white font-semibold py-3 rounded-lg hover:bg-[#1c5d8d] transition duration-300"
          >
            Register
          </button>

          {/* Already Registered Button */}
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

const styles = {
    container: {
        maxWidth: '400px',
        margin: '80px auto',
        padding: '24px',
        border: '1px solid #eee',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        marginTop: '10px',
        marginBottom: '5px',
        textAlign: 'left',
    },
    select: {
        padding: '10px',
        fontSize: '14px',
        marginBottom: '15px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    fileInput: {
        marginBottom: '15px',
    },
    previewImage: {
        marginTop: '10px',
        width: '150px',
        height: '150px',
        objectFit: 'contain',  
        borderRadius: '8px',
        border: '1px solid #ddd',
        backgroundColor: '#f9f9f9',
    },
    button: {
        padding: '10px',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        marginTop: '10px',
    },
    backButton: {
        marginTop: '15px',
        backgroundColor: '#6c757d',
        color: 'white',
        padding: '10px',
        fontSize: '14px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    message: {
        marginTop: '12px',
        fontWeight: 'bold',
    },
};

export default RegisterCompanyPage;
