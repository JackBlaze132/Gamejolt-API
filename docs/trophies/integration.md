---
sidebar_label: "🪢 Integration"
---

# Trophies API (Achievements)

Learn how to integrate Game Jolt Trophies (Achievements) into your Unity game using the official Game Jolt Unity SDK.

## 📦 Prerequisites

1. **Game ID & Private Key**: Get these from your Game Jolt Dashboard under **Game API > Settings**.
2. **Download SDK**: Get the official Unity SDK from [Game Jolt API Libraries](https://gamejolt.com/game-api/doc/libraries).

## 🚀 Initialization

Before calling any trophy functions, you must initialize the API.

```csharp
using GameJolt.API;

public void Start() {
    GameJolt.API.Core.Init(your_game_id, "your_private_key", (bool success) => {
        if (success) {
            Debug.Log("Game Jolt API initialized!");
        }
    });
}
```

## 🏆 Unlocking Trophies

To unlock a trophy, use the `Trophies.Unlock` method. The user **must be logged in** for this to work.

### Parameters
| Name | Type | Description |
| :--- | :--- | :--- |
| `trophyId` | `int` | The unique ID of the trophy from your dashboard. |
| `callback` | `Action<bool>` | Called when the request completes. |

### Example implementation

```csharp
using GameJolt.API;

public void AwardTrophy(int id) {
    Trophies.Unlock(id, (bool success) => {
        if (success) {
            Debug.Log("Trophy Unlocked!");
        } else {
            Debug.LogError("Error unlocking trophy. Is the user logged in?");
        }
    });
}
```

## 🔍 Fetching Trophies

You can also fetch a list of all trophies to display them in your own custom UI.

```csharp
Trophies.Get((Trophy[] trophies) => {
    if (trophies != null) {
        foreach (var trophy in trophies) {
            Debug.Log(trophy.Title + " - " + (trophy.Unlocked ? "Unlocked" : "Locked"));
        }
    }
});
```

:::tip Pro Tip
Use the **Trophy Emulator** below to see how this looks in a live environment!
:::

import TrophyEmulator from '@site/src/components/TrophyEmulator';

<TrophyEmulator />

---

## 🎮 In-Game Practical Scenario

Let's look at a real-world example: unlocking a trophy when a player defeats a specific enemy. This scenario demonstrates the common "Milestone" pattern: checking for a condition (enemy death) and then triggering the API call.

### The Objective
*   **Condition**: The player reduces an enemy's health to 0.
*   **Action**: Call `Trophies.Unlock` with the specific Trophy ID for "Defeat Mr. Enemy".
*   **Feedback**: The user sees the Game Jolt achievement notification instantly.

### Recreate the Scenario (C#)

```csharp
using UnityEngine;
using GameJolt.API;

public class EnemyController : MonoBehaviour {
    public int trophyId = 12345; // The ID for "Defeat Mr. Enemy"
    public int health = 1;

    public void TakeDamage(int amount) {
        health -= amount;
        if (health <= 0) {
            Die();
        }
    }

    private void Die() {
        Debug.Log("Mr. Enemy has been defeated!");
        
        // Trigger the Game Jolt Achievement
        Trophies.Unlock(trophyId, (bool success) => {
            if (success) {
                Debug.Log("Achievement 'Defeat Mr. Enemy' granted!");
            }
        });

        Destroy(gameObject); // Remove enemy from the game world
    }
}
```

### Try it Yourself
Move the player with **WASD** or **Arrows**, and press **F** to attack Mr. Enemy when you are close!

import InGameExample from '@site/src/components/InGameExample';

<InGameExample />
