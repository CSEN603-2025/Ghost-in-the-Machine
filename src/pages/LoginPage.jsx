import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {FaEye} from 'react-icons/fa';
import { useNotifications } from '../contexts/NotificationContext';

function LoginPage() {
    const navigate = useNavigate();
    const { clearNotifications } = useNotifications();

    useEffect(() => {
        clearNotifications();
    }, [clearNotifications]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // ✅ ADD THIS
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
  
   
  const handleRegisterClick = () => navigate('/register-company');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
  
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
  
    // check if email matches any known emails
    const validUsers = {
      'student@guc.com': '123',
      'rep@corp.com': '1234',
      'officer@scad.com': '12345',
      'faculty@guc.com': '123',
      'prostudent@guc.com': '123',
    };
  
    if (email in validUsers) {
      // email correct
      if (password === validUsers[email]) {
        // password correct
        if (email === 'student@guc.com') {
          setSuccess('Student login successful!');
          navigate('/student-dashboard');
        } else if (email === 'rep@corp.com') {
          setSuccess('Company login successful!');
          navigate('/dashboard');
        } else if (email === 'officer@scad.com') {
          setSuccess('SCAD login successful!');
          navigate('/scad-dashboard');
        } 
        else if (email === 'faculty@guc.com') {
          setSuccess('Fculty login successful!');
          navigate('/faculty-dashboard');
        }
        else if (email === 'prostudent@guc.com') {  
          setSuccess('ProStudent login successful!');
          navigate('/pro-student-dashboard');
        }
        
      } else {
        // password wrong
        setError('Wrong password');
      }
    } else {
      // email wrong
      if (Object.values(validUsers).includes(password)) {
        // password correct but email wrong
        setError('Invalid email');
      } else {
        // both email and password wrong
        setError('Invalid email and password');
      }
    }
  };
  

  const handleCloseError = () => {
    setError(null);
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

          {/* Error Box */}
          {error && (
            <div className="relative w-full flex flex-wrap items-center justify-center py-3 pl-4 pr-14 rounded-lg text-base font-medium transition-all border border-[#f85149] text-[#b22b2b] group bg-[linear-gradient(#f851491a,#f851491a)]">
              <button
                type="button"
                aria-label="close-error"
                onClick={handleCloseError}
                className="absolute right-4 p-1 rounded-md transition-opacity text-[#f85149] border border-[#f85149] opacity-40 hover:opacity-100"
              >
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  height="16"
                  width="16"
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
              <p className="flex flex-row items-center mr-auto gap-x-2">
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  height="28"
                  width="28"
                  className="h-7 w-7"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                  <path d="M12 9v4"></path>
                  <path d="M12 17h.01"></path>
                </svg>
                {error}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#20368F] to-[#1D4D8C] text-white font-semibold rounded-lg hover:opacity-90 transition"
          >
            Log In
          </button>

          {/* Success Message */}
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