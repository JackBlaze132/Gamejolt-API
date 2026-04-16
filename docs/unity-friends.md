# Unity: Friends & Social Features

Learn how to integrate Game Jolt social features into your Unity game. Connect players, build friend lists, and create shared multiplayer experiences using the official Game Jolt Unity SDK.

## 📦 Prerequisites

*   **Game ID & Private Key**: Get these from your Game Jolt Dashboard.
*   **User Authentication**: Social features **require the user to be logged in**. Ensure your login system is functional.
*   **Friends Namespace**: Access everything via `GameJolt.API.Friends`.

---

## 🚀 Fetching Friends

The core of any social experience is knowing who your friends are. The `Friends.Get` method returns a list of all connections for the authenticated user.

### 📜 Implementation Guide

```csharp
using GameJolt.API;
using UnityEngine;

public class SocialManager : MonoBehaviour {
    
    public void FetchFriendsList() {
        // Fetch all friends for the currently logged-in user
        Friends.Get((User[] friends) => {
            if (friends != null) {
                foreach (var friend in friends) {
                    Debug.Log($"Friend: {friend.Name} | Status: {friend.Status}");
                    // Use friend.AvatarURL to display their profile picture
                    // Use friend.Status to check if they are Online, Away, or Offline
                }
            } else {
                Debug.Log("No friends found or user not logged in.");
            }
        });
    }
}
```

### 🔍 Friend Properties
| Property | Type | Description |
| :--- | :--- | :--- |
| `Name` | `string` | The user's unique Game Jolt handle. |
| `Status` | `string` | Current presence (Online, Away, Offline). |
| `AvatarURL` | `string`| Direct link to the user's profile icon. |

---

## 🕹️ Friends List API Emulator

Try refreshing the list below to see how a collection of friends is typically fetched and displayed. You can search to filter names, just like you would in a real in-game UI.

import FriendsListEmulator from '@site/src/components/FriendsListEmulator';

<FriendsListEmulator />

---

## 🏗️ In-Game Social Scenario: Battle Jenga

Social features come to life when they facilitate direct interaction. Let's look at a "Battle Jenga" setup where players use their friends list to start a high-stakes match.

### 🎮 The Gameplay Loop
1.  **Selection**: The player opens the "Friends List" and picks an online friend to challenge.
2.  **Interaction**: Once the session is synchronized, a Shared Tower (Jenga) appears.
3.  **Risk**: Players take turns pulling a piece. Every pull has a **33.33% chance** of causing the tower to fall!
4.  **Victor**: The last person to pull a piece without the tower falling wins the round.

### 📜 Unity implementation

In a real scenario, you'd combine `Friends.Get` with a networking solution or the `Data-Store` for turn management.

```csharp
using GameJolt.API;
using UnityEngine;

public class JengaManager : MonoBehaviour {
    private int piecesRemaining = 15;
    private bool isTowerStanding = true;

    // 1. Fetch friends to invite from real API
    public void ShowInviteList() {
        Friends.Get((User[] friends) => {
            if (friends.Length > 0) {
                // In your UI, you'd show a button for each friend
                InviteFriend(friends[0]); 
            }
        });
    }

    // 2. The High-Risk Turn Logic
    public void PullPiece() {
        if (!isTowerStanding) return;

        // 33.33% chance of falling
        float chance = Random.Range(0f, 100f);
        if (chance <= 33.33f) {
            isTowerStanding = false;
            Debug.Log("CRASH! The tower collapsed!");
            // Update Game Jolt achievements or scores for the winner
        } else {
            piecesRemaining--;
            Debug.Log($"Phew! Safe. {piecesRemaining} pieces remain.");
            // Signal the next player's turn
        }
    }

    public void InviteFriend(User friend) {
        Debug.Log($"Challenging {friend.Name} to Jenga...");
        // Real-time notification logic goes here
    }
}
```

:::warning Pro Tip
To ensure the best social experience, you can use the **Sessions** system to check if a friend is currently playing *your* game specifically before sending an invite!
:::

import JengaGameExample from '@site/src/components/JengaGameExample';
import LobbyEmulator from '@site/src/components/LobbyEmulator';

<JengaGameExample />

---

## 🏢 Advanced Scenario: The Battle Royale Lobby

Can you use the Game Jolt API to group up 100 random players, sync their wins, levels, and achievements before matching? **Absolutely!** 

While Game Jolt doesn't handle real-time physics (your game engine's job), it excels as the **"Global Source of Truth"** for discovering players and fetching their cross-session stats.

### Interactive Lobby Discovery
Click below to simulate how your game uses the **DataStore** to fetch a registry of 100 random players and sync their global stats (Wins, Level, Trophies) before the match starts.

<LobbyEmulator />

### Pro Implementation (C#)
To achieve this for a 100-player lobby, you typically use a **Global DataStore Key** as a matchmaking board. Each player "Registers" their intent to join, and every other client fetches those names.

```csharp
using UnityEngine;
using GameJolt.API;
using System.Collections.Generic;

public class LobbyManager : MonoBehaviour {
    
    // 1. Join the "Global Lobby" Registry
    public void JoinGlobalLobby(string myRoomId) {
        // We Use DataStore to 'Post' our presence for random discovery
        DataStore.Set("global_lobby_entry_" + Users.CurrentUser.Name, myRoomId, true, (bool spec) => {
            if (spec) Debug.Log("📡 Registered in Global Lobby!");
        });
    }

    // 2. Fetch and Sync Stats for 100 players
    public void SyncLobbyStats(List<string> playerUsernames) {
        foreach (string name in playerUsernames) {
            // Fetch their global stats for UI display
            DataStore.Get("total_wins", false, (string wins) => {
                Debug.Log($"📊 Synced {name}: {wins} Wins");
            });

            // Fetch their profile for Avatar/Levels
            Users.Fetch(name, (User player) => {
                Debug.Log($"👤 Fetched {player.Name} (Level {player.Type})");
            });
        }
    }
}
```

:::tip Efficiency
Fetching stats for 100 players individually creates 100+ web requests. In a real game, you should use the **[Batch API](batch-requests.md)** to bundle player lookups into groups of 50 for much faster loading!
:::

### 🛠️ Strategic Implementation: The Invitation Flow

When implementing a social game like Jenga, the sequence of API calls is critical. You don't just "start" a game; you flow from **Authentication** → **Fetching Friends** → **Inviting** → **Session Heartbeats**.

#### 1. The Friend Selection UI
In Unity, you'll need to filter your UI to only show **Online** friends to prevent dead invitations.

```csharp
using GameJolt.API;
using System.Linq;

public void PopulateFriendList() {
    Friends.Get((User[] friends) => {
        // Filter for ONLY online friends
        var onlineFriends = friends.Where(f => f.Status == "Online").ToList();
        
        foreach(var f in onlineFriends) {
            // Instantiate your UI Button here
            // button.onClick.AddListener(() => SendInvite(f));
        }
    });
}
```

#### 2. The Physics & Risk Logic
The Jenga tower is a physics-based object. In Unity, you would use **Rigidbody** components. To sync the "Risk" of falling, one player (the Master) calculates the chance and updates a shared **Data-Store** key.

```csharp
using UnityEngine;
using GameJolt.API;

public class JengaTowerManager : MonoBehaviour {
    public GameObject lastPulledBlock;
    
    public void HandleBlockPull() {
        // 33.33% chance of physics collapse
        if (Random.value < 0.3333f) {
            TriggerCollapse();
            // Optional: Log the loss to a global leaderboard
            Scores.Add(0, "FAILED", boardId); 
        } else {
            Destroy(lastPulledBlock);
            // Notify next player via Cloud Data
            DataStore.Set("current_turn", "OpponentID", true); 
        }
    }

    void TriggerCollapse() {
        // Enable physics on all tower blocks
        foreach(var rb in GetComponentsInChildren<Rigidbody>()) {
            rb.isKinematic = false; 
        }
        Debug.Log("Tower Fell! YOU DIED.");
    }
}
```

:::warning Physics Sync Tip
When playing socially, always ensure only **one** player (the turn owner) handles the physics calculations to prevent "desync" where the tower falls for one person but not the other!
:::
