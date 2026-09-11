import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    // inject CSS for placeholder into <style> tag
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
      input::placeholder {
        color: black !important;
        opacity: 1;
      }
    `;
    document.head.appendChild(styleSheet);
  }, []);

  const handleSignup = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', form);
      setMessage(res.data.message || 'Registered successfully! Please login.');
      setForm({ name: '', email: '', password: '', role: 'user' });
    } catch (err) {
      setMessage(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.containerOverlay}></div>
      <div style={styles.card}>
        <h2 style={styles.title}>Signup</h2>

        <input
          style={styles.input}
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <select
          style={styles.select}
          value={form.role}
          onChange={e => setForm({ ...form, role: e.target.value })}
        >
          <option value="user">User</option>
          <option value="trainer">Trainer</option>
        </select>

        <button
          style={styles.button}
          onClick={handleSignup}
          onMouseEnter={e => Object.assign(e.target.style, styles.buttonHover)}
          onMouseLeave={e => Object.assign(e.target.style, styles.button)}
        >
          Signup
        </button>

        {message && <div style={styles.error}>{message}</div>}

        <p style={styles.signupText}>
          Already have an account?{' '}
          <Link to="/login" style={styles.link}>Login here</Link>
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
    width: '450px',
    padding: '45px 40px',
    borderRadius: '20px',
    background: 'rgba(255,255,255,0.06)',
    backdropFilter: 'blur(14px)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
    textAlign: 'center',
    color: '#fff',
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    marginBottom: '30px',
    fontSize: '2rem',
    fontWeight: '700',
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
  select: {
    width: '100%',
    padding: '14px 18px',
    marginBottom: '20px',
    borderRadius: '15px',
    border: '1px solid rgba(255,255,255,0.3)',
    background: 'rgba(255,255,255,0.1)',
    color: '#000',
    fontSize: '1rem',
    cursor: 'pointer',
    outline: 'none',
    transition: '0.3s',
    textAlign: 'center',
  },
  button: {
    width: '100%',
    padding: '14px',
    background: 'linear-gradient(135deg, #00c6ff, #0072ff)',
    border: 'none',
    borderRadius: '15px',
    color: '#fff',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 8px 25px rgba(0,198,255,0.6)',
    transition: '0.3s ease',
    marginTop: '10px',
  },
  buttonHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 10px 35px rgba(0,198,255,0.8)',
  },
  error: {
    color: '#ff4d6d',
    marginTop: '15px',
    fontWeight: '600',
  },
  signupText: {
    marginTop: '25px',
    fontSize: '14px',
    color: '#fff',
  },
  link: {
    color: '#00c6ff',
    textDecoration: 'none',
    fontWeight: '700',
  },
};
