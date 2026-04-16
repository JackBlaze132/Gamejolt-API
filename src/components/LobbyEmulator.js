import React, { useState, useEffect } from 'react';
import styles from './LobbyEmulator.module.css';

const LobbyEmulator = () => {
    const [lobbyPlayers, setLobbyPlayers] = useState([]);
    const [isJoining, setIsJoining] = useState(false);
    const [syncLog, setSyncLog] = useState([]);

    const mockPlayers = [
        { name: 'JackBlaze', level: 45, wins: 12, status: 'Ready' },
        { name: 'CinderBlock', level: 12, wins: 2, status: 'Ready' },
        { name: 'NeonKnight', level: 89, wins: 54, status: 'Ready' },
        { name: 'PixelMist', level: 23, wins: 5, status: 'Ready' }
    ];

    const joinLobby = () => {
        setIsJoining(true);
        setSyncLog(['📡 Calling User.Fetch(self)...', '☁️ Fetching DataStore "global_lobby"...']);
        
        setTimeout(() => {
            setSyncLog(prev => [...prev, '📜 Downloading win/loss stats for 4 players...', '🏆 Checking mutual achievements...']);
            setTimeout(() => {
                setLobbyPlayers([...mockPlayers, { name: 'YOU', level: 1, wins: 0, status: 'Ready', isPlayer: true }]);
                setSyncLog(prev => [...prev, '✅ Data In Sync: Syncing 5/100 players']);
                setIsJoining(false);
            }, 1000);
        }, 1000);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3>🏢 GJ Battle Royale Lobby (Discovery)</h3>
                <p>Simulating <strong>DataStore</strong> usage to discover 100 random players and sync their stats.</p>
            </div>

            <div className={styles.canvas}>
                {lobbyPlayers.length === 0 && !isJoining && (
                    <div className={styles.overlay}>
                        <button onClick={joinLobby} className={styles.joinBtn}>Join Random Lobby</button>
                    </div>
                )}

                {isJoining && (
                    <div className={styles.loadingArea}>
                        <div className={styles.spinner}></div>
                        <div className={styles.log}>
                            {syncLog.map((line, i) => <div key={i}>{line}</div>)}
                        </div>
                    </div>
                )}

                {lobbyPlayers.length > 0 && !isJoining && (
                    <div className={styles.lobbyList}>
                        <div className={styles.lobbyStats}>
                            <span>Players: {lobbyPlayers.length}/100</span>
                            <span>Region: Global</span>
                        </div>
                        <div className={styles.playerGrid}>
                            {lobbyPlayers.map((p, i) => (
                                <div key={i} className={`${styles.playerCard} ${p.isPlayer ? styles.player : ''}`}>
                                    <div className={styles.avatar}>{p.name[0]}</div>
                                    <div className={styles.info}>
                                        <span className={styles.name}>{p.name}</span>
                                        <span className={styles.details}>Lvl {p.level} | Wins: {p.wins}</span>
                                    </div>
                                    <div className={styles.statusBadge}>{p.status}</div>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => setLobbyPlayers([])} className={styles.leaveBtn}>Leave Lobby</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LobbyEmulator;
