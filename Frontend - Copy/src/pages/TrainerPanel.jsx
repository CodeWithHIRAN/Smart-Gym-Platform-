import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function TrainerPanel() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [message, setMessage] = useState('');
  const [workoutData, setWorkoutData] = useState({
    title: '',
    category: '',
    level: '',
    duration: '',
    videoUrl: '',
  });

  useEffect(() => {
    async function fetchUsers() {
      try {
        const { data } = await axios.get('http://localhost:5000/api/users');
        setUsers(data.filter(user => user.role === 'user'));
      } catch (err) {
        console.error('Fetching users failed:', err);
        setMessage('⚠️ Error loading users from server.');
      }
    }
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setWorkoutData({ ...workoutData, [e.target.name]: e.target.value });
  };

  const assignWorkout = async () => {
    try {
      await axios.post('http://localhost:5000/api/users/assign-workout', {
        userId: selectedUser,
        workout: workoutData,
      });
      setMessage('✅ Workout assigned successfully!');
      setWorkoutData({
        title: '',
        category: '',
        level: '',
        duration: '',
        videoUrl: '',
      });
    } catch (err) {
      console.error('Assignment failed:', err);
      setMessage('❌ Failed to assign workout.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Trainer Panel</h2>

      {/* User Selection */}
      <div style={styles.card}>
        <label style={styles.label}>Select Student</label>
        <select
          value={selectedUser}
          onChange={e => setSelectedUser(e.target.value)}
          style={styles.select}
        >
          <option value="">-- Select Student --</option>
          {users.map(u => (
            <option key={u._id} value={u._id}>{u.name}</option>
          ))}
        </select>
      </div>

      {/* Workout Form */}
      <div style={styles.card}>
        <label style={styles.label}>Title</label>
        <input
          name="title"
          value={workoutData.title}
          onChange={handleChange}
          style={styles.input}
          placeholder="e.g. Push-ups"
        />

        <label style={styles.label}>Category</label>
        <input
          name="category"
          value={workoutData.category}
          onChange={handleChange}
          style={styles.input}
          placeholder="e.g. Strength"
        />

        <label style={styles.label}>Level</label>
        <input
          name="level"
          value={workoutData.level}
          onChange={handleChange}
          style={styles.input}
          placeholder="e.g. Beginner"
        />

        <label style={styles.label}>Duration (minutes)</label>
        <input
          name="duration"
          type="number"
          value={workoutData.duration}
          onChange={handleChange}
          style={styles.input}
          placeholder="30"
        />

        <label style={styles.label}>Video URL</label>
        <input
          name="videoUrl"
          value={workoutData.videoUrl}
          onChange={handleChange}
          style={styles.input}
          placeholder="https://example.com/workout"
        />
      </div>

      <button
        disabled={!selectedUser || !workoutData.title}
        onClick={assignWorkout}
        style={{
          ...styles.button,
          backgroundColor: (!selectedUser || !workoutData.title) ? '#ccc' : '#007bff',
          cursor: (!selectedUser || !workoutData.title) ? 'not-allowed' : 'pointer',
        }}
      >
        Assign Workout
      </button>

      {message && <div style={styles.message}>{message}</div>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '700px',
    margin: '40px auto',
    padding: '25px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(12px)',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
    border: '1px solid rgba(255,255,255,0.3)',
    color: '#222',
  },
  heading: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '25px',
    fontSize: '1.8rem',
    fontWeight: '700',
  },
  card: {
    background: 'rgba(255,255,255,0.1)',
    padding: '18px',
    borderRadius: '12px',
    marginBottom: '15px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
    border: '1px solid rgba(255,255,255,0.2)',
  },
  label: {
    display: 'block',
    fontWeight: '600',
    marginBottom: '6px',
    color: '#34495e',
  },
  select: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.4)',
    marginBottom: '12px',
    background: 'rgba(255,255,255,0.15)',
    color: '#222',
    backdropFilter: 'blur(6px)',
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.4)',
    marginBottom: '15px',
    background: 'rgba(255,255,255,0.15)',
    color: '#222',
    backdropFilter: 'blur(6px)',
  },
  button: {
    width: '100%',
    padding: '14px',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    fontWeight: '700',
    fontSize: '16px',
    background: 'linear-gradient(135deg, #2980b9, #6dd5fa)',
    boxShadow: '0 5px 15px rgba(41,128,185,0.4)',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  message: {
    marginTop: '15px',
    padding: '12px',
    borderRadius: '8px',
    textAlign: 'center',
    fontWeight: '600',
    color: '#27ae60',
    background: 'rgba(39,174,96,0.15)',
    border: '1px solid rgba(39,174,96,0.3)',
    boxShadow: '0 3px 10px rgba(39,174,96,0.2)',
  },
};
