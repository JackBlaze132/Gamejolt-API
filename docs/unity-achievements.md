# Unity Achievements API

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
