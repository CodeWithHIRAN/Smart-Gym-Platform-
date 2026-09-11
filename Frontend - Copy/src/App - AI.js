import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import DietForm from './aicomponents/DietForm';
import DietChart from './aicomponents/DietChart';
import { generateDietChart } from './api/geminiApi';
import BMICalculator from './aicomponents/BMICalculator'; 
import EmotionBasedWorkout from './aicomponents/EmotionBasedWorkout'; 
import Chatbot from './aicomponents/Chatbot';

const App = () => {
  const [dietData, setDietData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    const result = await generateDietChart(formData);
    setDietData(result);
    setLoading(false);
  };

  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/diet"
            element={
              <>
                <DietForm onSubmit={handleSubmit} />
                {loading && <p>Generating your plan...</p>}
                <DietChart data={dietData} />
              </>
            }
          />
          <Route path="/bmi" element={<BMICalculator />} />
          <Route path="/morningworkout" element={<EmotionBasedWorkout />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
