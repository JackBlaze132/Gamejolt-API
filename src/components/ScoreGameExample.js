import React, { useState, useEffect, useRef } from 'react';
import styles from './ScoreGameExample.module.css';

const ScoreGameExample = () => {
  const [gameState, setGameState] = useState('idle'); // idle, playing, over
  const [currentLetter, setCurrentLetter] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const [results, setResults] = useState([]);
  
  const scoreRef = useRef(0);
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    scoreRef.current = 0;
    setTimeLeft(5);
    nextLetter();
  };

  const nextLetter = () => {
    const randomIndex = Math.floor(Math.random() * letters.length);
    setCurrentLetter(letters[randomIndex]);
  };

  const endGame = () => {
    setGameState('over');
    
    // Mock Leaderboard Data
    const mockData = [
      { name: 'SpeedTyper', score: 450 },
      { name: 'QuickFinger', score: 350 },
      { name: 'KeyboardWarrior', score: 250 },
      { name: 'Your Score', score: scoreRef.current, isPlayer: true }
    ].sort((a, b) => b.score - a.score);
    
    setResults(mockData);
  };

  useEffect(() => {
    if (gameState === 'playing') {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState !== 'playing') return;
      
      if (e.key.toUpperCase() === currentLetter) {
        setScore(prev => {
          const newScore = prev + 50;
          scoreRef.current = newScore;
          return newScore;
        });
        nextLetter();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameState, currentLetter]);

  return (
    <div className={styles.container}>
      <div className={styles.instructions}>
        ⌨️ <strong>How to Play:</strong> Press the key shown on screen. Each hit is <strong>50 points</strong>. You have <strong>5 seconds!</strong>
      </div>

      <div className={styles.canvas}>
        {gameState === 'idle' && (
          <div className={styles.overlay}>
             <button onClick={startGame} className={styles.startBtn}>Start Challenge</button>
          </div>
        )}

        {gameState === 'playing' && (
          <div className={styles.gameArea}>
            <div className={styles.timer}>Time: {timeLeft}s</div>
            <div className={styles.letterDisplay}>{currentLetter}</div>
            <div className={styles.scoreCounter}>Score: {score}</div>
          </div>
        )}

        {gameState === 'over' && (
          <div className={styles.resultsArea}>
            <h4 className={styles.resTitle}>Challenge Over!</h4>
            <div className={styles.miniBoard}>
              {results.map((res, i) => (
                <div key={i} className={`${styles.resRow} ${res.isPlayer ? styles.playerRow : ''}`}>
                  <span>#{i + 1} {res.name}</span>
                  <span>{res.score} pts</span>
                </div>
              ))}
            </div>
            <button onClick={startGame} className={styles.startBtn}>Try Again</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScoreGameExample;
