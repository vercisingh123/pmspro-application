import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import "./LoginPage.css";

const googleLogo = "https://developers.google.com/identity/images/g-logo.png";
const githubLogo = "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png";

const LoginPage = ({ setIsAuthenticated }) => {
  const [step, setStep] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState('');
  const [success, setSuccess] = useState(false); // NEW
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/send-otp-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.error && data.error.includes('Account not verified')) {
        setStep('verify');
      } else if (data.message === 'Authenticated') {
        setIsAuthenticated(true);
        setSuccess(true); // NEW: show success
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500); // 1.5s delay for success message
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/verify-otp-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (data.message === 'Authenticated') {
        setIsAuthenticated(true);
        setSuccess(true); // NEW: show success
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        setError(data.error || 'OTP verification failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  };

  const handleOAuth = (provider) => {
    setOauthLoading(provider);
    window.location.href = `/api/auth/${provider}`;
  };

  return (
    <div className="auth-container">
      <div className="oauth-buttons">
        <button
          className="oauth-btn google"
          onClick={() => handleOAuth('google')}
          disabled={loading || oauthLoading}
        >
          <img src={googleLogo} alt="Google" width={20} height={20} style={{ marginRight: 8 }} />
          {oauthLoading === 'google' ? <ClipLoader size={20} color="#fff" /> : 'Continue with Google'}
        </button>
        <button
          className="oauth-btn github"
          onClick={() => handleOAuth('github')}
          disabled={loading || oauthLoading}
        >
          <img src={githubLogo} alt="GitHub" width={20} height={20} style={{ marginRight: 8 }} />
          {oauthLoading === 'github' ? <ClipLoader size={20} color="#fff" /> : 'Continue with GitHub'}
        </button>
      </div>

      {success ? (
        <div className="success-message">
          <ClipLoader size={32} color="#22c55e" />
          <p style={{ color: "#22c55e", fontWeight: "bold", marginTop: 16 }}>
            Login successful!
          </p>
        </div>
      ) : step === 'login' ? (
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            disabled={loading || oauthLoading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            disabled={loading || oauthLoading}
          />
          <button type="submit" disabled={loading || oauthLoading}>
            {loading ? <ClipLoader size={20} color="#fff" /> : 'Login'}
          </button>
          {error && <p className="error">{error}</p>}
          <p className="switch-link">
            New here? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      ) : (
        <form onSubmit={handleVerify}>
          <h2>Verify Account</h2>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            required
            disabled={loading || oauthLoading}
          />
          <button type="submit" disabled={loading || oauthLoading}>
            {loading ? <ClipLoader size={20} color="#fff" /> : 'Verify & Login'}
          </button>
          {error && <p className="error">{error}</p>}
          <p className="switch-link">
            Back to{' '}
            <span
              onClick={() => setStep('login')}
              style={{ cursor: 'pointer', color: '#2563eb', textDecoration: 'underline' }}
            >
              Login
            </span>
          </p>
        </form>
      )}
    </div>
  );
};

export default LoginPage;
