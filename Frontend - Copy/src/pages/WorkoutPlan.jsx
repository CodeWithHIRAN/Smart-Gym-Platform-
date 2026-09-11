import React, { useState } from "react";

export default function WorkoutCalendarPlan() {
  const [formData, setFormData] = useState({
    sex: 0,
    age: 25,
    height: 175,
    weight: 70,
    hypertension: 0,
    diabetes: 0,
    fitness_goal: 2,
    fitness_type: 0,
  });

  const [workoutData, setWorkoutData] = useState(null);
  const [selectedDay, setSelectedDay] = useState("day1");
  const [completedWorkouts, setCompletedWorkouts] = useState({});
  const [loading, setLoading] = useState(false);

  const options = {
    sex: [
      { label: "Male", value: 0 },
      { label: "Female", value: 1 },
    ],
    hypertension: [
      { label: "No", value: 0 },
      { label: "Yes", value: 1 },
    ],
    diabetes: [
      { label: "No", value: 0 },
      { label: "Yes", value: 1 },
    ],
    fitness_goal: [
      { label: "Weight Gain", value: 0 },
      { label: "Weight Loss", value: 1 },
      { label: "Muscular", value: 2 },
      { label: "Endurance", value: 3 },
    ],
    fitness_type: [
      { label: "Muscular", value: 0 },
      { label: "Cardio", value: 1 },
      { label: "Mixed", value: 2 },
    ],
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "#0f2027",
      fontFamily: '"Poppins", sans-serif',
      padding: "20px",
      flexDirection: "column",
      color: "#fff",
      position: "relative",
      zIndex: 1,
    },
    formCard: {
      position: "relative",
      zIndex: 2,
      background: "rgba(255,255,255,0.06)",
      backdropFilter: "blur(12px)",
      padding: "50px",
      borderRadius: "20px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
      width: "450px",
      maxWidth: "90%",
      marginBottom: "40px",
      color: "#fff",
    },
    formTitle: {
      textAlign: "center",
      marginBottom: "25px",
      fontSize: "26px",
      fontWeight: "600",
      color: "#00c6ff",
      textShadow: "0 2px 8px rgba(0,198,255,0.5)",
    },
    label: {
      display: "flex",
      flexDirection: "column",
      marginBottom: "15px",
      fontSize: "14px",
      color: "#fff",
      fontWeight: "600",
    },
    input: {
      padding: "12px",
      fontSize: "16px",
      borderRadius: "15px",
      border: "1px solid rgba(255,255,255,0.3)",
      background: "rgba(255,255,255,0.08)",
      color: "#fff",
      marginTop: "6px",
      outline: "none",
      transition: "0.3s",
      backdropFilter: "blur(6px)",
    },
    select: {
      padding: "12px",
      fontSize: "16px",
      borderRadius: "15px",
      border: "1px solid rgba(255,255,255,0.3)",
      background: "rgba(255,255,255,0.08)",
      color: "#000",
      marginTop: "6px",
      cursor: "pointer",
      outline: "none",
      transition: "0.3s",
      backdropFilter: "blur(6px)",
    },
    button: {
      padding: "14px",
      fontSize: "16px",
      border: "none",
      borderRadius: "25px",
      cursor: "pointer",
      background: "linear-gradient(135deg, #00c6ff, #0072ff)",
      color: "#fff",
      marginTop: "15px",
      fontWeight: "600",
      boxShadow: "0 6px 20px rgba(0,198,255,0.5)",
      transition: "0.3s ease",
    },
    dayButton: (selected) => ({
      padding: "10px 18px",
      borderRadius: "8px",
      cursor: "pointer",
      backgroundColor: selected ? "#007bff" : "#eee",
      color: selected ? "#fff" : "#000",
      fontWeight: "bold",
      border: "none",
      transition: "0.2s",
    }),
    workoutCard: {
      background: "rgba(255,255,255,0.08)",
      padding: "20px",
      borderRadius: "12px",
      width: "300px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
      color: "#fff",
    },
    workoutButton: (completed) => ({
      padding: "8px 12px",
      marginTop: "10px",
      backgroundColor: completed ? "#28a745" : "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
    }),
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3003/get-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setWorkoutData(data.Exercises);
      setSelectedDay("day1");
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  // Toggle completion per day
  const toggleComplete = (day, title) => {
    const key = `${day}_${title}`;
    setCompletedWorkouts((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (loading)
    return (
      <div style={styles.container}>
        <h2>Loading your personalized workout plan...</h2>
      </div>
    );

  if (!workoutData)
    return (
      <div style={styles.container}>
        <div style={styles.formCard}>
          <h2 style={styles.formTitle}>Enter Your Details</h2>
          <form onSubmit={handleSubmit}>
            {["sex", "hypertension", "diabetes", "fitness_goal", "fitness_type"].map((field) => (
              <label key={field} style={styles.label}>
                {field.replace("_", " ").toUpperCase()}
                <select name={field} value={formData[field]} onChange={handleChange} style={styles.select}>
                  {options[field].map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>
            ))}

              {/* 🔹 LIMITED INPUTS */}
            <label style={styles.label}>
              Age
              <input
                name="age"
                type="number"
                min={5}
                max={120}
                step={1}
                value={formData.age}
                onChange={handleChange}
                style={styles.input}
              />
            </label>

            <label style={styles.label}>
              Height (cm)
              <input
                name="height"
                type="number"
                min={80}
                max={250}
                step={1}
                value={formData.height}
                onChange={handleChange}
                style={styles.input}
              />
            </label>

            <label style={styles.label}>
              Weight (kg)
              <input
                name="weight"
                type="number"
                min={20}
                max={300}
                step={0.1}
                value={formData.weight}
                onChange={handleChange}
                style={styles.input}
              />
            </label>

            <button type="submit" style={styles.button}>
              Get Plan
            </button>
          </form>
        </div>
      </div>
    );

  return (
    <div style={styles.container}>
      <h2 style={{ marginBottom: "20px" }}>Workout Plan</h2>
      <div style={{ display: "flex", gap: "10px", marginBottom: "25px", flexWrap: "wrap", justifyContent: "center" }}>
        {Object.keys(workoutData).map((day) => (
          <button key={day} onClick={() => setSelectedDay(day)} style={styles.dayButton(selectedDay === day)}>
            {day.toUpperCase()}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {workoutData[selectedDay].map((ex, idx) => (
          <div key={idx} style={styles.workoutCard}>
            <h3>{ex.title}</h3>
            <p>Duration: {ex.duration}s</p>
            <ul>{ex.steps.map((step, i) => <li key={i}>{step}</li>)}</ul>
            <button
              onClick={() => toggleComplete(selectedDay, ex.title)}
              style={styles.workoutButton(completedWorkouts[`${selectedDay}_${ex.title}`])}
            >
              {completedWorkouts[`${selectedDay}_${ex.title}`] ? "Completed" : "Mark as Complete"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
