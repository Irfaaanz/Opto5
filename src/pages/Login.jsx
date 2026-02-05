import React, { useState } from 'react';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const Login = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        // Mock Backend Logic
        const adminEmail = 'optoadmin@gmail.com';
        const staffEmail = 'optostaff@gmail.com';
        const validPass = 'octo1234'; // Same password for both for now

        if (isAdmin) {
            if (email === adminEmail && password === validPass) {
                // Success Admin
                console.log('Login Success: Admin');
                navigate('/dashboard');
            } else {
                setError('Invalid Admin credentials');
            }
        } else {
            if (email === staffEmail && password === validPass) {
                // Success Staff
                console.log('Login Success: Staff');
                navigate('/dashboard');
            } else {
                setError('Invalid Staff credentials');
            }
        }
    };

    return (
        <div className="login-container">
            {/* Background Elements */}
            <div className="bg-gradient-mesh"></div>

            <div className="login-card-wrapper">
                {/* Left Side - Welcome */}
                <div className="login-left glass">
                    <div className="floating-particles">
                        <span className="particle p1"></span>
                        <span className="particle p2"></span>
                        <span className="particle p3"></span>
                    </div>
                    <div className="welcome-content">
                        <h1 className="welcome-title">Welcome Onboards</h1>
                        <p className="welcome-desc">
                            An interactive website for all the needs required for the lenses stock and inventory management
                        </p>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="login-right glass">
                    <div className="login-header">
                        <div className="icon-box">
                            <LogIn size={32} />
                        </div>
                        <h2>Sign in as {isAdmin ? 'admin' : 'staff'}</h2>
                    </div>

                    <form className="login-form" onSubmit={handleLogin}>
                        <div className="input-group">
                            <Mail className="input-icon" size={20} />
                            <input
                                type="email"
                                placeholder="Email"
                                className="input-field"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <Lock className="input-icon" size={20} />
                            <input
                                type="password"
                                placeholder="Password"
                                className="input-field"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {error && <div className="error-msg">{error}</div>}

                        <div className="form-footer">
                            <a href="#" className="forgot-pass">Forgot password?</a>
                        </div>

                        <button type="submit" className="btn-primary">
                            Sign in
                        </button>

                        <div className="role-switch">
                            <p>Are you a {isAdmin ? 'staff' : 'admin'}?</p>
                            <button
                                type="button"
                                className="btn-secondary"
                                onClick={() => {
                                    setIsAdmin(!isAdmin);
                                    setError(''); // Clear error on switch
                                }}
                            >
                                Sign in as {isAdmin ? 'staff' : 'admin'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;

// Add specific styles for Login page here or in a separate CSS file
const styles = `
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%);
}

.bg-gradient-mesh {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 10% 20%, rgba(147, 197, 253, 0.5) 0%, transparent 40%),
    radial-gradient(circle at 90% 80%, rgba(236, 72, 153, 0.3) 0%, transparent 40%),
    radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.2) 0%, transparent 60%);
  z-index: 0;
}

.login-card-wrapper {
  display: flex;
  width: 90%;
  max-width: 1200px;
  height: 700px; /* Mac style height */
  z-index: 10;
  box-shadow: var(--shadow-premium);
  border-radius: 24px;
  overflow: hidden;
}

.login-left {
  flex: 1.2;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  position: relative;
  overflow: hidden;
}

.welcome-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  line-height: 1.1;
  background: linear-gradient(to right, #1e293b, #334155);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.welcome-desc {
  font-size: 1.2rem;
  color: #475569;
  max-width: 400px;
  line-height: 1.6;
}

.login-right {
  flex: 0.8;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(20px);
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #c084fc; /* Fallback */
  background-image: linear-gradient(135deg, #d8b4fe 0%, #c084fc 100%);
}

.login-header {
  text-align: center;
  margin-bottom: 40px;
}

.icon-box {
  width: 64px;
  height: 64px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  border: 1px solid rgba(255,255,255,0.4);
}

.login-header h2 {
  font-size: 1.8rem;
  font-weight: 600;
  color: #1e1b4b;
}

.login-form {
  width: 100%;
  max-width: 360px;
}

.input-group {
  position: relative;
  margin-bottom: 20px;
}

.input-icon {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #4b5563;
}

.input-field {
  width: 100%;
  padding: 16px 16px 16px 54px;
  border-radius: 16px;
  border: 2px solid transparent;
  background: rgba(255, 255, 255, 0.5);
  font-size: 1rem;
  transition: all 0.3s ease;
}

.input-field:focus {
  background: #ffffff;
  box-shadow: var(--shadow-md);
}

.form-footer {
  text-align: right;
  margin-bottom: 30px;
}

.forgot-pass {
  color: #4b5563;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
}

.btn-primary {
  width: 100%;
  padding: 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.4);
  color: #1e1b4b;
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 30px;
  border: 1px solid rgba(255,255,255,0.4);
  transition: transform 0.2s;
}

.btn-primary:active {
  transform: scale(0.98);
}

.btn-secondary {
  width: 100%;
  padding: 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.2);
  color: #1e1b4b;
  font-weight: 600;
  font-size: 1rem;
  border: 1px solid rgba(255,255,255,0.2);
}

.role-switch {
  text-align: center;
}

.role-switch p {
  margin-bottom: 10px;
  font-size: 0.9rem;
  color: #1e1b4b;
}

.error-msg {
  color: #b91c1c;
  background: rgba(254, 202, 202, 0.7);
  padding: 8px 12px;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 0.9rem;
  text-align: center;
}
`;

// Inject styles dynamically (or move to CSS file)
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
