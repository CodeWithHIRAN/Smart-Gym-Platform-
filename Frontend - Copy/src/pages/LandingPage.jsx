import React from 'react';

export default function LandingPage() {
  return (
    <div style={styles.container}>
      <div style={styles.containerOverlay}></div>

      {/* Hero Section */}
      <section style={styles.heroSection}>
        <h1 style={styles.heroTitle}>Smart Online Gym</h1>
        <p style={styles.heroSubtitle}>
          AI-powered workouts, live posture tracking, emotion-based adaptation, gamified rewards, and personalized diet plans.
        </p>
        <button style={styles.heroButton}>Join Now</button>
      </section>

      {/* Features Section */}
      <section style={styles.featuresSection}>
        <h2 style={styles.sectionTitle}>App Features</h2>
        <div style={styles.featuresGrid}>
          <div style={styles.featureBox}>
            <img src="https://static.vecteezy.com/system/resources/previews/048/734/931/non_2x/dashboard-colored-outline-icon-icon-related-to-overview-data-analytics-elements-illustration-vector.jpg" style={styles.featureImage} alt="Dashboard" />
            <h3 style={styles.featureTitle}>Dashboard Overview</h3>
            <p style={styles.featureDesc}>
              Personalized dashboard showing your workout progress, achievements, and smart suggestions.
            </p>
          </div>
          <div style={styles.featureBox}>
            <img src="https://img.freepik.com/free-vector/group-people-creating-video_1262-19787.jpg?semt=ais_hybrid&w=740&q=80" style={styles.featureImage} alt="Video Library" />
            <h3 style={styles.featureTitle}>Video Library</h3>
            <p style={styles.featureDesc}>
              Searchable collection of workouts with step-by-step videos for every level and goal.
            </p>
          </div>
          <div style={styles.featureBox}>
            <img src="https://static.vecteezy.com/system/resources/previews/004/244/700/non_2x/illustration-of-artificial-intelligence-develops-machine-learning-programs-and-analyzes-input-data-design-for-landing-page-web-website-mobile-apps-poster-flyer-ui-ux-free-vector.jpg" style={styles.featureImage} alt="AI Plan" />
            <h3 style={styles.featureTitle}>AI Plan Page</h3>
            <p style={styles.featureDesc}>
              Smart AI-generated workout and diet plans tailored to your fitness goals and health metrics.
            </p>
          </div>
          <div style={styles.featureBox}>
            <img src="https://static.vecteezy.com/system/resources/previews/045/486/372/non_2x/personal-coaching-online-training-with-ai-fitness-chatbot-woman-use-artificial-intelligence-for-engage-health-goals-robot-in-mobile-app-help-doing-healthy-exercises-sport-athletic-coach-technology-vector.jpg" style={styles.featureImage} alt="Chatbot" />
            <h3 style={styles.featureTitle}>Trainer Chatbot</h3>
            <p style={styles.featureDesc}>
              Chat with an AI trainer for guidance, feedback, and support at any time.
            </p>
          </div>
          <div style={styles.featureBox}>
            <img src="https://www.shutterstock.com/image-vector/woman-doing-yoga-pose-flat-260nw-2590107313.jpg" style={styles.featureImage} alt="Live Yoga" />
            <h3 style={styles.featureTitle}>Live Yoga Posture Tracker</h3>
            <p style={styles.featureDesc}>
              Real-time feedback on your yoga posture using AI-powered video tracking.
            </p>
          </div>
          <div style={styles.featureBox}>
            <img src="https://img.freepik.com/premium-vector/nutritionist-concept-diet-plan-with-healthy-food-physical-activity-vector-illustration_647843-351.jpg" style={styles.featureImage} alt="Diet Plan" />
            <h3 style={styles.featureTitle}>Personalized Diet Plan</h3>
            <p style={styles.featureDesc}>
              Smart diet recommendations based on your health data and fitness goals.
            </p>
          </div>
        </div>
      </section>

      {/* Hire Trainers Section */}
      <section style={styles.hireTrainersSection}>
        <h2 style={styles.sectionTitle}>Hire Expert Trainers</h2>
        <p style={styles.sectionDesc}>
          Certified trainers to guide you through workouts, yoga, HIIT, strength training, and more.
        </p>
        <div style={styles.trainersGrid}>
          <div style={styles.trainerCard}>
            <img src="https://thumb.ac-illust.com/8c/8c83fe086fbab666f125efc26dae6c7f_t.jpeg" style={styles.trainerImage} alt="Trainer 1" />
            <h4 style={styles.trainerName}>Gaurav T.</h4>
            <p style={styles.trainerExpertise}>Strength & Conditioning</p>
          </div>
          <div style={styles.trainerCard}>
            <img src="https://thumb.ac-illust.com/f9/f92c4f911b43970eb25fca36adacb807_t.jpeg" style={styles.trainerImage} alt="Trainer 2" />
            <h4 style={styles.trainerName}>Natasha N.</h4>
            <p style={styles.trainerExpertise}>Yoga & Flexibility</p>
          </div>
          <div style={styles.trainerCard}>
            <img src="https://thumb.ac-illust.com/c5/c52675e322e84f19830d0434b236e7b7_t.jpeg" style={styles.trainerImage} alt="Trainer 3" />
            <h4 style={styles.trainerName}>Mike T.</h4>
            <p style={styles.trainerExpertise}>HIIT & Cardio</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section style={styles.aboutSection}>
        <h2 style={styles.sectionTitle}>Why Smart Online Gym?</h2>
        <p style={styles.sectionDesc}>
          Our platform combines AI intelligence with human expertise to give you a fully personalized fitness experience. 
          Monitor your posture, track workouts, receive diet plans, and engage with AI chatbots to stay motivated every day.
        </p>
        <img src="https://st4.depositphotos.com/25790974/27925/v/450/depositphotos_279254412-stock-illustration-gym-logo-vector.jpg" style={styles.aboutImage} alt="App Technology" />
      </section>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: '"Poppins", sans-serif',
    position: 'relative',
    background: 'url("https://media.istockphoto.com/id/875207140/photo/sport-background-with-fitness-equipment-in-gym-gym.jpg?s=612x612&w=0&k=20&c=VEpZIAJ3wdlwHwvWuLumDmpsWczobiSH5kL981H5Cvk=") no-repeat center/cover',
    backgroundSize: 'cover',
    color: '#fff',
    minHeight: '100vh',
    paddingBottom: '50px',
  },
  containerOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(0,0,0,0.55)',
    backdropFilter: 'blur(8px)',
    zIndex: 0,
  },
  heroSection: {
    position: 'relative',
    zIndex: 1,
    textAlign: 'center',
    padding: '80px 20px 60px',
  },
  heroTitle: {
    fontSize: '3rem',
    fontWeight: '700',
    marginBottom: '20px',
    color: '#00c6ff',
    textShadow: '0 2px 15px rgba(0,198,255,0.5)',
  },
  heroSubtitle: {
    fontSize: '1.2rem',
    marginBottom: '15px',
    maxWidth: '700px',
    margin: '0 auto 15px auto',
    color: '#fff',
  },
  heroButton: {
  marginTop: '20px',
  padding: '15px 35px',
  fontSize: '1.2rem',
  fontWeight: '600',
  border: 'none',
  borderRadius: '15px',
  background: 'linear-gradient(135deg, #00c6ff, #0072ff)',
  color: '#fff',
  cursor: 'pointer',
  boxShadow: '0 6px 20px rgba(0,198,255,0.5)',
  transition: '0.3s ease',
  display: 'block',      // makes it block-level
  marginLeft: 'auto',    // auto margins center it
  marginRight: 'auto',
},

  featuresSection: {
    position: 'relative',
    zIndex: 1,
    padding: '50px 20px',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '40px',
    color: '#00c6ff',
    textShadow: '0 2px 10px rgba(0,198,255,0.5)',
  },
  featuresGrid: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '30px',
  },
  featureBox: {
    width: '250px',
    background: 'rgba(255,255,255,0.06)',
    backdropFilter: 'blur(12px)',
    padding: '20px',
    borderRadius: '20px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
  },
  featureImage: {
    width: '100%',
    borderRadius: '15px',
    marginBottom: '15px',
  },
  featureTitle: {
    fontSize: '1.2rem',
    marginBottom: '10px',
    color: '#00c6ff',
  },
  featureDesc: {
    fontSize: '1rem',
    color: '#fff',
  },
  hireTrainersSection: {
    position: 'relative',
    zIndex: 1,
    padding: '50px 20px',
    textAlign: 'center',
  },
  trainersGrid: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '30px',
  },
  trainerCard: {
    width: '220px',
    background: 'rgba(255,255,255,0.06)',
    backdropFilter: 'blur(12px)',
    padding: '20px',
    borderRadius: '20px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
  },
  trainerImage: {
    width: '100%',
    borderRadius: '50%',
    marginBottom: '15px',
  },
  trainerName: {
    fontSize: '1.1rem',
    color: '#00c6ff',
    fontWeight: '600',
  },
  trainerExpertise: {
    fontSize: '0.95rem',
    color: '#fff',
  },
  aboutSection: {
    position: 'relative',
    zIndex: 1,
    padding: '50px 20px',
    textAlign: 'center',
  },
  sectionDesc: {
    maxWidth: '700px',
    margin: '0 auto 30px',
    fontSize: '1.1rem',
    color: '#fff',
  },
  aboutImage: {
    width: '100%',
    maxWidth: '600px',
    borderRadius: '20px',
    marginTop: '20px',
  },
};
