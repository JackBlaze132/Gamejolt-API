import React, { useState, useEffect } from 'react';
import styles from './FriendsListEmulator.module.css';

const FriendsListEmulator = () => {
  const [friends, setFriends] = useState([
    { id: 101, name: 'GameDev_King', status: 'Online', avatar: '👑' },
    { id: 102, name: 'PixelArtist_99', status: 'Away', avatar: '🎨' },
    { id: 103, name: 'SpeedRunner_Pro', status: 'Offline', avatar: '👟' },
  ]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const refreshFriends = () => {
    setIsLoading(true);
    setTimeout(() => {
        // Simulate a new friend being added/coming online
        const newFriend = { id: 104, name: 'New_Challenger', status: 'Online', avatar: '🎮' };
        if (!friends.find(f => f.id === 104)) {
            setFriends(prev => [...prev, newFriend]);
        }
        setIsLoading(false);
    }, 800);
  };

  const filteredFriends = friends.filter(f => 
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>🤝 Friends List API Emulator</h3>
        <button onClick={refreshFriends} className={styles.refreshBtn} disabled={isLoading}>
          {isLoading ? '...' : '🔄 Refresh'}
        </button>
      </div>

      <input 
        type="text" 
        placeholder="Search friends..." 
        className={styles.searchInput}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className={styles.list}>
        {filteredFriends.length > 0 ? (
          filteredFriends.map(friend => (
            <div key={friend.id} className={styles.friendRow}>
              <div className={styles.avatar}>{friend.avatar}</div>
              <div className={styles.info}>
                <span className={styles.name}>{friend.name}</span>
                <span className={`${styles.status} ${styles[friend.status.toLowerCase()]}`}>
                  {friend.status}
                </span>
              </div>
              <button className={styles.inviteBtn}>Invite</button>
            </div>
          ))
        ) : (
          <p className={styles.empty}>No friends found.</p>
        )}
      </div>

      <div className={styles.footer}>
        <p>Total Friends: {friends.length}</p>
      </div>
    </div>
  );
};

export default FriendsListEmulator;
