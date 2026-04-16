import React, { useState, useEffect } from 'react';
import styles from './JengaGameExample.module.css';

const JengaGameExample = () => {
  const [gameState, setGameState] = useState('invite'); // invite, friends, playing, won
  const [turn, setTurn] = useState(1); // 1 or 2
  const [pieces, setPieces] = useState(15);
  const [winner, setWinner] = useState(null);
  const [message, setMessage] = useState('');
  const [shaking, setShaking] = useState(false);
  const [falling, setFalling] = useState(false);

  const friends = [
    { name: 'PixelMaster', status: 'Online', avatar: '🎮' },
    { name: 'ShadowLink', status: 'Offline', avatar: '👤' },
    { name: 'UltraGamer', status: 'Online', avatar: '🔥' },
    { name: 'CodeWizard', status: 'Away', avatar: '🧙' },
  ];

  const openFriendList = () => {
    setGameState('friends');
  };

  const inviteFriend = (friend) => {
    if (friend.status !== 'Online') return;
    
    setMessage(`Inviting ${friend.name}...`);
    setTimeout(() => {
      setMessage('Match Accepted! Building Tower...');
      setTimeout(() => {
        setGameState('playing');
        setMessage('');
        setPieces(15);
        setTurn(1);
        setFalling(false);
      }, 1500);
    }, 1000);
  };

  const pullPiece = () => {
    if (gameState !== 'playing' || falling) return;

    setShaking(true);
    setTimeout(() => {
      setShaking(false);
      const fallChance = Math.random();
      
      if (fallChance < 0.3333) {
        setFalling(true);
        setTimeout(() => {
          const luckyWinner = turn === 1 ? 2 : 1;
          setWinner(luckyWinner);
          setGameState('won');
        }, 800);
      } else {
        setPieces(prev => prev - 1);
        setTurn(prev => (prev === 1 ? 2 : 1));
      }
    }, 400);
  };

  return (
    <div className={styles.container}>
      <div className={styles.instructions}>
        🏗️ <strong>Unity Scenario:</strong> Interactive Social Invitation & Physics Challenge
      </div>

      <div className={styles.canvas}>
        {gameState === 'invite' && (
          <div className={styles.overlay}>
            <button onClick={openFriendList} className={styles.startBtn}>
              Challenge a Friend
            </button>
          </div>
        )}

        {gameState === 'friends' && (
          <div className={styles.friendsOverlay}>
            <h4 className={styles.modalTitle}>Choose an Online Friend</h4>
            <div className={styles.friendsGrid}>
              {friends.map((f, i) => (
                <div 
                  key={i} 
                  className={`${styles.friendCard} ${f.status !== 'Online' ? styles.disabled : ''}`}
                  onClick={() => inviteFriend(f)}
                >
                  <span className={styles.avatar}>{f.avatar}</span>
                  <span className={styles.fName}>{f.name}</span>
                  <span className={`${styles.fStatus} ${styles[f.status.toLowerCase()]}`}>{f.status}</span>
                </div>
              ))}
            </div>
            {message && <p className={styles.statusMsg}>{message}</p>}
            {!message && <button onClick={() => setGameState('invite')} className={styles.backBtn}>Back</button>}
          </div>
        )}

        {gameState === 'playing' && (
          <div className={styles.gameArea}>
            <div className={styles.stats}>
              <div className={`${styles.playerIndicator} ${turn === 1 ? styles.active : ''}`}>You</div>
               <div className={styles.towerInfo}>Height: {pieces} Layers</div>
              <div className={`${styles.playerIndicator} ${turn === 2 ? styles.active : ''}`}>Opponent</div>
            </div>
            
            <div className={`${styles.towerVisual} ${shaking ? styles.shake : ''} ${falling ? styles.fall : ''}`}>
              {[...Array(Math.ceil(pieces / 3))].map((_, layerIndex) => (
                <div 
                  key={layerIndex} 
                  className={`${styles.layer} ${layerIndex % 2 === 0 ? styles.horizontal : styles.vertical}`}
                  style={{ zIndex: 50 - layerIndex }}
                >
                  {[...Array(3)].map((_, blockIndex) => {
                    const blockId = layerIndex * 3 + blockIndex;
                    if (blockId >= pieces) return null;
                    return (
                      <div key={blockIndex} className={styles.brick}>
                        <div className={styles.grain}></div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            <button onClick={pullPiece} className={styles.pullBtn} disabled={falling}>
              {falling ? 'COLLAPSING!' : `Pull Block (Player ${turn})`}
            </button>
          </div>
        )}

        {gameState === 'won' && (
          <div className={styles.resultsArea}>
            <h2 className={styles.winTitle}>🏆 {winner === 1 ? 'YOU WON!' : 'FRIEND WON!'}</h2>
            <p className={styles.winText}>{winner === 1 ? 'Your friend toppled the tower!' : 'The tower fell on your turn...'}</p>
            <button onClick={() => setGameState('invite')} className={styles.startBtn}>
              Rematch?
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JengaGameExample;
