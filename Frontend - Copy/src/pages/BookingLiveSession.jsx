import React, { useState, useEffect } from "react";

export default function BookingLiveSession() {
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState(
    localStorage.getItem("selectedTrainer") || ""
  );
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(
    localStorage.getItem("selectedDate")
      ? new Date(localStorage.getItem("selectedDate"))
      : null
  );
  const [selectedTime, setSelectedTime] = useState(
    localStorage.getItem("selectedTime") || ""
  );
  const [bookedSessions, setBookedSessions] = useState(
    JSON.parse(localStorage.getItem("bookedSessions") || "[]")
  );
  const [error, setError] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const fetchTrainers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users");
      const data = await res.json();
      setTrainers(data.filter((u) => u.role === "trainer"));
    } catch {
      setError("❌ Failed to load trainers.");
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  // 🔄 Save state to LocalStorage
  useEffect(() => {
    localStorage.setItem("selectedTrainer", selectedTrainer);
    localStorage.setItem("selectedTime", selectedTime);
    localStorage.setItem("selectedDate", selectedDate ? selectedDate : "");
    localStorage.setItem("bookedSessions", JSON.stringify(bookedSessions));
  }, [selectedTrainer, selectedDate, selectedTime, bookedSessions]);

  const getCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const startingDay = firstDayOfMonth.getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < (startingDay === 0 ? 6 : startingDay - 1); i++) {
      days.push(null);
    }
    for (let d = 1; d <= totalDays; d++) {
      days.push(new Date(year, month, d));
    }
    return days;
  };

  const selectDate = (date) => {
    if (!date) return;
    if (date.getDay() === 0) return setError("❌ Sundays disabled");
    if (date < today) return setError("❌ Cannot select a past date");

    setSelectedDate(date);
    setError("");
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 22; hour++) {
      slots.push(`${hour.toString().padStart(2, "0")}:00`);
    }
    return slots;
  };

  const handleBookSession = () => {
    if (!selectedTrainer)
      return setError("⚠ Select a trainer first");
    if (!selectedDate)
      return setError("⚠ Select a valid date");
    if (!selectedTime)
      return setError("⚠ Select time");

    const newSession = {
      trainer: trainers.find((t) => t._id === selectedTrainer)?.name,
      date: selectedDate.toDateString(),
      time: selectedTime,
      meetingLink:
        "https://meet.jit.si/egym-" + crypto.randomUUID().slice(0, 6),
    };

    setBookedSessions([...bookedSessions, newSession]);
    setSelectedDate(null);
    setSelectedTime("");
    setError("");
  };

  const handleCancel = (index) => {
    const updated = bookedSessions.filter((_, i) => i !== index);
    setBookedSessions(updated);
  };

  const openEditModal = (index) => {
    setEditIndex(index);
    setSelectedDate(null);
    setSelectedTime("");
    setEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (!selectedDate || !selectedTime)
      return setError("⚠ Select date & time");

    const updated = [...bookedSessions];
    updated[editIndex].date = selectedDate.toDateString();
    updated[editIndex].time = selectedTime;

    setBookedSessions(updated);
    setEditModalOpen(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Live Session Booking</h1>

        {error && <p style={styles.error}>{error}</p>}

        <label style={styles.label}>Choose Trainer</label>
        <select
          style={styles.select}
          value={selectedTrainer}
          onChange={(e) => setSelectedTrainer(e.target.value)}
        >
          <option value="">-- Select Trainer --</option>
          {trainers.map((t) => (
            <option key={t._id} value={t._id}>{t.name}</option>
          ))}
        </select>

        {/* ⭐ Stylish Calendar */}
        <div style={styles.calendarWrapper}>
          <div style={styles.monthHeader}>
            <button
              style={styles.monthBtn}
              onClick={() =>
                setCurrentMonth(
                  new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
                )
              }
            >
              ← Prev
            </button>

            <div style={styles.monthTitle}>
              <span style={styles.monthText}>
                {currentMonth.toLocaleString("default", { month: "long" })}
              </span>
              <span style={styles.yearText}>
                {currentMonth.getFullYear()}
              </span>
            </div>

            <button
              style={styles.monthBtn}
              onClick={() =>
                setCurrentMonth(
                  new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
                )
              }
            >
              Next →
            </button>
          </div>

          <div style={styles.weekDays}>
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <span key={d} style={styles.weekDay}>{d}</span>
            ))}
          </div>

          <div style={styles.calendarGrid}>
            {getCalendarDays().map((date, i) => {
              if (!date) return <div key={i}></div>;

              const isSunday = date.getDay() === 0;
              const isPast = date < today;

              const disabled = isSunday || isPast;

              return (
                <div
                  key={i}
                  style={{
                    ...styles.dayCell,
                    background:
                      selectedDate?.toDateString() === date.toDateString()
                        ? "#00c6ff"
                        : disabled
                        ? "#a12424ff"
                        : "#1b2430",
                    pointerEvents: disabled ? "none" : "auto",
                    opacity: disabled ? 0.4 : 1,
                  }}
                  onClick={() => selectDate(date)}
                >
                  {date.getDate()}
                </div>
              );
            })}
          </div>
        </div>

        {/* Time Slots */}
        <h3 style={styles.subTitle}>Choose Time</h3>
        <div style={styles.timeGrid}>
          {generateTimeSlots().map((time) => (
            <div
              key={time}
              style={{
                ...styles.timeSlot,
                background:
                  selectedTime === time ? "#00c6ff" : "#1b2430",
              }}
              onClick={() => setSelectedTime(time)}
            >
              {time}
            </div>
          ))}
        </div>

        <button style={styles.bookBtn} onClick={handleBookSession}>
          Book Session
        </button>

        {/* Booked List */}
        {bookedSessions.length > 0 && (
          <div>
            <h3 style={styles.subTitle}>Your Booked Sessions</h3>
            {bookedSessions.map((session, index) => (
              <div key={index} style={styles.sessionItem}>
                <p><b>Trainer:</b> {session.trainer}</p>
                <p><b>Date:</b> {session.date}</p>
                <p><b>Time:</b> {session.time}</p>

                <button
                  style={styles.joinBtn}
                  onClick={() => window.open(session.meetingLink, "_blank")}
                >
                  Join Meeting
                </button>

                <button
                  style={styles.editBtn}
                  onClick={() => openEditModal(index)}
                >
                  Edit
                </button>

                <button
                  style={styles.cancelBtn}
                  onClick={() => handleCancel(index)}
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Edit Modal */}
        {editModalOpen && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
              <h3>Edit Session</h3>

              <p>Select New Date</p>
              {getCalendarDays()
                .filter((date) => date && date >= today && date.getDay() !== 0)
                .map((date, i) => (
                  <button
                    key={i}
                    style={styles.modalBtn}
                    onClick={() => setSelectedDate(date)}
                  >
                    {date.getDate()}
                  </button>
                ))}

              <p>Select New Time</p>
              {generateTimeSlots().map((time) => (
                <button
                  key={time}
                  style={styles.modalBtn}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}

              <button style={styles.saveBtn} onClick={handleSaveEdit}>
                Save
              </button>
              <button
                style={styles.closeBtn}
                onClick={() => setEditModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* 🎨 Styling */
const styles = {
  page: { minHeight: "100vh", padding: "40px 0", color: "#fff" },
  card: {
    width: "900px",
    margin: "auto",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 0 25px rgba(0, 200, 255, 0.15)",
  },
  title: { textAlign: "center", fontSize: "2rem", fontWeight: "bold" },

  error: {
    background: "#ff4a4a",
    padding: "8px",
    borderRadius: "10px",
    textAlign: "center",
  },

  label: { marginTop: 20, display: "block" },
  select: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    background: "#fff",
    color: "#000",
  },

  /* 📅 Calendar */
  calendarWrapper: { marginTop: "25px" },
  monthHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  monthBtn: {
    background: "linear-gradient(135deg, #1b2430, #00b3ff)",
    border: "none",
    padding: "10px 18px",
    borderRadius: "10px",
    color: "#fff",
    cursor: "pointer",
    transition: "0.3s",
  },
  monthTitle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  monthText: { fontSize: "1.4rem", fontWeight: "bold" },
  yearText: { opacity: 0.7 },

  weekDays: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    marginBottom: "5px",
  },
  weekDay: { textAlign: "center", opacity: 0.6 },

  calendarGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "6px",
  },

  dayCell: {
    padding: "10px",
    borderRadius: "8px",
    textAlign: "center",
    cursor: "pointer",
  },

  /* 🕘 Time */
  subTitle: { marginTop: 25, fontSize: "1.2rem" },
  timeGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "6px",
  },
  timeSlot: { padding: "10px", borderRadius: "8px", cursor: "pointer" },

  /* ✔ Saved Sessions */
  sessionItem: {
    marginTop: "12px",
    padding: "12px",
    background: "#1b2430",
    borderRadius: "10px",
  },
  joinBtn: {
    background: "#28a745",
    padding: "6px 10px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    marginRight: "10px",
  },
  editBtn: {
    background: "#ffd23f",
    padding: "6px 10px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    marginRight: "10px",
  },
  cancelBtn: {
    background: "#d62828",
    padding: "6px 10px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },

  /* ✏ Edit Modal */
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "#fff",
    width: "380px",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    color: "#000",
  },
  modalBtn: {
    margin: "3px",
    padding: "5px 8px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  saveBtn: {
    marginTop: "12px",
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    background: "#00b3ff",
    border: "none",
    color: "#fff",
    cursor: "pointer",
  },
  closeBtn: {
    marginTop: "8px",
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    background: "#666",
    border: "none",
    color: "#fff",
    cursor: "pointer",
  },
  bookBtn: {
  marginTop: "20px",
  width: "100%",
  padding: "16px",
  borderRadius: "14px",
  border: "none",
  cursor: "pointer",
  fontSize: "1.25rem",
  fontWeight: "bold",
  letterSpacing: "0.8px",
  background: "linear-gradient(135deg, #0078FF, #00C6FF)",
  color: "#ffffff",
  boxShadow: "0 6px 18px rgba(0, 140, 255, 0.35)",
  transition: "all 0.25s ease-in-out",
  textTransform: "uppercase",
},
bookBtnHover: {
  transform: "scale(1.06)",
  boxShadow: "0 8px 25px rgba(0, 170, 255, 0.50)",
}

};
