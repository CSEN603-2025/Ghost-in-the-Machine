import React, { useState } from 'react';
import InputField from '../components/InputField';
import MainActionButton from '../components/MainActionButton';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

const handleRegisterClick = () => {
    navigate('/register-company');
};
    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === '' || password === '') {
            setError('Please fill in all fields');
            return;
        } else {
            if (email === 'student@guc.com' && password === '123') {
                setError('Student login successful!');
            }
            else if(email === 'company@corp.com' && password === '1234') {
                setError('Company login successful!')
            }
            else if (email === 'scad@gucscad.com' && password === '12345'){
                setError('SCAD login successful')
            }
            else {
                setError('Invalid email or password');
            }
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
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputField
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <MainActionButton type="submit" style={styles.button}> Log In </MainActionButton>
                {error && <p style={styles.error}>{error}</p>}
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
  };

export default LoginPage;