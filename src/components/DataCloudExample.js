import React, { useState, useEffect } from 'react';
import styles from './DataCloudExample.module.css';

const DataCloudExample = () => {
  const [gameState, setGameState] = useState('login'); // login, lobby, options
  const [theme, setTheme] = useState('Dark');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const mockLogin = () => {
    setIsLoading(true);
    setStatus('📡 Fetching User cloud data...');
    setTimeout(() => {
      // Mock data fetched from Game Jolt DataStore
      setTheme('Cyber'); 
      setGameState('lobby');
      setIsLoading(false);
      setStatus('✅ Settings Loaded from Cloud!');
    }, 1500);
  };

  const saveTheme = (newTheme) => {
    setTheme(newTheme);
    setStatus(`💾 Saving "${newTheme}" to Data-Store...`);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStatus('✨ Cloud Sync Complete!');
      setTimeout(() => setStatus(''), 2000);
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.instructions}>
        📦 <strong>Scenario:</strong> Cloud-Synced Game Settings. Change the theme and watch it "save" to the Game Jolt Data-Store!
      </div>

      <div className={`${styles.canvas} ${styles['theme' + theme]}`}>
        {gameState === 'login' && (
          <div className={styles.overlay}>
             <h3 className={styles.title}>Game Launcher</h3>
             <button onClick={mockLogin} className={styles.btn} disabled={isLoading}>
                {isLoading ? 'Syncing...' : 'Log In & Sync Data'}
             </button>
             {status && <p className={styles.status}>{status}</p>}
          </div>
        )}

        {gameState === 'lobby' && (
          <div className={styles.gameArea}>
            <div className={styles.header}>
              <span className={styles.userBadge}>👤 Player_One</span>
              <span className={styles.cloudBadge}>☁️ Connected</span>
            </div>
            
            <div className={styles.mainContent}>
              <h4 className={styles.subTitle}>User Preferences</h4>
              <div className={styles.themePicker}>
                {['Dark', 'Cyber', 'Neon'].map(t => (
                  <button 
                    key={t}
                    onClick={() => saveTheme(t)}
                    className={`${styles.themeBtn} ${theme === t ? styles.active : ''}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <p className={styles.previewText}>Current UI Theme: <strong>{theme}</strong></p>
            </div>

            <div className={styles.footer}>
              {status && <p className={styles.statusLine}>{status}</p>}
            </div>
            
            <button onClick={() => setGameState('login')} className={styles.logoutBtn}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataCloudExample;
