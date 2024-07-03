import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    return /^(?=.*[A-Z]).{6,}$/.test(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }
    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters long and contain at least one uppercase letter');
      return;
    }
    sessionStorage.setItem('auth', 'true');
    sessionStorage.setItem('email', email);
    navigate('/products');
  };

  return (
    <div className="auth-form-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <div className="auth-form-content">
          <h3 className="auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input type="email" className="form-control mt-1" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" required />
         </div>
          <div className="form-group mt-3">
            <label>Password</label> 
            <input type="password" className="form-control mt-1" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required/>
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
          <p className="forgot-password text-right mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>  
  );
};

export default LoginPage;
