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
    const [imageFile, setImageFile] = useState(null);
    const [documentFile, setDocumentFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null); 
    const [error, setError] = useState(null);
    
    const handleBackToLoginClick = () => {
        navigate('/');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (companyName === '' || email === '' || phone === '' || address === '') {
            setError('Please fill in all text fields');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Invalid email format');
            return;
        }
        if (!imageFile) {
            setError('Please upload a company image');
            return;
        }
        if (!documentFile) {
            setError('Please upload a company document');
            return;
        }

        
        setError('Company registered successfully!');
        console.log('Registering company:', {
            companyName,
            email,
            phone,
            address,
            imageFile,
            documentFile
        });

       
        setCompanyName('');
        setEmail('');
        setPhone('');
        setAddress('');
        setImageFile(null);
        setDocumentFile(null);
        setImagePreview(null);

       
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

                
                <label style={styles.label}>Upload Company Image:</label>
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
                    style={styles.fileInput}
                />

                {imagePreview && (
                    <img
                        src={imagePreview}
                        alt="Company Preview"
                        style={styles.previewImage}
                    />
                )}

               
                <label style={styles.label}>Upload Company Document:</label>
                <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setDocumentFile(e.target.files[0])}
                    style={styles.fileInput}
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
            <button type="backButton" onClick={handleBackToLoginClick} style={styles.backButton}>
    Already registered? Login
</button>
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
