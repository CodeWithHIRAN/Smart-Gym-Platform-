import React, { useState } from 'react';

const videosByCategory = {
  Chest: [
    { id: 1, title: 'Chest Workout for Beginners', videoUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4', thumbnail: 'https://img.youtube.com/vi/IODxDxX7oi4/0.jpg' },
    { id: 2, title: 'Advanced Chest Exercises', videoUrl: 'https://www.youtube.com/watch?v=eozdVDA78K0', thumbnail: 'https://img.youtube.com/vi/eozdVDA78K0/0.jpg' },
    { id: 3, title: 'Chest Dumbbell Workout', videoUrl: 'https://www.youtube.com/watch?v=6JtP6ju0IMw', thumbnail: 'https://img.youtube.com/vi/6JtP6ju0IMw/0.jpg' },
  ],
  Legs: [
    { id: 1, title: 'Leg Day Exercises', videoUrl: 'https://www.youtube.com/watch?v=U3HlEF_E9fo', thumbnail: 'https://img.youtube.com/vi/U3HlEF_E9fo/0.jpg' },
    { id: 2, title: 'Quadriceps Workout', videoUrl: 'https://www.youtube.com/watch?v=4x6SB8zF_Sc', thumbnail: 'https://img.youtube.com/vi/4x6SB8zF_Sc/0.jpg' },
    { id: 3, title: 'Hamstring Training', videoUrl: 'https://www.youtube.com/watch?v=1Tq3QdYUuHs', thumbnail: 'https://img.youtube.com/vi/1Tq3QdYUuHs/0.jpg' },
  ],
  // Add more categories as needed
};

export default function VideoLibrary() {
  // Track completed videos as an object: { 'Chest-1': true, ... }
  const [completedVideos, setCompletedVideos] = useState({});

  const toggleComplete = (category, id) => {
    const key = `${category}-${id}`;
    setCompletedVideos(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Training Video Library</h2>
      {Object.entries(videosByCategory).map(([category, videos]) => (
        <div key={category} style={styles.categorySection}>
          <h3 style={styles.categoryTitle}>{category}</h3>
          {videos.map(video => {
            const key = `${category}-${video.id}`;
            const completed = completedVideos[key];
            return (
              <div
                key={video.id}
                style={{
                  ...styles.videoRow,
                  opacity: completed ? 0.6 : 1,
                  textDecoration: completed ? 'line-through' : 'none',
                }}
              >
                <a href={video.videoUrl} target="_blank" rel="noreferrer" style={styles.thumbnailLink}>
                  <img src={video.thumbnail} alt={video.title} style={styles.thumbnail} />
                </a>
                <div style={styles.videoInfo}>
                  <a
                    href={video.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      ...styles.videoTitle,
                      color: completed ? '#6c757d' : '#000',
                    }}
                  >
                    {video.title}
                  </a>
                  <button
                    onClick={() => toggleComplete(category, video.id)}
                    style={{
                      ...styles.completeBtn,
                      backgroundColor: completed ? '#28a745' : '#007bff',
                    }}
                  >
                    {completed ? 'Completed ✔️' : 'Mark as Complete'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 800,
    margin: '25px auto',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: 'rgba(255,255,255,0.15)',
    backdropFilter: 'blur(12px)',
    borderRadius: 15,
    padding: 25,
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    border: '1px solid rgba(255,255,255,0.3)',
  },
  header: {
    textAlign: 'center',
    marginBottom: 35,
    color: '#2c3e50',
    fontSize: '2rem',
    fontWeight: '700',
  },
  categorySection: {
    marginBottom: 45,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: '700',
    borderBottom: '2px solid rgba(41,128,185,0.7)',
    paddingBottom: 6,
    marginBottom: 18,
    color: '#2980b9',
  },
  videoRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 18,
    gap: 15,
    padding: '10px 12px',
    borderRadius: 12,
    background: 'rgba(255,255,255,0.1)',
    boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  videoRowHover: {
    transform: 'scale(1.02)',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
  },
  thumbnailLink: {
    flexShrink: 0,
  },
  thumbnail: {
    width: 130,
    height: 75,
    borderRadius: 10,
    objectFit: 'cover',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  },
  videoInfo: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: '600',
    textDecoration: 'none',
    color: '#34495e',
  },
  completeBtn: {
    padding: '8px 18px',
    border: 'none',
    borderRadius: 8,
    color: '#fff',
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: '600',
    background: 'linear-gradient(135deg, #2980b9, #6dd5fa)',
    boxShadow: '0 5px 12px rgba(41,128,185,0.4)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  completeBtnHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 7px 15px rgba(41,128,185,0.6)',
  },
};
