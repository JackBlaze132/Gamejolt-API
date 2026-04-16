# Cloud Data Storage (Save Games)

The **Game Jolt Data-Store** is a cloud-based key-value system that allows you to store and retrieve data for your game. Perfect for:

*   **Cloud Saves**: Store players' character level or progress.
*   **Global Settings**: Store collective global variables like total kills across all players.
*   **Encrypted Payloads**: Securely store sensitive game data.

## 📦 Key Concepts

| Term | Purpose |
| :--- | :--- |
| **Key** | The name of the data (e.g., `last_level`). |
| **Value** | The data itself (e.g., `boss_fight`). |
| **Scope** | **Global** (visible to all users) or **User** (visible only to a single logged-in user). |

## 🚀 Unity SDK Implementation

In the Unity SDK, data storage is handled via the `DataStore` class.

### Saving Data (Set)

```csharp
using GameJolt.API;

public void SaveProgress(string currentLevel) {
    // If global is false, it saves to the CURRENT user
    DataStore.Set("last_level", currentLevel, false, (bool success) => {
        if (success) {
            Debug.Log("Game saved in the cloud!");
        }
    });
}
```

### Retrieving Data (Get)

```csharp
using GameJolt.API;

public void LoadProgress() {
    DataStore.Get("last_level", false, (string value) => {
        if (value != null) {
            Debug.Log("Fetched save: " + value);
        } else {
            Debug.Log("No save found for this user.");
        }
    });
}
```

### Deleting Data (Update/Remove)

```csharp
DataStore.Delete("last_level", false, (bool success) => {
    if (success) Debug.Log("Save deleted.");
});
```

:::warning Pro Tip
The maximum size of a single data entry is **16MB**. Always try to compress your JSON payloads or keep your cloud-stored data minimal for performance!
:::

---

## 🏗️ Cloud Settings Scenario

In this scenario, we use the **Data-Store** to synchronize user preferences, such as a "UI Theme," across their account. This ensures that no matter where the user logs in, their game experience remains consistent.

### 🎮 The Implementation Scenario

When the player logs in, the game sends a `DataStore.Get` request to find their saved theme. If found, it instantly applies the "Cyber" or "Neon" look to the interface. Every time a theme is updated, a `DataStore.Set` call pushes the new preference to the cloud!

import DataCloudExample from '@site/src/components/DataCloudExample';

<DataCloudExample />

### 🚀 Technical Implementation (Unity)

To recreate this settings sync in your Unity project, use the following `CloudSettingsManager` pattern:

```csharp
using GameJolt.API;
using UnityEngine;

public class CloudSettingsManager : MonoBehaviour {
    
    // 1. Fetch settings on startup
    public void LoadUserSettings() {
        // Fetch "current_theme" for the logged-in user (global=false)
        DataStore.Get("current_theme", false, (string themeValue) => {
            if (themeValue != null) {
                Debug.Log($"Applying theme: {themeValue}");
                ApplyTheme(themeValue);
            } else {
                Debug.Log("No theme saved. Using default.");
            }
        });
    }

    // 2. Save settings when changed
    public void UpdateTheme(string newTheme) {
        DataStore.Set("current_theme", newTheme, false, (bool success) => {
            if (success) {
                Debug.Log("Theme synced to cloud!");
            }
        });
    }

    void ApplyTheme(string theme) {
        // Logic to update your UI colors
    }
}
```

