import React, { useState, useEffect } from 'react';
import VideoLibrary from './VideoLibrary';
import WorkoutPlan from './WorkoutPlan';
import GamifiedRewards from './GamifiedRewards';
import TrainerPanel from './TrainerPanel';
import BookingLiveSession from './BookingLiveSession'; // For users
import TrainerLiveSession from './TrainerLiveSession'; // For trainers
import AssignedWorkoutsPage from './AssignedWorkoutsPage';
import StudentAnalysis from './StudentAnalysis';
import CustomTodoList from './CustomTodoList';
import BMICalculator from '../aicomponents/BMICalculator';
import DietForm from '../aicomponents/DietForm';
import DietChart from '../aicomponents/DietChart';
import EmotionBasedWorkout from '../aicomponents/EmotionBasedWorkout';
import Chatbot from '../aicomponents/Chatbot';
import { generateDietChart } from '../api/geminiApi';
import './Dashboard.css';

function Dashboard() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [view, setView] = useState('');
  const [dietData, setDietData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || !token) {
      window.location.href = '/login';
    }
  }, [user, token]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
    window.location.href = '/login';
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const result = await generateDietChart(formData);
      setDietData(result);
    } catch (error) {
      console.error('Error generating diet chart:', error);
      setDietData(null);
      alert('Failed to generate diet chart. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h2>Welcome, {user?.name} 🏋️</h2>
        <div>
          Role: <strong>{user?.role}</strong>&nbsp;&nbsp;
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <nav className="dashboard-nav">
        {/* User-specific buttons */}
        {user?.role === 'user' && (
          <>
            <button
              className={view === 'workoutPlan' ? 'active' : ''}
              onClick={() => setView('workoutPlan')}
            >
              📝 AI Workout Plan
            </button>
            <button
              className={view === 'videoLibrary' ? 'active' : ''}
              onClick={() => setView('videoLibrary')}
            >
              🎬 Video Library
            </button>
            <button
              className={view === 'gamifiedRewards' ? 'active' : ''}
              onClick={() => setView('gamifiedRewards')}
            >
              🏆 Gamified Rewards
            </button>
            <button
              className={view === 'assignedWorkouts' ? 'active' : ''}
              onClick={() => setView('assignedWorkouts')}
            >
              📋 Assigned Workouts
            </button>
            <button
              className={view === 'customTodoList' ? 'active' : ''}
              onClick={() => setView('customTodoList')}
            >
              ✅ Custom To-Do List
            </button>
            <button
              className={view === 'bmi' ? 'active' : ''}
              onClick={() => setView('bmi')}
            >
              🧮 BMI
            </button>
            <button
              className={view === 'dietPlanner' ? 'active' : ''}
              onClick={() => setView('dietPlanner')}
            >
              🥗 Diet Planner
            </button>
            <button
              className={view === 'morningworkout' ? 'active' : ''}
              onClick={() => setView('morningworkout')}
            >
              😊 Emotion based Workout
            </button>
            <button
              className={view === 'chatbot' ? 'active' : ''}
              onClick={() => setView('chatbot')}
            >
              🤖 Chatbot
            </button>
            <button
              className={view === 'liveSessionBooking' ? 'active' : ''}
              onClick={() => setView('liveSessionBooking')}
            >
              📅 Live Session Booking
            </button>
          </>
        )}

        {/* Trainer-specific buttons */}
        {user?.role === 'trainer' && (
          <>
            <button
              className={view === 'trainerPanel' ? 'active' : ''}
              onClick={() => setView('trainerPanel')}
            >
              👨‍🏫 Assign Workout
            </button>
            <button
              className={view === 'StudentAnalysis' ? 'active' : ''}
              onClick={() => setView('StudentAnalysis')}
            >
              📊 Student Analysis
            </button>
            <button
              className={view === 'trainerLiveSession' ? 'active' : ''}
              onClick={() => setView('trainerLiveSession')}
            >
              📅 Live Session
            </button>
          </>
        )}
      </nav>

      <main className="dashboard-content">
        {/* User views */}
        {view === 'workoutPlan' && user?.role === 'user' && <WorkoutPlan />}
        {view === 'videoLibrary' && user?.role === 'user' && <VideoLibrary />}
        {view === 'gamifiedRewards' && user?.role === 'user' && <GamifiedRewards />}
        {view === 'bmi' && user?.role === 'user' && <BMICalculator />}
        {view === 'chatbot' && user?.role === 'user' && <Chatbot />}
        {view === 'morningworkout' && user?.role === 'user' && <EmotionBasedWorkout />}
        {view === 'dietPlanner' && user?.role === 'user' && (
          <>
            <DietForm onSubmit={handleSubmit} />
            {loading && <p>Generating your diet plan...</p>}
            {dietData && <DietChart data={dietData} />}
          </>
        )}
        {view === 'assignedWorkouts' && user?.role === 'user' && (
          <AssignedWorkoutsPage userId={user.id} token={token} />
        )}
        {view === 'customTodoList' && user?.role === 'user' && (
          <CustomTodoList userId={user.id} token={token} />
        )}
        {view === 'liveSessionBooking' && user?.role === 'user' && (
          <BookingLiveSession />
        )}

        {/* Trainer views */}
        {view === 'trainerPanel' && user?.role === 'trainer' && (
          <TrainerPanel token={token} />
        )}
        {view === 'trainerLiveSession' && user?.role === 'trainer' && (
          <TrainerLiveSession />
        )}
        {view === 'StudentAnalysis' && user?.role === 'trainer' && (
          <StudentAnalysis />
        )}
      </main>
    </div>
  );
}

export default Dashboard;
