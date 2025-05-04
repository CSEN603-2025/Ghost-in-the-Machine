import React, { useState } from 'react';
import InputField from '../components/InputField';
import MainActionButton from '../components/MainActionButton';
import { useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';

function LoginPage() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegisterClick = () => navigate('/register-company');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (email === 'student@guc.com' && password === '123') {
      setSuccess('Student login successful!');
      navigate('/student-dashboard');
    } else if (email === 'rep@corp.com' && password === '1234') {
      setSuccess('Company login successful!');
      navigate('/dashboard');
    } else if (email === 'officer@scad.com' && password === '12345') {
      setSuccess('SCAD login successful!');
      navigate('/scad-dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4">
      <div className="w-full max-w-sm bg-[#F5F5F5] shadow-lg rounded-lg p-8 border border-[#E0E6EF]">

        <h2 className="text-2xl font-semibold text-[#20368F] mb-8 text-center">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#E1E4E8] rounded-lg focus:ring-2 focus:ring-[#20368F] focus:outline-none transition"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 pr-12 border-2 border-[#E1E4E8] rounded-lg focus:ring-2 focus:ring-[#20368F] focus:outline-none transition"
            />
            <button
              type="button"
              onMouseDown={() => setShowPassword(true)}
              onMouseUp={() => setShowPassword(false)}
              onMouseLeave={() => setShowPassword(false)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              <FaEye size={20} />
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#20368F] to-[#1D4D8C] text-white font-semibold rounded-lg hover:opacity-90 transition"
          >
            Log In
          </button>

          {/* Error and Success Messages */}
          {error && (
            <p className="text-red-500 text-sm font-bold mt-2 text-center">{error}</p>
          )}
          {success && (
            <p className="text-green-600 text-sm font-bold mt-2 text-center">{success}</p>
          )}
        </form>

        {/* Register Button */}
        <button
          onClick={handleRegisterClick}
          className="w-full mt-6 bg-[#E1E4E8] text-[#20368F] font-medium py-3 rounded-lg hover:bg-[#D1D7DC] transition"
        >
          Register a Company
        </button>
        
      </div>
    </div>
  );
}

export default LoginPage;
