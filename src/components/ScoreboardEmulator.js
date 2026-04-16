import React, { useState } from 'react';
import styles from './ScoreboardEmulator.module.css';

const ScoreboardEmulator = () => {
  const [scores, setScores] = useState([
    { rank: 1, user: 'PixelKing', score: '150,000 pts' },
    { rank: 2, user: 'CoderX', score: '125,500 pts' },
    { rank: 3, user: 'GameJoltFan', score: '98,200 pts' },
  ]);
  const [userScore, setUserScore] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addScore = () => {
    if (!userScore || isNaN(userScore)) return;
    setIsSubmitting(true);
    
    setTimeout(() => {
      const newScoreValue = parseInt(userScore);
      const newEntry = { rank: '?', user: 'You (Guest)', score: newScoreValue.toLocaleString() + ' pts' };
      
      // Simple logic to "insert" score for simulation
      const newScores = [...scores, newEntry].sort((a, b) => 
        parseInt(b.score.replace(/,/g, '')) - parseInt(a.score.replace(/,/g, ''))
      ).slice(0, 5);

      setScores(newScores.map((s, i) => ({ ...s, rank: i + 1 })));
      setUserScore('');
      setIsSubmitting(false);
    }, 8000); // Simulate API delay
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>📜 Global Leaderboard</h3>
        <p>Simulation of the Game Jolt Score Table</p>
      </div>

      <div className={styles.board}>
        <div className={styles.rowHeader}>
          <span>Rank</span>
          <span>User</span>
          <span>Score</span>
        </div>
        {scores.map((s) => (
          <div key={s.rank} className={styles.row}>
            <span className={styles.rank}>#{s.rank}</span>
            <span className={styles.user}>{s.user}</span>
            <span className={styles.scoreValue}>{s.score}</span>
          </div>
        ))}
      </div>

      <div className={styles.controls}>
        <input 
          type="number" 
          placeholder="Enter score..." 
          value={userScore}
          onChange={(e) => setUserScore(e.target.value)}
          className={styles.input}
        />
        <button onClick={addScore} className={styles.btn} disabled={isSubmitting}>
          {isSubmitting ? 'Uploading...' : 'Post Score'}
        </button>
      </div>
    </div>
  );
};

export default ScoreboardEmulator;
