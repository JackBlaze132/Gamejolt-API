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
