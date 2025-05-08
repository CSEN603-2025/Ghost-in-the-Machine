import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';

export default function RegisterCompanyPage() {
  const navigate = useNavigate();

  // Form state
  const [companyName, setCompanyName]   = useState('');
  const [industry,    setIndustry]      = useState('');
  const [companySize, setCompanySize]   = useState('');
  const [email,       setEmail]         = useState('');
  const [phone,       setPhone]         = useState('');
  const [address,     setAddress]       = useState('');
  const [imageFile,   setImageFile]     = useState(null);
  const [imagePreview,setImagePreview]  = useState(null);
  const [documentFiles, setDocumentFiles] = useState([]);

  // Dragging state
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const [isDraggingDoc,   setIsDraggingDoc]   = useState(false);

  // Validation and flow
  const [errors,        setErrors]        = useState({});
  const [showFormError, setShowFormError] = useState(false);
  const [loading,       setLoading]       = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);


  // Inject loader + pulse keyframes once
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      /* Loader animations from Uiverse */
      svg.loader {
        width: 3.25em;
        transform-origin: center;
        animation: rotate4 2s linear infinite;
      }
      svg.loader circle {
        fill: none;
        stroke: hsl(214, 97%, 59%);
        stroke-width: 2;
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
        stroke-linecap: round;
        animation: dash4 1.5s ease-in-out infinite;
      }
      @keyframes rotate4 {
        100% { transform: rotate(360deg); }
      }
      @keyframes dash4 {
        0%   { stroke-dasharray: 1,200; stroke-dashoffset: 0; }
        50%  { stroke-dasharray: 90,200; stroke-dashoffset: -35px; }
        100% { stroke-dashoffset: -125px; }
      }
      /* Pulse keyframes for title dot */
      @keyframes pulse {
        0%   { transform: scale(1); opacity: 1; }
        50%  { transform: scale(1.5); opacity: 0.7; }
        100% { transform: scale(2); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Image drop handler
  const handleImageDrop = e => {
    e.preventDefault();
    setIsDraggingImage(false);
    const f = e.dataTransfer.files[0];
    if (f?.type.startsWith('image/')) {
      setImageFile(f);
      setImagePreview(URL.createObjectURL(f));
    }
  };

  // Document add handler with inline limit error
  const handleFilesAdd = files => {
    if (documentFiles.length + files.length > 5) {
      setErrors(prev => ({ ...prev, documentFilesLimit: true }));
      return;
    }
    // clear limit error if previously set
    setErrors(prev => {
      const { documentFilesLimit, ...rest } = prev;
      return rest;
    });
    setDocumentFiles(prev => [...prev, ...files]);
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  // Correct removal by index
  const removeDocument = idx => {
    setDocumentFiles(prev => prev.filter((_, i) => i !== idx));
    setErrors(prev => {
      const { documentFilesLimit, ...rest } = prev;
      return rest;
    });
  };

  // Submit handler with validation & loader
  // Submit handler with validation & loader
const handleSubmit = e => {
  e.preventDefault();
  const newErrors = {};
  if (!companyName.trim())         newErrors.companyName     = true;
  if (!industry.trim())            newErrors.industry        = true;
  if (!email.trim())               newErrors.email           = true;
  if (!phone.trim())               newErrors.phone           = true;
  if (!address.trim())             newErrors.address         = true;
  if (!companySize)                newErrors.companySize     = true;
  if (!imageFile)                  newErrors.imageFile       = true;
  if (documentFiles.length === 0)  newErrors.documentFiles   = true;

  if (Object.keys(newErrors).length) {
    setErrors(newErrors);
    setShowFormError(true);
    return;
  }

  // Start loader
  setShowFormError(false);
  setLoading(true);

  // Mock async registration
  setTimeout(() => {
    setLoading(false);
    setShowSuccess(true);
  }, 2000);
};
if (loading) {
  return (
    <div style={styles.loaderContainer}>
      <svg className="loader" viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="20"></circle>
      </svg>
    </div>
  );
}

if (showSuccess) {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      backgroundColor: '#f5f5f5' 
    }}>
      <div style={{
        position: 'relative',
        maxWidth: '400px',
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: '20px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        padding: '30px',
        textAlign: 'center'
      }}>
        {/* Close (Dismiss) Button */}
        <button
          type="button"
          onClick={() => {
            setShowSuccess(false);
            navigate('/welcome');
          }}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'transparent',
            border: 'none',
            fontSize: '20px',
            color: '#999',
            cursor: 'pointer'
          }}
        >
          ✕
        </button>

        {/* Pulsing Green Circle */}
        <div style={{
          margin: '0 auto',
          width: '70px',
          height: '70px',
          backgroundColor: '#e2feee',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '20px',
          animation: 'pulse 1s infinite alternate',
          transformOrigin: 'center',
        }}>
          <svg viewBox="0 0 24 24" width="40" height="40" fill="none">
            <path d="M5 13l4 4L19 7" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Title */}
        <h2 style={{ color: '#066e29', fontSize: '22px', fontWeight: '600', marginBottom: '10px' }}>
          Registration Received
        </h2>

        {/* Message */}
        <p style={{ color: '#595b5f', fontSize: '15px', lineHeight: '1.5' }}>
          The GUCI Internship System received your registration and will soon respond to you.
        </p>
      </div>

      {/* Keyframes animation inline inside <style> */}
      <style>
        {`
          @keyframes pulse {
            from { transform: scale(1); }
            to { transform: scale(1.09); }
          }
        `}
      </style>
    </div>
  );
}



  // Main form
  return (
    <div style={styles.page}>
      <form onSubmit={handleSubmit} noValidate style={styles.form}>

        {/* Title + pulsing dot */}
        <div style={styles.titleContainer}>
          <div style={styles.dotWrapper}>
            <div style={styles.outerPulse} />
            <div style={styles.innerPulse} />
          </div>
          <h2 style={styles.titleText}>Register Company</h2>
        </div>

        {/* Company Name */}
        <label style={styles.fieldLabel}>Company Name</label>
        <InputField
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={e => setCompanyName(e.target.value)}
        />
        {errors.companyName && (
          <p style={styles.inlineError}>Please fill the empty field</p>
        )}

        {/* Industry */}
        <label style={styles.fieldLabel}>Industry</label>
        <InputField
          type="text"
          placeholder="Industry"
          value={industry}
          onChange={e => setIndustry(e.target.value)}
        />
        {errors.industry && (
          <p style={styles.inlineError}>Please fill the empty field</p>
        )}

        {/* Email */}
        <label style={styles.fieldLabel}>Company Email</label>
        <InputField
          type="email"
          placeholder="Company Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        {errors.email && (
          <p style={styles.inlineError}>Please fill the empty field</p>
        )}

        {/* Phone */}
        <label style={styles.fieldLabel}>Phone Number</label>
        <InputField
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
        {errors.phone && (
          <p style={styles.inlineError}>Please fill the empty field</p>
        )}

        {/* Address */}
        <label style={styles.fieldLabel}>Company Address</label>
        <InputField
          type="text"
          placeholder="Company Address"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />
        {errors.address && (
          <p style={styles.inlineError}>Please fill the empty field</p>
        )}

        {/* Company Size */}
        <label style={styles.fieldLabel}>Company Size</label>
        <select
          value={companySize}
          onChange={e => setCompanySize(e.target.value)}
          style={styles.select}
        >
          <option value="">-- Select Company Size --</option>
          <option value="Small">Small (≤ 50 employees)</option>
          <option value="Medium">Medium (51–100 employees)</option>
          <option value="Large">Large (101–500 employees)</option>
          <option value="Corporate">Corporate (&gt;500 employees)</option>
        </select>
        {errors.companySize && (
          <p style={styles.inlineError}>Please fill the empty field</p>
        )}

        {/* Image Upload */}
        <div style={{ padding: '12px 0', width: '100%' }}>
          <label style={styles.sectionLabel}>Upload Company Image</label>
          <div
            onDragOver={e => { e.preventDefault(); setIsDraggingImage(true); }}
            onDragLeave={() => setIsDraggingImage(false)}
            onDrop={handleImageDrop}
            style={{
              ...styles.uploadBox,
              backgroundColor: isDraggingImage ? '#f0f8ff' : '#fff'
            }}
          >
            {!imagePreview ? (
              <>
                <img
                  src="https://img.icons8.com/dusk/64/000000/camera.png"
                  alt="camera"
                  style={{ width: '50px', marginBottom: '8px' }}
                />
                <p style={{ color: '#888' }}>Drag & drop your photo here</p>
                <p style={{ color: '#aaa', fontSize: '12px' }}>or click to upload</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    const f = e.target.files[0];
                    if (f) {
                      setImageFile(f);
                      setImagePreview(URL.createObjectURL(f));
                    }
                  }}
                  style={styles.fullCoverageInput}
                />
              </>
            ) : (
              <div style={styles.previewWrapper}>
                <img
                  src={imagePreview}
                  alt="preview"
                  style={styles.previewImage}
                />
                <button
                  type="button"
                  onClick={removeImage}
                  style={styles.removeButton}
                >
                  ✕
                </button>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    const f = e.target.files[0];
                    if (f) {
                      setImageFile(f);
                      setImagePreview(URL.createObjectURL(f));
                    }
                  }}
                  style={styles.fullCoverageInput}
                />
              </div>
            )}
          </div>
          {errors.imageFile && (
            <p style={styles.inlineError}>Please fill the empty field</p>
          )}
        </div>

        {/* Document Upload */}
        <div style={{ padding: '12px 0', width: '100%' }}>
          <label style={styles.sectionLabel}>Upload Company Documents</label>
          <div
            onDragOver={e => { e.preventDefault(); setIsDraggingDoc(true); }}
            onDragLeave={() => setIsDraggingDoc(false)}
            onDrop={e => {
              e.preventDefault();
              setIsDraggingDoc(false);
              handleFilesAdd(Array.from(e.dataTransfer.files));
            }}
            onClick={() => document.getElementById('doc-upload').click()}
            style={{
              ...styles.uploadBox,
              backgroundColor: isDraggingDoc ? '#f0f8ff' : '#fff'
            }}
          >
            {documentFiles.length === 0 && (
              <>
                <img
                  src="https://img.icons8.com/dusk/64/000000/file.png"
                  alt="file"
                  style={{ width: '50px', marginBottom: '8px' }}
                />
                <p style={{ color: '#888' }}>Drag & drop your documents here</p>
                <p style={{ color: '#aaa', fontSize: '12px' }}>or click anywhere to upload</p>
              </>
            )}
            {documentFiles.map((f, i) => (
              <div key={i} style={styles.fileItem}>
                <span style={styles.fileName}>{f.name}</span>
                <button
                  type="button"
                  onClick={e => { e.stopPropagation(); removeDocument(i); }}
                  style={styles.fileRemoveButton}
                >
                  ✕
                </button>
              </div>
            ))}
            {documentFiles.length < 5 && (
              <div style={styles.plusItemRight}>
                <button
                  type="button"
                  onClick={e => { e.stopPropagation(); document.getElementById('doc-upload').click(); }}
                  style={styles.plusInnerButton}
                >
                  +
                </button>
              </div>
            )}
            <input
              id="doc-upload"
              type="file"
              multiple
              accept=".pdf,.doc,.docx"
              style={{ display: 'none' }}
              onChange={e => handleFilesAdd(Array.from(e.target.files))}
            />
          </div>
          {errors.documentFiles && (
            <p style={styles.inlineError}>Please fill the empty field</p>
          )}
          {errors.documentFilesLimit && (
            <p style={styles.inlineError}>You exceeded the allowed 5 files</p>
          )}
        </div>

        {/* Global error banner */}
        {showFormError && (
          <div
            className="relative w-full flex flex-wrap items-center justify-center
                       py-3 pl-4 pr-14 rounded-lg text-base font-medium transition-all ease-[0.5s]
                       border border-[#f85149] text-[#b22b2b] [&_svg]:text-[#b22b2b]
                       bg-[linear-gradient(#f851491a,#f851491a)]"
          >
            <button
              type="button"
              aria-label="close-error"
              onClick={() => setShowFormError(false)}
              className="absolute right-4 p-1 rounded-md transition-opacity
                         text-[#f85149] border border-[#f85149]
                         opacity-40 hover:opacity-100"
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
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
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
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <path d="M12 9v4" />
                <path d="M12 17h.01" />
              </svg>
              Please fill the empty fields
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <button type="submit" style={styles.submitButton}>
          Register
        </button>
        <button
          type="button"
          onClick={() => navigate('/welcome')}
          style={styles.secondaryButton}
        >
          Already registered? Login
        </button>
      </form>
    </div>
  );
}

const styles = {
  page: { display: 'flex', justifyContent: 'center', padding: '40px 0' },
  form: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '20px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },

  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: '20px'
  },
  dotWrapper: { position: 'relative', width: '40px', height: '40px', marginRight: '8px' },
  outerPulse: {
    position: 'absolute',
    top: 0, left: 0,
    width: '40px', height: '40px',
    backgroundColor: '#20368F',
    borderRadius: '50%',
    animation: 'pulse 1s infinite linear',
    opacity: 0.6
  },
  innerPulse: {
    position: 'absolute',
    top: '11px', left: '11px',
    width: '18px', height: '18px',
    backgroundColor: '#20368F',
    borderRadius: '50%'
  },
  titleText: { color: '#20368F', fontSize: '26px', fontWeight: 600, margin: 0 },

  fieldLabel: { color: '#20368F', fontWeight: 600, fontSize: '14px', marginBottom: '4px' },
  sectionLabel: { fontWeight: 600, color: '#20368F', marginBottom: '8px', display: 'block' },

  inlineError: {
    color: '#b22b2b',
    fontSize: '12px',
    fontWeight: 600,
    marginTop: '4px',
    marginBottom: '8px',
    paddingLeft: '4px'
  },

  select: {
    padding: '10px',
    borderRadius: '10px',
    border: '1px solid rgba(105,105,105,0.4)',
    fontSize: '14px'
  },

  uploadBox: {
    border: '2px solid #20368F',
    borderRadius: '12px',
    minHeight: '150px',
    position: 'relative',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    gap: '10px',
    overflowY: 'auto',
    maxHeight: '260px'
  },
  fullCoverageInput: { position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', zIndex: 1 },

  previewWrapper: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  previewImage: { maxHeight: '180px', maxWidth: '100%', objectFit: 'contain', borderRadius: '8px' },
  removeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'red',
    color: '#fff',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 2
  },

  fileItem: {
    backgroundColor: '#f7f7f7',
    borderRadius: '6px',
    padding: '8px',
    marginBottom: '8px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'relative'
  },
  fileName: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    maxWidth: '80%'
  },
  fileRemoveButton: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    backgroundColor: '#fff',
    border: 'none',
    color: 'red',
    fontSize: '18px',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 2
  },
  plusItemRight: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '8px'
  },
  plusInnerButton: {
    backgroundColor: '#20368F',
    color: '#fff',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    fontSize: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    cursor: 'pointer'
  },

  submitButton: {
    backgroundColor: '#20368F',
    color: '#fff',
    padding: '12px 24px',
    borderRadius: '10px',
    fontWeight: 600,
    fontSize: '16px',
    marginTop: '20px',
    width: '100%',
    cursor: 'pointer'
  },
  secondaryButton: {
    backgroundColor: '#E1E4E8',
    color: '#20368F',
    padding: '12px 24px',
    borderRadius: '10px',
    fontWeight: 600,
    fontSize: '16px',
    marginTop: '8px',
    width: '100%',
    cursor: 'pointer'
  },

  // loader full screen
  loaderContainer: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100vw', height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    zIndex: 9999
  }
};
