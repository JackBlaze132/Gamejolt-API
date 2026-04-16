import React, { useState, useEffect, useRef } from 'react';
import styles from './InGameExample.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';

const InGameExample = () => {
  const [playerPos, setPlayerPos] = useState(150);
  const [enemyPos, setEnemyPos] = useState(50);
  const [enemyHealth, setEnemyHealth] = useState(1);
  const [isAttacking, setIsAttacking] = useState(false);
  const [showTrophy, setShowTrophy] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  
  const audioRef = useRef(null);
  const notificationSound = useBaseUrl('/sfx/notification.mp3');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isGameOver) return;
      
      if (e.key === 'ArrowLeft' || e.key === 'a') {
        setPlayerPos(prev => Math.max(0, prev - 10));
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        setPlayerPos(prev => Math.min(270, prev + 10));
      } else if (e.key === 'f') {
        attack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerPos, isGameOver]);

  const attack = () => {
    if (isAttacking) return;
    setIsAttacking(true);
    
    // Check collision
    const distance = Math.abs(playerPos - enemyPos);
    if (distance < 30 && enemyHealth > 0) {
      setEnemyHealth(0);
      triggerAchievement();
    }

    setTimeout(() => setIsAttacking(false), 300);
  };

  const triggerAchievement = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
    setShowTrophy(true);
    setIsGameOver(true);
    setTimeout(() => setShowTrophy(false), 4000);
  };

  const reset = () => {
    setPlayerPos(150);
    setEnemyHealth(1);
    setIsGameOver(false);
    setShowTrophy(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.controlsHint}>
        ⌨️ <strong>Controls:</strong> <span className={styles.key}>WASD / Arrows</span> to Move | <span className={styles.key}>F</span> to Attack
      </div>

      <div className={styles.canvas}>
        {/* Player */}
        <div 
          className={`${styles.sprite} ${styles.player} ${isAttacking ? styles.attacking : ''}`}
          style={{ left: `${playerPos}px` }}
        >
          {isAttacking ? '⚔️' : '🧑‍🚀'}
        </div>

        {/* Enemy */}
        {enemyHealth > 0 && (
          <div 
            className={`${styles.sprite} ${styles.enemy}`}
            style={{ left: `${enemyPos}px` }}
          >
            👾
          </div>
        )}

        {/* Floor */}
        <div className={styles.floor} />

        {/* Trophy Notification */}
        <div className={`${styles.notification} ${showTrophy ? styles.show : ''}`}>
          <div className={styles.iconBox}>🏆</div>
          <div className={styles.textBox}>
            <span className={styles.label}>Trophy Unlocked!</span>
            <span className={styles.name}>Defeat Mr. Enemy</span>
          </div>
        </div>

        {isGameOver && (
          <div className={styles.overlay}>
            <p>MR. ENEMY DEFEATED!</p>
            <button onClick={reset} className={styles.resetBtn}>Respawn</button>
          </div>
        )}
      </div>

      <audio ref={audioRef} src={notificationSound} preload="auto" />
    </div>
  );
};

export default InGameExample;
