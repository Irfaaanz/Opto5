import React, { useState, useEffect } from 'react';
import { Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../index.css';

const Profile = () => {
  const [firstName, setFirstName] = useState('Jhonathon');
  const [lastName, setLastName] = useState('Ronan');
  const [username, setUsername] = useState('Jhonathon R.');
  const [phone, setPhone] = useState('236 999 456');
  const [email, setEmail] = useState('jhonathon@pyle.com');
  const [password, setPassword] = useState('safepass123');
  const [bio, setBio] = useState('');

  const [profileImage, setProfileImage] = useState(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const data = JSON.parse(savedProfile);
      setFirstName(data.firstName || 'Jhonathon');
      setLastName(data.lastName || 'Ronan');
      setUsername(data.username || 'Jhonathon R.');
      setPhone(data.phone || '236 999 456');
      setEmail(data.email || 'jhonathon@pyle.com');
      setPassword(data.password || 'safepass123');
      setBio(data.bio || '');
      setProfileImage(data.profileImage || null);
    }
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const profileData = {
      firstName,
      lastName,
      username,
      phone,
      email,
      password,
      bio,
      profileImage
    };
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    // Dispatch event for Layout to update
    window.dispatchEvent(new Event('profileUpdated'));
    alert('Profile saved successfully!');
  };

  return (
    <div className="profile-container">
      {/* Header */}
      <div className="profile-header flex-between">
        <h1 className="page-title">My Profile</h1>
        <div className="crumbs text-muted">
          <Link to="/dashboard" className="crumb-link">Dashboard</Link> / My Profile
        </div>
      </div>

      <div className="profile-card card">
        {/* Left Column - Image Upload */}
        <div className="profile-image-section">
          <h3 className="section-label">Add Profile Image</h3>
          <div className="image-upload-box">
            {profileImage ? (
              <div className="preview-container">
                <img src={profileImage} alt="Profile" className="profile-preview" />
                <button className="remove-img-btn" onClick={() => setProfileImage(null)}><Upload size={16} /> Change</button>
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: 'none' }}
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
            ) : (
              <div className="upload-content">
                <Upload size={40} className="text-muted mb-2" />
                <p className="upload-text">Drag & Drop Image here or</p>
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: 'none' }}
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <button
                  className="text-link font-bold"
                  onClick={() => document.getElementById('fileInput').click()}
                >
                  Select
                </button>
              </div>
            )}
          </div>
          <button
            className="btn-primary mt-4 w-full"
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>

        {/* Right Column - Form */}
        <div className="profile-form-section">
          {/* Row 1 */}
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                className="input-field"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                className="input-field"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="form-row">
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="input-field"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                className="input-field"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Bio Row */}
          <div className="form-row">
            <div className="form-group full-width">
              <label>Bio</label>
              <textarea
                className="input-field bio-area"
                placeholder="Add A Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

const styles = `
.profile-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-main);
}

.crumbs {
    color: var(--text-muted);
}

.crumb-link {
    text-decoration: none;
    color: var(--text-muted);
    transition: color 0.2s;
}

.crumb-link:hover {
    color: var(--primary);
}

.profile-card {
  display: flex;
  gap: 40px;
  background: var(--bg-card);
  padding: 40px;
  border-radius: 20px;
  box-shadow: var(--shadow-sm);
  transition: background-color 0.3s;
}

.profile-image-section {
  flex: 0 0 250px;
}

.section-label {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--text-main);
}

.image-upload-box {
  border: 2px dashed var(--glass-border);
  border-radius: 12px;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: var(--bg-main);
}

.upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.upload-text {
  font-size: 0.9rem;
  color: var(--text-muted);
}

.profile-form-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-row {
  display: flex;
  gap: 24px;
}

.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.full-width {
  width: 100%;
}

.form-group label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-main);
}

.bio-area {
  min-height: 120px;
  resize: vertical;
}

.mb-2 { margin-bottom: 8px; }
.mt-4 { margin-top: 16px; }
.w-full { width: 100%; }

.btn-primary {
  padding: 12px;
  border-radius: 8px;
  background: var(--primary);
  color: white;
  font-weight: 600;
  transition: opacity 0.2s;
}
  opacity: 0.9;
}

.preview-container {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 10px;
}

.profile-preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.remove-img-btn {
    position: absolute;
    bottom: 10px;
    background: rgba(0,0,0,0.6);
    color: white;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
}
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
