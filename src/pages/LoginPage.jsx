import React, { useState } from 'react';
import InputField from '../components/InputField';
import MainActionButton from '../components/MainActionButton';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === '' || password === '') {
            setError('Please fill in all fields');
            return;
        } else {
            if (email == 'user@mail.com' && password == 'p123') {
                setError('Login successful!');
            }
            else {
                setError('Invalid email or password');
            }
        }
        // Handle login logic here
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
    error: {
      color: 'red',
      marginTop: '12px',
    },
  };

export default LoginPage;