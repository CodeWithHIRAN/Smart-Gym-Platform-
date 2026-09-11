import React, { useState } from "react";

const initialUser = {
  name: "John Doe",
  points: 350,
  badges: [
    { id: 1, name: "Starter Spirit", description: "Complete your first workout", level: "Bronze" },
    { id: 2, name: "Consistency King", description: "7-day streak completed", level: "Silver" },
  ],
  challengesCompleted: [],
  xp: 350,
  weeklyWorkouts: 5,
  milestones: [
    { id: 1, name: "First 100 Points", achieved: true },
    { id: 2, name: "5 Workouts Completed", achieved: false },
    { id: 3, name: "10 Workouts Completed", achieved: false },
  ],
};

const badgeColors = {
  Bronze: "#cd7f32",
  Silver: "#c0c0c0",
  Gold: "#ffd700",
  Diamond: "#b9f2ff",
};

const challenges = [
  {
    id: 1,
    name: "7-Day Shred",
    description: "Complete 1 workout daily for 7 days",
    pointsReward: 100,
    duration: "7 days",
  },
  {
    id: 2,
    name: "Weekend Warrior",
    description: "Complete 5 sets in 2 days",
    pointsReward: 50,
    duration: "2 days",
  },
  {
    id: 3,
    name: "Iron Core",
    description: "Abs + Cardio Combo for 3 days",
    pointsReward: 75,
    duration: "3 days",
  },
];

const leaderboard = [
  { id: 1, name: "Alice", points: 450 },
  { id: 2, name: "Bob", points: 380 },
  { id: 3, name: "Charlie", points: 320 },
  { id: 4, name: "You", points: initialUser.points },
];

const rewardsCatalog = [
  { id: 1, name: "Premium Video Access", cost: 250 },
  { id: 2, name: "Custom Profile Theme", cost: 400 },
  { id: 3, name: "Free 1-on-1 Session", cost: 1000 },
  { id: 4, name: "Smart Gym T-shirt", cost: 2000 },
  { id: 5, name: "Discount on Subscription", cost: 1500 },
];

export default function GamifiedRewards() {
  const [user, setUser] = useState(initialUser);
  const [message, setMessage] = useState("");

  // Complete a challenge and get points
  function completeChallenge(challengeId) {
    if (user.challengesCompleted.includes(challengeId)) {
      setMessage("Challenge already completed.");
      return;
    }
    const challenge = challenges.find((c) => c.id === challengeId);
    if (!challenge) return;

    const newPoints = user.points + challenge.pointsReward;
    const newXp = user.xp + challenge.pointsReward;

    // Unlock Gold badge if points > 300 and user doesn't have it yet
    let updatedBadges = user.badges;
    if (newPoints >= 300 && !user.badges.find((b) => b.name === "Muscle Master")) {
      updatedBadges = [
        ...user.badges,
        { id: 3, name: "Muscle Master", description: "Earn 300+ points", level: "Gold" },
      ];
    }

    setUser({
      ...user,
      points: newPoints,
      xp: newXp,
      challengesCompleted: [...user.challengesCompleted, challengeId],
      badges: updatedBadges,
      milestones: user.milestones.map((m) =>
        m.id === 1 ? { ...m, achieved: newPoints >= 100 } : m
      ),
    });
    setMessage(`Challenge "${challenge.name}" completed! You earned ${challenge.pointsReward} points.`);
  }

  // Redeem a reward
  function redeemReward(rewardId) {
    const reward = rewardsCatalog.find((r) => r.id === rewardId);
    if (!reward) return;
    if (user.points < reward.cost) {
      setMessage("Not enough points to redeem this reward.");
      return;
    }
    setUser({
      ...user,
      points: user.points - reward.cost,
    });
    setMessage(`You redeemed "${reward.name}"! Congrats! 🎉`);
  }

  const xpGoal = 500;
  const xpPercent = Math.min((user.xp / xpGoal) * 100, 100);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🏆 Gamified Rewards System</h1>

      {/* Points and XP Bar */}
      <section style={styles.pointsSection}>
        <h3>Your Points: <span style={{ color: "#27ae60" }}>{user.points}</span></h3>
        <div style={styles.xpBarBackground} aria-label="XP progress bar">
          <div style={{ ...styles.xpBarFill, width: `${xpPercent}%` }} />
        </div>
        <small>{user.xp} XP / {xpGoal} XP to next badge</small>
      </section>

      {/* Badges */}
      <section style={styles.section}>
        <h3>Badges Earned</h3>
        <div style={styles.badgeContainer}>
          {user.badges.length === 0 ? (
            <p style={{ fontStyle: "italic" }}>No badges yet. Complete workouts to earn badges!</p>
          ) : (
            user.badges.map((badge) => (
              <div
                key={badge.id}
                style={{ ...styles.badgeCard, borderColor: badgeColors[badge.level] }}
                title={`${badge.name}: ${badge.description} (${badge.level} Badge)`}
              >
                <div style={{ ...styles.badgeCircle, backgroundColor: badgeColors[badge.level] }}>
                  {badge.level[0]}
                </div>
                <div>
                  <strong>{badge.name}</strong>
                  <p style={{ fontSize: 12, margin: 0, color: "#555" }}>{badge.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Milestones */}
      <section style={styles.section}>
        <h3>Milestones</h3>
        <ul style={styles.milestoneList}>
          {user.milestones.map((m) => (
            <li
              key={m.id}
              style={{
                ...styles.milestoneItem,
                color: m.achieved ? "#27ae60" : "#999",
                textDecoration: m.achieved ? "line-through" : "none",
              }}
            >
              {m.name}
              {m.achieved && <span style={styles.checkmark}>✓</span>}
            </li>
          ))}
        </ul>
      </section>

      {/* Challenges */}
      <section style={styles.section}>
        <h3>Challenges</h3>
        <div>
          {challenges.map((challenge) => {
            const completed = user.challengesCompleted.includes(challenge.id);
            return (
              <div key={challenge.id} style={styles.challengeCard}>
                <div>
                  <strong>{challenge.name}</strong> <small style={{ color: "#555" }}>({challenge.duration})</small>
                  <p style={{ margin: "5px 0", color: "#666" }}>{challenge.description}</p>
                </div>
                <button
                  style={{ ...styles.btn, ...(completed ? styles.btnDisabled : styles.btnPrimary) }}
                  onClick={() => completeChallenge(challenge.id)}
                  disabled={completed}
                >
                  {completed ? "Completed" : `Complete (+${challenge.pointsReward} pts)`}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Leaderboard */}
      <section style={styles.section}>
        <h3>Leaderboard</h3>
        <ol style={styles.leaderboardList}>
          {leaderboard.map((player) => (
            <li
              key={player.id}
              style={player.name === user.name ? styles.currentUser : { color: "#555" }}
            >
              {player.name} - <strong>{player.points} pts</strong> {player.name === user.name ? " (You)" : ""}
            </li>
          ))}
        </ol>
      </section>

      {/* Rewards */}
      <section style={styles.section}>
        <h3>Rewards Center</h3>
        <div>
          {rewardsCatalog.map((reward) => (
            <div key={reward.id} style={styles.rewardCard}>
              <div>
                <strong>{reward.name}</strong> - <span style={{ color: "#e67e22" }}>{reward.cost} pts</span>
              </div>
              <button
                style={{ ...styles.btn, ...(user.points >= reward.cost ? styles.btnPrimary : styles.btnDisabled) }}
                onClick={() => redeemReward(reward.id)}
                disabled={user.points < reward.cost}
              >
                Redeem
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Feedback Message */}
      {message && <div style={styles.message}>{message}</div>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 900,
    margin: "30px auto",
    padding: 30,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(12px)",
    borderRadius: 20,
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    color: "#222",
    border: "1px solid rgba(255,255,255,0.3)",
  },
  title: {
    textAlign: "center",
    marginBottom: 15,
    fontWeight: "900",
    fontSize: "2.8rem",
    letterSpacing: "1.5px",
    color: "#222",
  },
  userName: {
    textAlign: "center",
    marginBottom: 40,
    fontSize: "1.4rem",
    fontWeight: "600",
    color: "#000",
  },
  pointsSection: {
    marginBottom: 40,
    textAlign: "center",
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#444",
  },
  xpBarBackground: {
    width: "100%",
    height: 25,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 15,
    overflow: "hidden",
    margin: "12px 0",
    boxShadow: "inset 0 2px 6px rgba(0,0,0,0.1)",
  },
  xpBarFill: {
    height: "100%",
    background: "linear-gradient(90deg, #27ae60, #2ecc71)",
    borderRadius: 15,
    transition: "width 0.8s ease-in-out",
    boxShadow: "0 0 12px rgba(46, 204, 113, 0.7)",
  },
  section: {
    marginBottom: 40,
  },
  badgeContainer: {
    display: "flex",
    gap: 20,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  badgeCard: {
    display: "flex",
    alignItems: "center",
    border: "2px solid rgba(255,255,255,0.3)",
    borderRadius: 15,
    padding: 18,
    width: 240,
    background: "rgba(255, 255, 255, 0.2)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
    cursor: "help",
    transition: "transform 0.2s, box-shadow 0.2s",
    backdropFilter: "blur(6px)",
  },
  badgeCardHover: {
    transform: "scale(1.05)",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  },
  badgeCircle: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    color: "#fff",
    fontWeight: "900",
    fontSize: 22,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    boxShadow: "0 0 12px rgba(0,0,0,0.2)",
    background: "linear-gradient(135deg, #2980b9, #6dd5fa)",
  },
  milestoneList: {
    listStyle: "none",
    paddingLeft: 0,
    maxWidth: 400,
    margin: "0 auto",
    fontSize: "1.1rem",
    color: "#222",
  },
  milestoneItem: {
    marginBottom: 10,
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  checkmark: {
    fontWeight: "bold",
    color: "#27ae60",
    marginLeft: 8,
    fontSize: 20,
  },
  challengeCard: {
    background: "rgba(255,255,255,0.2)",
    padding: 20,
    marginBottom: 18,
    borderRadius: 15,
    boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    border: "1px solid rgba(255,255,255,0.3)",
    backdropFilter: "blur(5px)",
  },
  btn: {
    padding: "10px 22px",
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "1rem",
    userSelect: "none",
    transition: "background-color 0.3s, box-shadow 0.3s, transform 0.2s",
  },
  btnPrimary: {
    background: "linear-gradient(135deg, #2980b9, #6dd5fa)",
    color: "#fff",
    boxShadow: "0 6px 18px rgba(41,128,185,0.4)",
  },
  btnDisabled: {
    backgroundColor: "rgba(200,200,200,0.3)",
    color: "#666",
    cursor: "not-allowed",
    boxShadow: "none",
  },
  leaderboardList: {
    listStyleType: "decimal",
    background: "rgba(255,255,255,0.15)",
    padding: 25,
    borderRadius: 15,
    boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
    maxWidth: 350,
    margin: "auto",
    fontWeight: "600",
    fontSize: "1.1rem",
    color: "#222",
    border: "1px solid rgba(255,255,255,0.3)",
    backdropFilter: "blur(6px)",
  },
  currentUser: {
    fontWeight: "bold",
    color: "#27ae60",
    fontSize: "1.2rem",
  },
  rewardCard: {
    background: "rgba(255,255,255,0.2)",
    padding: 18,
    borderRadius: 15,
    marginBottom: 18,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
    border: "1px solid rgba(255,255,255,0.25)",
    backdropFilter: "blur(5px)",
  },
  message: {
    marginTop: 25,
    backgroundColor: "rgba(46, 204, 113,0.15)",
    padding: 18,
    borderRadius: 12,
    color: "#27ae60",
    fontWeight: "700",
    textAlign: "center",
    boxShadow: "0 5px 15px rgba(46,204,113,0.25)",
  },
};
