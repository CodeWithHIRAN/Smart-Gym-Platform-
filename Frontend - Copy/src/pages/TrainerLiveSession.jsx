import React, { useState } from 'react';

const containerStyle = {
  padding: '25px',
  maxWidth: '900px',
  margin: '30px auto',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  background: 'rgba(255, 255, 255, 0.15)',
  backdropFilter: 'blur(12px)',
  borderRadius: '15px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
  border: '1px solid rgba(255,255,255,0.3)',
  color: '#222',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginBottom: '20px',
  background: 'rgba(255,255,255,0.1)',
  borderRadius: '10px',
  overflow: 'hidden',
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
};

const thStyle = {
  borderBottom: '2px solid rgba(255,255,255,0.4)',
  padding: '12px',
  textAlign: 'left',
  background: 'rgba(46, 204, 113, 0.85)',
  color: '#fff',
  fontSize: '16px',
  backdropFilter: 'blur(4px)',
};

const tdStyle = {
  borderBottom: '1px solid rgba(255,255,255,0.2)',
  padding: '12px',
  fontSize: '15px',
  color: '#222',
};

const buttonStyle = {
  padding: '8px 15px',
  margin: '0 5px 5px 0',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '14px',
  background: 'linear-gradient(135deg, #2980b9, #6dd5fa)',
  color: '#fff',
  boxShadow: '0 5px 15px rgba(41,128,185,0.4)',
  transition: 'transform 0.2s, box-shadow 0.2s',
};

const inputStyle = {
  padding: '8px',
  margin: '0 5px 5px 0',
  borderRadius: '8px',
  border: '1px solid rgba(255,255,255,0.4)',
  fontSize: '14px',
  background: 'rgba(255,255,255,0.15)',
  color: '#222',
  backdropFilter: 'blur(6px)',
};


const TrainerLiveSession = () => {
  const [sessions, setSessions] = useState([
    { id: 1, student: 'Alice', date: '2025-08-25', time: '10:00 AM' },
    { id: 2, student: 'Bob', date: '2025-08-26', time: '2:00 PM' },
    { id: 3, student: 'Charlie', date: '2025-08-27', time: '11:00 AM' },
  ]);

  const [rescheduleId, setRescheduleId] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  const handleReschedule = (id) => {
    const updatedSessions = sessions.map((s) =>
      s.id === id ? { ...s, date: newDate || s.date, time: newTime || s.time } : s
    );
    setSessions(updatedSessions);
    setRescheduleId(null);
    setNewDate('');
    setNewTime('');
  };

  const handleJoin = (student) => {
    alert(`Joining live session for ${student}`);
    // Here you can integrate actual live session logic (e.g., redirect to video call)
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#333' }}>
        Trainer Live Sessions
      </h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Student</th>
            <th style={thStyle}>Date</th>
            <th style={thStyle}>Time</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr key={session.id}>
              <td style={tdStyle}>{session.student}</td>
              <td style={tdStyle}>{session.date}</td>
              <td style={tdStyle}>{session.time}</td>
              <td style={tdStyle}>
                {rescheduleId === session.id ? (
                  <>
                    <input
                      type="date"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      style={inputStyle}
                    />
                    <input
                      type="time"
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                      style={inputStyle}
                    />
                    <button
                      style={{ ...buttonStyle, backgroundColor: '#28a745', color: '#fff' }}
                      onClick={() => handleReschedule(session.id)}
                    >
                      Save
                    </button>
                    <button
                      style={{ ...buttonStyle, backgroundColor: '#dc3545', color: '#fff' }}
                      onClick={() => setRescheduleId(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      style={{ ...buttonStyle, backgroundColor: '#007bff', color: '#fff' }}
                      onClick={() => setRescheduleId(session.id)}
                    >
                      Reschedule
                    </button>
                    <button
                      style={{ ...buttonStyle, backgroundColor: '#ff9800', color: '#fff' }}
                      onClick={() => handleJoin(session.student)}
                    >
                      Join
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrainerLiveSession;
