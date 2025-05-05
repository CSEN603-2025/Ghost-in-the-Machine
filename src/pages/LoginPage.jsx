import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

    if (email === 'student@guc.com' && password === '123') {
      setSuccess('Student login successful!');
      // redirect to student dashboard
      navigate('/student-dashboard');
    }
    else if (email === 'rep@corp.com' && password === '1234') {
      setSuccess('Company login successful!');
      navigate('/dashboard');
    }
    else if (email === 'officer@scad.com' && password === '12345') {
      setSuccess('SCAD login successful!');
      navigate('/scad-dashboard');
    }
    else {
      setError('Invalid email or password');
    }

    console.log('Logging in with', email, password);
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ width: '100%' }} // ensures email input fills container
        />
        <div style={{ position: 'relative' }}>
          <InputField
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', paddingRight: '40px' }} // full width with extra right padding for the icon
          />
          <button 
            type="button"
            onMouseDown={() => setShowPassword(true)}
            onMouseUp={() => setShowPassword(false)}
            onMouseLeave={() => setShowPassword(false)}
            style={{
              position: 'absolute',
              right: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <FaEye />
          </button>
        </div>
        <MainActionButton type="submit" style={styles.button}>
          Log In
        </MainActionButton>

        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}
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
