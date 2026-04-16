import React, { useState, useEffect, useRef } from 'react';
import styles from './PaniniBatchExample.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';

const PaniniBatchExample = () => {
  const [gameState, setGameState] = useState('start'); // start, playing, syncing, result
  const [currentOrder, setCurrentOrder] = useState([]);
  const [builtPanini, setBuiltPanini] = useState([]);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [syncStatus, setSyncStatus] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [results, setResults] = useState([]);

  const audioRef = useRef(null);
  const notificationSound = useBaseUrl('/sfx/notification.mp3');

  const ingredients = [
    { id: 'bread', name: '🥖 Bread', color: '#f5deb3' },
    { id: 'ham', name: '🥩 Ham', color: '#ffb6c1' },
    { id: 'cheese', name: '🧀 Cheese', color: '#ffd700' },
    { id: 'tomato', name: '🍅 Tomato', color: '#ff6347' },
    { id: 'lettuce', name: '🥬 Lettuce', color: '#90ee90' },
  ];

  const startLevel = () => {
    // Generate a random order of 5 ingredients
    const newOrder = ['bread', ...Array(3).fill(null).map(() => ingredients[Math.floor(Math.random() * (ingredients.length - 1)) + 1].id), 'bread'];
    setCurrentOrder(newOrder);
    setBuiltPanini([]);
    setScore(0);
    setTime(0);
    setGameState('playing');
    setIsActive(true);
    setShowNotification(false);
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time + 0.1);
      }, 100);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const addIngredient = (ingId) => {
    if (gameState !== 'playing') return;

    const nextRequired = currentOrder[builtPanini.length];
    
    if (ingId === nextRequired) {
      const newPanini = [...builtPanini, ingId];
      setBuiltPanini(newPanini);
      setScore(prev => prev + 10);
      
      if (newPanini.length === currentOrder.length) {
        completeLevel();
      }
    } else {
      setScore(prev => Math.max(0, prev - 7));
    }
  };

  const completeLevel = () => {
    setIsActive(false);
    setGameState('syncing');
    
    const timeBonus = Math.round(100 / Math.max(1, time));
    const finalScore = score + timeBonus;

    // Simulate Batching multiple API calls
    setSyncStatus(['📦 Bundling Data...', '📡 Sending Batch Request...']);
    
    setTimeout(() => {
      // Achievement Unlock with Sound
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      setShowNotification(true);
      setSyncStatus(prev => [...prev, '🏆 Trophy Unlocked: Panini Master!']);
      
      setTimeout(() => {
        setSyncStatus(prev => [...prev, `📜 Score Posted: ${finalScore} pts`]);
        setTimeout(() => {
          setSyncStatus(prev => [...prev, '✅ Cloud Sync: Order Logged']);
          setTimeout(() => {
            // Prepare Leaderboard Results
            const mockData = [
              { name: 'PaniniPro', score: finalScore + 50 },
              { name: 'DeliKing', score: finalScore + 20 },
              { name: 'You (Panini Master)', score: finalScore, isPlayer: true },
              { name: 'BreadLover', score: finalScore - 15 },
              { name: 'CheesyCoder', score: finalScore - 30 }
            ].sort((a, b) => b.score - a.score);
            
            setResults(mockData);
            setGameState('result');
            setScore(finalScore);
          }, 1000);
        }, 800);
      }, 800);
    }, 1200);
  };

  return (
    <div className={styles.container}>
      <div className={styles.instructions}>
        🥖 <strong>Batch Scenario:</strong> Building a Panini requires multiple API syncs: Achievement, Score, and DataStore entries.
      </div>

      <div className={styles.canvas}>
        <audio ref={audioRef} src={notificationSound} preload="auto" />

        {/* Global Trophy Notification (matches TrophyEmulator) */}
        <div className={`${styles.notification} ${showNotification ? styles.show : ''}`}>
          <div className={styles.iconBox}>🏆</div>
          <div className={styles.textBox}>
            <span className={styles.label}>Trophy Unlocked!</span>
            <span className={styles.name}>Panini Master</span>
            <span className={styles.platform}>Game Jolt Game API</span>
          </div>
        </div>

        {gameState === 'start' && (
          <div className={styles.overlay}>
            <button onClick={startLevel} className={styles.playBtn}>Start Panini Level</button>
          </div>
        )}

        {gameState === 'playing' && (
          <div className={styles.gameLayout}>
            <div className={styles.sidebar}>
              <h4>📋 Order</h4>
              <div className={styles.orderList}>
                {currentOrder.map((id, i) => (
                  <div key={i} className={`${styles.orderItem} ${builtPanini.length > i ? styles.done : ''}`}>
                    {ingredients.find(ing => ing.id === id).name}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.mainStage}>
              <div className={styles.hud}>
                <span>Time: {time.toFixed(1)}s</span>
                <span>Score: {score}</span>
              </div>
              <div className={styles.paniniDisplay}>
                {builtPanini.map((id, i) => (
                  <div 
                    key={i} 
                    className={styles.breadLayer} 
                    style={{ backgroundColor: ingredients.find(ing => ing.id === id).color, bottom: `${i * 15}px` }}
                  >
                    {ingredients.find(ing => ing.id === id).name}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.bottomBar}>
              {ingredients.map(ing => (
                <button 
                  key={ing.id} 
                  onClick={() => addIngredient(ing.id)}
                  className={styles.ingBtn}
                >
                  {ing.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {gameState === 'syncing' && (
          <div className={styles.syncOverlay}>
            <h3>⚡ Processing Batch API Request...</h3>
            <div className={styles.syncLog}>
              {syncStatus.map((s, i) => <div key={i} className={styles.logLine}>{s}</div>)}
            </div>
            <div className={styles.batchVisual}>
               <div className={styles.batchIcon}>📦</div>
               <div className={styles.arrow}>➡️</div>
               <div className={styles.serverIcon}>☁️</div>
            </div>
          </div>
        )}

        {gameState === 'result' && (
          <div className={styles.resultsArea}>
            <h2 className={styles.winTitle}>Panini Complete!</h2>
            
            <div className={styles.leaderboardContainer}>
               <h4 className={styles.boardTitle}>🏆 Global Leaderboard</h4>
               <div className={styles.miniBoard}>
                  {results.map((res, i) => (
                    <div key={i} className={`${styles.resRow} ${res.isPlayer ? styles.playerRow : ''}`}>
                      <span className={styles.rank}>#{i + 1}</span>
                      <span className={styles.userName}>{res.name}</span>
                      <span className={styles.scoreVal}>{res.score} pts</span>
                    </div>
                  ))}
               </div>
            </div>

            <div className={styles.finalStats}>
               <p>Final Score: <strong>{score}</strong> | Time: <strong>{time.toFixed(1)}s</strong></p>
            </div>
            
            <button onClick={startLevel} className={styles.playBtn}>Try Again</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaniniBatchExample;
