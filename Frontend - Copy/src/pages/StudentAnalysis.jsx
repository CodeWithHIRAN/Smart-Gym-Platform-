import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';

// Mock analysis data
const mockAnalysisData = {
  Alice: [
    { date: '2025-08-15', completed: 3, duration: 45 },
    { date: '2025-08-16', completed: 2, duration: 30 },
    { date: '2025-08-17', completed: 4, duration: 60 },
  ],
  Bob: [
    { date: '2025-08-15', completed: 2, duration: 30 },
    { date: '2025-08-16', completed: 3, duration: 40 },
    { date: '2025-08-17', completed: 1, duration: 20 },
  ],
  Charlie: [
    { date: '2025-08-15', completed: 4, duration: 50 },
    { date: '2025-08-16', completed: 5, duration: 70 },
    { date: '2025-08-17', completed: 3, duration: 45 },
  ],
};

const StudentAnalysis = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/users') // get students from DB
    
      .then((res) => res.json())
      .then((data) => {
        // Convert DB students into { name }
        const dbStudents = data.map((s) => ({ name: s.name, _id: s._id }));
        // Add mock students
        const mockStudents = Object.keys(mockAnalysisData).map((name) => ({
          name,
          _id: `mock-${name}`,
        }));
        const mergedStudents = [...dbStudents, ...mockStudents];

        setStudents(mergedStudents);
        if (mergedStudents.length > 0) setSelectedStudent(mergedStudents[0].name);
      })
      .catch((err) => console.error('Error fetching students:', err));
  }, []);

  if (!selectedStudent) return <div>Loading student data...</div>;

  // Pick analysis only if exists in mockAnalysisData
  const analysis = mockAnalysisData[selectedStudent] || [];

  const dates = analysis.map((w) => w.date);
  const completedWorkouts = analysis.map((w) => w.completed);
  const durationData = analysis.map((w) => w.duration);

  const barData = {
    labels: dates,
    datasets: [
      {
        label: 'Completed Workouts',
        data: completedWorkouts,
        backgroundColor: '#4a90e2',
        borderRadius: 5,
      },
    ],
  };

  const lineData = {
    labels: dates,
    datasets: [
      {
        label: 'Workout Duration (minutes)',
        data: durationData,
        fill: false,
        borderColor: '#28a745',
        tension: 0.3,
      },
    ],
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '30px auto' }}>
      <h2 style={{ textAlign: 'center' }}>Student Performance Analysis</h2>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <label style={{ marginRight: '10px' }}>Select Student:</label>
        <select
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
        >
          {students.map((s) => (
            <option key={s._id} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {analysis.length > 0 ? (
        <>
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ textAlign: 'center' }}>Completed Workouts</h3>
            <Bar data={barData} />
          </div>

          <div>
            <h3 style={{ textAlign: 'center' }}>Workout Duration</h3>
            <Line data={lineData} />
          </div>
        </>
      ) : (
        <p style={{ textAlign: 'center', color: 'gray' }}>
          No analysis data available for {selectedStudent}.
        </p>
      )}
    </div>
  );
};

export default StudentAnalysis;
