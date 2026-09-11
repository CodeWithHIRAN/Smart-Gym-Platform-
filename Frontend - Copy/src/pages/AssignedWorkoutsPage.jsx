import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AssignedWorkoutsPage({ userId }) {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchWorkouts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${userId}/workouts`);
        setWorkouts(response.data);
        setError('');
      } catch (err) {
        console.error('Error loading workouts:', err);
        setError('Failed to load workouts.');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, [userId]);

  if (loading) return <p style={styles.loading}>Loading workouts...</p>;
  if (error) return <p style={styles.error}>{error}</p>;
  if (workouts.length === 0) return <p style={styles.noWorkouts}>No workouts assigned yet.</p>;

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Assigned Workouts</h3>
      <ul style={styles.list}>
        {workouts.map((w, idx) => (
          <li key={idx} style={styles.listItem}>
            <div style={styles.workoutHeader}>
              <strong style={styles.workoutTitle}>{w.title}</strong>
              <span style={styles.badge}>{w.category}</span>
              <span style={styles.level}>Level {w.level}</span>
            </div>
            <div style={styles.workoutDetails}>
              Duration: <strong>{w.duration} mins</strong>
            </div>
            <a href={w.videoUrl} target="_blank" rel="noreferrer" style={styles.link}>
              ▶ Watch Video
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '850px',
    margin: '30px auto',
    padding: '25px',
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(14px)',
    borderRadius: '14px',
    boxShadow: '0 8px 25px rgba(0,0,0,0.25)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#fff',
  },
  title: {
    marginBottom: '25px',
    fontSize: '2rem',
    textAlign: 'center',
    color: '#fff',
    fontWeight: 700,
    textShadow: '0 2px 6px rgba(0,0,0,0.4)',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    background: 'rgba(255, 255, 255, 0.12)',
    borderRadius: '12px',
    padding: '18px 22px',
    marginBottom: '18px',
    boxShadow: '0 6px 18px rgba(0,0,0,0.25)',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
    cursor: 'pointer',
  },
  listItemHover: {
    transform: 'translateY(-4px)',
    boxShadow: '0 10px 28px rgba(0,0,0,0.35)',
  },
  workoutHeader: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '10px',
  },
  workoutTitle: {
    fontSize: '1.4rem',
    fontWeight: 600,
    background: 'linear-gradient(90deg, #00c6ff, #0072ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  badge: {
    background: 'linear-gradient(90deg, #0072ff, #00c6ff)',
    color: '#fff',
    borderRadius: '14px',
    padding: '4px 12px',
    fontSize: '0.85rem',
    fontWeight: 600,
    boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
  },
  level: {
    marginLeft: 'auto',
    fontSize: '0.95rem',
    color: '#ddd',
    fontStyle: 'italic',
  },
  workoutDetails: {
    fontSize: '1rem',
    marginBottom: '12px',
    color: '#f1f1f1',
    lineHeight: 1.5,
  },
  link: {
    textDecoration: 'none',
    color: '#00c6ff',
    fontWeight: 600,
    fontSize: '1rem',
    transition: 'color 0.3s',
  },
  linkHover: {
    color: '#00eaff',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#bbb',
    padding: '25px',
  },
  error: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#ff5b5b',
    padding: '25px',
  },
  noWorkouts: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#ccc',
    padding: '25px',
  },
};

