import React, { useState } from 'react';
import InputField from '../components/InputField';
import MainActionButton from '../components/MainActionButton';
import { useNavigate } from 'react-router-dom';
import {FaEye} from 'react-icons/fa';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegisterClick = () => navigate('/register-company');

  const handleSubmit = e => {
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
      navigate('/company-dashboard');
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

      <button onClick={handleRegisterClick} style={styles.registerButton}>
        Register a Company
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '320px',
    margin: '100px auto',
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
  registerButton: {
    marginTop: '20px',
    backgroundColor: '#003366',
    color: 'white',
    padding: '10px',
    fontSize: '14px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: '12px',
  },
  success: {
    color: 'green',
    marginTop: '12px',
  },
};

export default LoginPage;