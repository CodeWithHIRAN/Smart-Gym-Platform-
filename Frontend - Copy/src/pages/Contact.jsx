// src/pages/ContactUs.jsx

import React, { useState } from "react";

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    background:
      'url("https://media.istockphoto.com/id/875207140/photo/sport-background-with-fitness-equipment-in-gym-gym.jpg?s=612x612&w=0&k=20&c=VEpZIAJ3wdlwHwvWuLumDmpsWczobiSH5kL981H5Cvk=") no-repeat center center/cover',
    fontFamily: "'Poppins', sans-serif",
    position: "relative",
    zIndex: 0,
  },
  overlay: {
    content: '""',
    position: "absolute",
    inset: 0,
    background: "rgba(0, 0, 0, 0.55)",
    backdropFilter: "blur(8px)",
    zIndex: 0,
  },
  container: {
    position: "relative",
    zIndex: 1,
    maxWidth: "850px",
    width: "100%",
    margin: "30px auto",
    padding: "35px",
    borderRadius: "20px",
    background: "rgba(255, 255, 255, 0.06)",
    backdropFilter: "blur(12px)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
    color: "#fff",
  },
  title: {
    marginBottom: "25px",
    fontSize: "2.2rem",
    textAlign: "center",
    fontWeight: 700,
    textShadow: "0 3px 8px rgba(0,0,0,0.5)",
  },
  description: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "1.1rem",
    color: "#ddd",
    lineHeight: 1.5,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  input: {
    padding: "14px 18px",
    borderRadius: "12px",
    border: "none",
    background: "rgba(255, 255, 255, 0.08)",
    color: "#fff",
    fontSize: "1rem",
    outline: "none",
    backdropFilter: "blur(6px)",
    transition: "0.3s ease",
  },
  textarea: {
    minHeight: "120px",
    padding: "14px 18px",
    borderRadius: "12px",
    border: "none",
    background: "rgba(255, 255, 255, 0.08)",
    color: "#fff",
    fontSize: "1rem",
    outline: "none",
    resize: "none",
    backdropFilter: "blur(6px)",
  },
  button: {
    alignSelf: "center",
    marginTop: "15px",
    padding: "14px 40px",
    fontSize: "1.15rem",
    fontWeight: "600",
    border: "none",
    borderRadius: "25px",
    background: "linear-gradient(135deg, #ff6a00, #ee0979)",
    color: "#fff",
    cursor: "pointer",
    boxShadow: "0 6px 18px rgba(255,105,180,0.4)",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
  },
  buttonHover: {
    transform: "scale(1.08)",
    boxShadow: "0px 6px 20px rgba(255, 105, 180, 0.5)",
  },
};

const Contact = () => {
  const [hover, setHover] = useState(false);

  return (
    <div style={styles.page}>
      <div style={styles.overlay}></div>

      <div style={styles.container}>
        <h1 style={styles.title}>Contact Us</h1>
        <p style={styles.description}>
          Have questions, feedback, or suggestions? Fill out the form below and
          our team will get back to you as soon as possible.
        </p>

        <form style={styles.form}>
          <input
            type="text"
            placeholder="Your Name"
            style={styles.input}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            style={styles.input}
            required
          />
          <textarea
            placeholder="Your Message"
            style={styles.textarea}
            required
          ></textarea>
          <button
            type="submit"
            style={
              hover ? { ...styles.button, ...styles.buttonHover } : styles.button
            }
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
