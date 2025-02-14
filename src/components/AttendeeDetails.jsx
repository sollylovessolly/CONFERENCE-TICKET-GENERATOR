import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import '../styles/Attendee.css';

const AttendeeDetails = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'sollys_preset');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dqjx1dbxq/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await response.json();
      setAvatarUrl(data.secure_url);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setAvatarUrl(previewURL);
      handleImageUpload(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  const handleSubmit = () => {
    if (!fullName.trim() || !email.trim() || !avatarUrl) {
      setError('Please fill in all fields and upload an image.');
      return;
    }
    setError('');
    const ticketData = { fullName, email, avatarUrl };
    localStorage.setItem('ticketData', JSON.stringify(ticketData));
    navigate('/ticket-confirmation');
  };

  return (
    <div className="bg">
      <div className="main-container">
        <div className="header-container">
          <div className="heading">Attendee Details</div>
          <div className="step">Step 3/3</div>
        </div>

        <div className="underline">
          <div id='colored'></div><div></div>
        </div>

        <div className="box-main1">
          <div className="dropzone-container" {...getRootProps()}>
            <input {...getInputProps()} />
            {avatarUrl ? (
              <img src={avatarUrl} alt="Preview" className="image-preview" />
            ) : (
              <div className="dropzone-placeholder">
                <span className="upload-icon">☁️</span>
                <p>Drag & drop or click to upload</p>
              </div>
            )}
          </div>
        </div>

        <form>
          <label>
            <p>Enter Your Name</p>
            <input id="input" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </label>
          <label>
            <p>Enter Your Email*</p>
            <input id="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            <p>Special request?</p>
            <textarea id="text-area" rows={7} cols={65}></textarea>
          </label>

          {error && <p className="error-message">{error}</p>}

          <div className="buttons">
            <button id="bottom-button" onClick={() => navigate('/')}>Back</button>
            <button id="next-button" type="button" onClick={handleSubmit}>
              Get My Free Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AttendeeDetails;
