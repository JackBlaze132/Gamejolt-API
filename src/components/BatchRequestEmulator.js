import React, { useState, useEffect, useRef } from 'react';
import styles from './BatchRequestEmulator.module.css';

const BatchRequestEmulator = () => {
  const [requests, setRequests] = useState([
    { id: 1, type: '🏆 Trophy', status: 'pending', label: 'Unlock: Level 1 Clear' },
    { id: 2, type: '📜 Score', status: 'pending', label: 'Post: 15,000 Pts' },
    { id: 3, type: '📦 DataStore', status: 'pending', label: 'Update: LevelProgress' },
  ]);
  const [mode, setMode] = useState('individual'); // individual, batch
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);

  const runSimulation = async () => {
    setIsRunning(true);
    setProgress(0);
    setLogs([]);
    
    // Reset statuses
    setRequests(prev => prev.map(r => ({ ...r, status: 'pending' })));

    if (mode === 'individual') {
      for (let i = 0; i < requests.length; i++) {
        setLogs(prev => [...prev, `📡 Sending Request ${i + 1}/3...`]);
        setRequests(prev => {
          const next = [...prev];
          next[i].status = 'syncing';
          return next;
        });
        
        await new Promise(r => setTimeout(r, 1200)); // Simulate RTT
        
        setRequests(prev => {
          const next = [...prev];
          next[i].status = 'success';
          return next;
        });
        setLogs(prev => [...prev, `✅ Request ${i + 1} Success!`]);
        setProgress(((i + 1) / requests.length) * 100);
      }
    } else {
      setLogs(prev => [...prev, `⚡ Bundling 3 requests into 1 Batch...`]);
      setRequests(prev => prev.map(r => ({ ...r, status: 'syncing' })));
      
      await new Promise(r => setTimeout(r, 1500)); // One slightly longer RTT for batch
      
      setRequests(prev => prev.map(r => ({ ...r, status: 'success' })));
      setLogs(prev => [...prev, `✨ Batch Response Received (3 ops complete)`]);
      setProgress(100);
    }
    
    setIsRunning(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <div className={styles.toggleGroup}>
          <button 
            className={`${styles.toggleBtn} ${mode === 'individual' ? styles.active : ''}`}
            onClick={() => setMode('individual')}
            disabled={isRunning}
          >
            Individual Requests
          </button>
          <button 
            className={`${styles.toggleBtn} ${mode === 'batch' ? styles.active : ''}`}
            onClick={() => setMode('batch')}
            disabled={isRunning}
          >
            Batch API (Recommended)
          </button>
        </div>
        <button 
          className={styles.runBtn} 
          onClick={runSimulation} 
          disabled={isRunning}
        >
          {isRunning ? 'Syncing...' : 'Run Sync'}
        </button>
      </div>

      <div className={styles.visualizer}>
        <div className={styles.requestList}>
          {requests.map(req => (
            <div key={req.id} className={`${styles.requestItem} ${styles[req.status]}`}>
              <span className={styles.reqType}>{req.type}</span>
              <span className={styles.reqLabel}>{req.label}</span>
              <span className={styles.reqStatus}>
                {req.status === 'pending' && '🕒'}
                {req.status === 'syncing' && <span className={styles.spinner}></span>}
                {req.status === 'success' && '✅'}
              </span>
            </div>
          ))}
        </div>

        <div className={styles.trafficPanel}>
          <div className={styles.progressTrack}>
            <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
          </div>
          <div className={styles.logWindow}>
            {logs.map((log, i) => <div key={i} className={styles.logEntry}>{log}</div>)}
            {logs.length === 0 && <div className={styles.emptyLog}>Simulation ready...</div>}
          </div>
        </div>
      </div>

      <div className={styles.efficiencyTip}>
        {mode === 'individual' ? 
          "❌ 3 separate network round-trips. Total time: ~3.6s" : 
          "🔥 1 single network round-trip. Total time: ~1.5s"}
      </div>
    </div>
  );
};

export default BatchRequestEmulator;
