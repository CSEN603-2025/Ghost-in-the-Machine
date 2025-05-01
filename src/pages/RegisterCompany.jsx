
import React, { useState } from 'react';
import InputField from '../components/InputField';
import MainActionButton from '../components/MainActionButton';
import { useNavigate } from 'react-router-dom';
function RegisterCompanyPage() {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
       
        if (companyName === '' || email === '' || phone === '' || address === '') {
            setError('Please fill in all fields');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Invalid email format');
            return;
        }

        
        setError('Company registered successfully!');
        console.log('Registering company:', { companyName, email, phone, address });

        
        setCompanyName('');
        setEmail('');
        setPhone('');
        setAddress('');
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

                <MainActionButton type="submit" style={styles.button}>
                    Register
                </MainActionButton>

                {error && (
                    <p
                        style={{
                            ...styles.message,
                            color: error === 'Company registered successfully!' ? 'green' : 'red',
                        }}
                    >
                        {error}
                    </p>
                )}
            </form>
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
    message: {
        marginTop: '12px',
        fontWeight: 'bold',
    },
};

export default RegisterCompanyPage;
