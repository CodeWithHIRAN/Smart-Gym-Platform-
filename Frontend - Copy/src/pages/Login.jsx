import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './Dashboard';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [loginMessage, setLoginMessage] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const { user: loggedUser, token: authToken } = res.data;

      setUser(loggedUser);
      setToken(authToken);
      localStorage.setItem('user', JSON.stringify(loggedUser));
      localStorage.setItem('token', authToken);
      setLoginMessage('');
    } catch (error) {
      setLoginMessage(error.response?.data?.error || 'Login failed');
    }
  };

  if (user && token) {
    return <Dashboard />;
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login to Your Smart Gym Dashboard 🏋️</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleLogin} style={styles.button}>Login</button>
        {loginMessage && <p style={styles.error}>{loginMessage}</p>}

        <p style={styles.signupText}>
          Don't have an account?{' '}
          <Link to="/signup" style={styles.link}>Sign up here</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'url("https://media.istockphoto.com/id/875207140/photo/sport-background-with-fitness-equipment-in-gym-gym.jpg?s=612x612&w=0&k=20&c=VEpZIAJ3wdlwHwvWuLumDmpsWczobiSH5kL981H5Cvk=") no-repeat center/cover',
    backgroundSize: 'cover',
    fontFamily: '"Poppins", sans-serif',
    position: 'relative',
  },
  containerOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.55)',
    backdropFilter: 'blur(8px)',
    zIndex: 0,
  },
  card: {
    width: '350px',
    padding: '30px',
    borderRadius: '15px',
    background: 'rgba(255,255,255,0.06)',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
    textAlign: 'center',
    color: '#fff',
    position: 'relative',
    zIndex: 1,
  },
  title: {
    marginBottom: '20px',
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#00c6ff',
    textShadow: '0 2px 10px rgba(0,198,255,0.5)',
  },
  input: {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.3)',
    background: 'rgba(255,255,255,0.1)',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
    transition: '0.3s',
  },
  button: {
    width: '100%',
    padding: '12px',
    background: 'linear-gradient(135deg, #00c6ff, #0072ff)',
    border: 'none',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 6px 20px rgba(0,198,255,0.5)',
    transition: '0.3s ease',
  },
  buttonHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 25px rgba(0,198,255,0.7)',
  },
  error: {
    color: '#ff4d6d',
    marginTop: '10px',
    fontWeight: '600',
  },
  signupText: {
    marginTop: '20px',
    fontSize: '14px',
    color: '#fff',
  },
  link: {
    color: '#00c6ff',
    textDecoration: 'none',
    fontWeight: '700',
  },
};

export default Login;
