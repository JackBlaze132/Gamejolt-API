import React, { useState, useRef } from 'react';
import styles from './TrophyEmulator.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';

const TrophyEmulator = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [trophyName, setTrophyName] = useState('First Achievement!');
  const audioRef = useRef(null);
  const notificationSound = useBaseUrl('/sfx/notification.mp3');

  const testAchievement = () => {
    if (showNotification) return; // Prevent multiple clicks
    
    // Play notification sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }

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

      {/* Audio Element */}
      <audio ref={audioRef} src={notificationSound} preload="auto" />

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
