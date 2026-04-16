import React, { useState } from 'react';
import styles from './TrophyEmulator.module.css';

const TrophyEmulator = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [trophyName, setTrophyName] = useState('First Achievement!');

  const testAchievement = () => {
    if (showNotification) return; // Prevent multiple clicks
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 4000); // Notification lasts 4 seconds
  };

  return (
    <div className={styles.container}>
      <div className={styles.emuHeader}>
        <h3>🕹️ Trophy Emulator</h3>
        <p>Click below to simulate how a Game Jolt achievement looks in-game.</p>
      </div>

      <button className={styles.testBtn} onClick={testAchievement}>
        Unlock "The First Step"
      </button>

      {/* Simulated Notification Popup */}
      <div className={`${styles.notification} ${showNotification ? styles.show : ''}`}>
        <div className={styles.iconBox}>🏆</div>
        <div className={styles.textBox}>
          <span className={styles.label}>Trophy Unlocked!</span>
          <span className={styles.name}>{trophyName}</span>
          <span className={styles.platform}>Game Jolt Game API</span>
        </div>
      </div>
    </div>
  );
};

export default TrophyEmulator;
