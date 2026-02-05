import React, { useState, useRef, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Settings, Bell, Moon, Sun, X } from 'lucide-react';
import '../index.css';

const DashboardLayout = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dropdownRef = useRef(null);
  const settingsPanelRef = useRef(null);
  const navigate = useNavigate();

  // Dark Mode Init
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      toggleTheme('dark');
    } else {
      toggleTheme('light'); // Ensure light mode is set if no theme or light theme is stored
    }
  }, []);

  const toggleTheme = (theme) => {
    if (theme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Profile Dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      // Settings Panel (Close if clicking outside panel and not on settings button)
      if (
        settingsPanelRef.current &&
        !settingsPanelRef.current.contains(event.target) &&
        !event.target.closest('.settings-btn')
      ) {
        setIsSettingsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Profile Data Sync
  const [userProfile, setUserProfile] = useState({
    name: 'Andrew Smith',
    role: 'Admin',
    image: 'https://ui-avatars.com/api/?name=Andrew+Smith&background=0D8ABC&color=fff'
  });

  const loadProfile = () => {
    const saved = localStorage.getItem('userProfile');
    if (saved) {
      const data = JSON.parse(saved);
      setUserProfile({
        name: `${data.firstName} ${data.lastName}`,
        role: 'Admin', // Role is static for now
        image: data.profileImage || 'https://ui-avatars.com/api/?name=Andrew+Smith&background=0D8ABC&color=fff'
      });
    }
  };

  useEffect(() => {
    loadProfile();
    window.addEventListener('profileUpdated', loadProfile);
    return () => window.removeEventListener('profileUpdated', loadProfile);
  }, []);

  const handleLogout = () => {
    setIsProfileOpen(false);
    navigate('/login');
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <header className="topbar">
          {/* Spacer to push content right */}
          <div style={{ flex: 1 }}></div>

          <div className="topbar-actions">

            <button className="icon-btn relative">
              <Bell size={20} />
              <span className="badge">3</span>
            </button>

            <div
              className="user-profile-wrapper"
              ref={dropdownRef}
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div className="user-profile">
                <div className="avatar">
                  <img src={userProfile.image} alt="User" />
                </div>
                <div className="user-info">
                  <span className="name">{userProfile.name}</span>
                  <span className="role">{userProfile.role}</span>
                </div>
              </div>

              {isProfileOpen && (
                <div className="profile-dropdown">
                  <div className="dropdown-item" onClick={() => navigate('/profile')}>
                    My Profile
                  </div>
                  <div className="dropdown-divider"></div>
                  <div className="dropdown-item text-red" onClick={handleLogout}>
                    Logout
                  </div>
                </div>
              )}
            </div>

            {/* Settings Button - Toggles Side Panel */}
            <button
              className="settings-btn"
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            >
              <Settings size={20} color="white" />
            </button>
          </div>
        </header>

        <main className="content-area">
          <Outlet />
        </main>
      </div>

      {/* Settings Side Panel */}
      <div
        className={'settings-panel ' + (isSettingsOpen ? 'open' : '')}
        ref={settingsPanelRef}
      >
        <div className="panel-header">
          <h3>Settings</h3>
          <button className="close-btn" onClick={() => setIsSettingsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="panel-content">
          <div className="setting-section">
            <h4>Display Mode</h4>
            <p className="setting-desc">Choose your preferred appearance</p>

            <div className="theme-toggles">
              <button
                className={'theme-btn ' + (!isDarkMode ? 'active' : '')}
                onClick={() => toggleTheme('light')}
              >
                <Sun size={20} />
                <span>Light Mode</span>
              </button>
              <button
                className={'theme-btn ' + (isDarkMode ? 'active' : '')}
                onClick={() => toggleTheme('dark')}
              >
                <Moon size={20} />
                <span>Dark Mode</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for panel */}
      {isSettingsOpen && <div className="panel-overlay"></div>}
    </div>
  );
};

export default DashboardLayout;

const styles = `
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  background-color: var(--bg-main); /* Updated to variable */
  transition: background-color 0.3s;
  position: relative;
  overflow-x: hidden;
}

.main-content {
  margin-left: 250px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.topbar {
  height: 80px;
  background: var(--bg-card); /* Updated to variable */
  display: flex;
  align-items: center;
  padding: 0 32px;
  box-shadow: var(--shadow-sm);
  z-index: 40;
  transition: background 0.3s;
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.icon-btn {
  background: transparent;
  color: var(--text-muted); /* Updated */
  padding: 8px;
  border-radius: 50%;
}
.icon-btn:hover {
  background: rgba(0,0,0,0.05);
  color: var(--secondary);
}

.relative { position: relative; }

.badge {
  position: absolute;
  top: 0;
  right: 0;
  background: #10b981;
  color: white;
  font-size: 0.7rem;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.user-profile-wrapper {
  position: relative;
  cursor: pointer;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 16px;
  padding: 4px 12px;
  background: var(--bg-main); /* Updated */
  border-radius: 8px;
  transition: background 0.2s;
}

.user-profile:hover {
  background: rgba(0,0,0,0.05); /* Slight darken/lighten */
}

.avatar img {
  width: 40px;
  height: 40px;
  border-radius: 12px;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-info .name {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--text-main); /* Updated */
}

.user-info .role {
  font-size: 0.8rem;
  color: var(--text-muted); /* Updated */
}

.settings-btn {
  background: #6366f1;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(99, 102, 241, 0.3);
  z-index: 50; /* Ensure clickable */
}

.settings-btn:hover {
  transform: rotate(45deg);
}

.profile-dropdown {
  position: absolute;
  top: 110%;
  right: 0;
  width: 200px;
  background: var(--bg-card); /* Updated */
  border-radius: 12px;
  box-shadow: var(--shadow-lg);
  padding: 8px;
  z-index: 100;
  border: 1px solid var(--glass-border); /* Updated */
  animation: fadeIn 0.1s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.dropdown-item {
  padding: 12px 16px;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-muted); /* Updated */
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.dropdown-item:hover {
  background: var(--bg-main); /* Updated */
  color: var(--text-main); /* Updated */
}

.dropdown-divider {
  height: 1px;
  background: var(--glass-border); /* Updated */
  margin: 4px 0;
}

.text-red { color: #ef4444; }
.text-red:hover { background: rgba(239, 68, 68, 0.1); color: #b91c1c; }

.content-area {
  padding: 32px;
  overflow-y: auto;
  height: calc(100vh - 80px);
}

/* Settings Panel Styles */
.settings-panel {
    position: fixed;
    top: 0;
    right: -350px; /* Hidden by default */
    width: 320px;
    height: 100vh;
    background: var(--bg-card);
    box-shadow: var(--shadow-premium);
    z-index: 1000;
    transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    flex-direction: column;
    color: var(--text-main);
}

.settings-panel.open {
    right: 0;
}

.panel-header {
    padding: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--glass-border);
}

.panel-header h3 {
    font-size: 1.25rem;
    font-weight: 600;
}

.close-btn {
    background: transparent;
    color: var(--text-muted);
}
.close-btn:hover { color: var(--text-main); }

.panel-content {
    padding: 24px;
    flex: 1;
}

.setting-section h4 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 4px;
}

.setting-desc {
    font-size: 0.85rem;
    color: var(--text-muted);
    margin-bottom: 16px;
}

.theme-toggles {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
}

.theme-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 16px;
    border: 2px solid var(--glass-border);
    border-radius: 12px;
    background: transparent;
    color: var(--text-muted);
}

.theme-btn:hover {
    background: var(--bg-main);
}

.theme-btn.active {
    border-color: var(--secondary);
    color: var(--secondary);
    background: rgba(59, 130, 246, 0.1);
}

.panel-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.2);
    z-index: 900;
    backdrop-filter: blur(2px);
}
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
