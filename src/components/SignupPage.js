
// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import "./SignupPage.css";

// const googleLogo = "https://developers.google.com/identity/images/g-logo.png";
// const githubLogo = "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png";


// const SignupPage = ({ setIsAuthenticated }) => {
//   const [step, setStep] = useState('signup');
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [otp, setOtp] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setError('');
//     const res = await fetch('/api/auth/send-otp-signup', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ name, email, password }),
//     });
//     const data = await res.json();
//     if (data.message) setStep('verify');
//     else setError(data.error || 'Signup failed');
//   };

//   const handleVerify = async (e) => {
//     e.preventDefault();
//     setError('');
//     const res = await fetch('/api/auth/verify-otp-signup', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, otp }),
//     });
//     const data = await res.json();
//     if (data.message) navigate('/login');
//     else setError(data.error || 'Verification failed');
//   };

//   return (
//     <div className="auth-container">
//  <div className="oauth-buttons">
//   <button
//     className="oauth-btn google"
//     onClick={() => window.location.href = "/api/auth/google"}
//   >
//     <img src={googleLogo} alt="Google" width={20} height={20} style={{ marginRight: 8 }} />
//     Continue with Google
//   </button>
//   <button
//     className="oauth-btn github"
//     onClick={() => window.location.href = "/api/auth/github"}
//   >
//     <img src={githubLogo} alt="GitHub" width={20} height={20} style={{ marginRight: 8 }} />
//     Continue with GitHub
//   </button>
// </div>

//       {step === 'signup' ? (
//         <form onSubmit={handleSignup}>
//           <h2>Sign Up</h2>
//           <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
//           <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
//           <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
//           <button type="submit">Sign Up</button>
       
//           {error && <p className="error">{error}</p>}
//             <p className="switch-link">
//            Already registered? 
//            <Link to="/login">Login</Link>
//            </p>
//         </form>
//       ) : (
//         <form onSubmit={handleVerify}>
//           <h2>Verify OTP</h2>
//           <input type="text" placeholder="Enter OTP" value={otp} onChange={e => setOtp(e.target.value)} required />
//           <button type="submit">Verify</button>
//           {error && <p className="error">{error}</p>}
//          <p className="switch-link">
//            Already registered?
//              <Link to="/login">Login</Link>
//           </p>     
//         </form>

//       )}
//     </div>
//   );
// };

// export default SignupPage;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import "./SignupPage.css";

const googleLogo = "https://developers.google.com/identity/images/g-logo.png";
const githubLogo = "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png";

const SignupPage = ({ setIsAuthenticated }) => {
  const [step, setStep] = useState('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState('');
  const [success, setSuccess] = useState(false); // for beautiful post-OTP feedback
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/send-otp-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (data.message) setStep('verify');
      else setError(data.error || 'Signup failed');
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
      const res = await fetch('/api/auth/verify-otp-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (data.message) {
        setSuccess(true); // show success animation/message
        setTimeout(() => {
          setSuccess(false);
          navigate('/login');
        }, 2000); // 2s for user to see success
      } else {
        setError(data.error || 'Verification failed');
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

      {step === 'signup' ? (
        <form onSubmit={handleSignup}>
          <h2>Sign Up</h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            disabled={loading || oauthLoading}
          />
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
            {loading ? <ClipLoader size={20} color="#fff" /> : 'Sign Up'}
          </button>
          {error && <p className="error">{error}</p>}
          <p className="switch-link">
            Already registered? <Link to="/login">Login</Link>
          </p>
        </form>
      ) : success ? (
        <div className="success-message">
          <ClipLoader size={32} color="#22c55e" />
          <p style={{ color: "#22c55e", fontWeight: "bold", marginTop: 16 }}>
            Signed up successfully!
          </p>
        </div>
      ) : (
        <form onSubmit={handleVerify}>
          <h2>Verify OTP</h2>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            required
            disabled={loading || oauthLoading}
          />
          <button type="submit" disabled={loading || oauthLoading}>
            {loading ? <ClipLoader size={20} color="#fff" /> : 'Verify'}
          </button>
          {error && <p className="error">{error}</p>}
          <p className="switch-link">
            Already registered? <Link to="/login">Login</Link>
          </p>
        </form>
      )}
    </div>
  );
};

export default SignupPage;

