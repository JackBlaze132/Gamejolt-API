# Batch Requests (Efficiency API)

The **Game Jolt Batch API** is a powerful tool designed to optimize your game's performance. Instead of sending multiple individual network requests, you can bundle them into a single HTTP call.

## 📦 Why use Batching?

*   **Minimized Latency**: 1 network round-trip instead of 3, 5, or 10.
*   **Reduced Overhead**: Each HTTP request carries headers and SSL handshakes; batching eliminates this repetitive cost.
*   **Atomic-like Behavior**: Use the `break_on_error` parameter to ensure that a sequence of operations stops if one part fails.

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `parallel` | `bool` | `false` | Process all sub-requests at the same time. |
| `break_on_error` | `bool` | `false` | Stop execution if any sub-request fails. |
| `requests` | `array` | `[]` | A maximum of **50 sub-requests** per call. |

---

## 🚀 Unity Implementation

Batching is controlled via the `GameJolt.API.Batch` namespace. You essentially "queue" requests, which the SDK then bundles.

### Standard Batch Loop

```csharp
using GameJolt.API;
using UnityEngine;

public void SyncGameProgress() {
    // 1. Enter Batch Mode
    // Requests called while in Batch mode will not be sent immediately.
    // They are queued instead.
    
    // Note: The specific implementation can vary by SDK version,
    // but the concept remains the same:
    
    // Example: Bundling 3 requests
    // [Start Batching]
    Trophies.Unlock(12345);
    Scores.Add(5000, "5,000 Points");
    DataStore.Set("last_sync", System.DateTime.Now.ToString(), false);
    // [End Batching and Send]
}
```

:::warning Pro Tip
Never bundle more than **50 requests** in a single batch. For most games, bundling 3-5 requests at key milestones (level end, game start, login) is the "sweet spot" for performance.
:::

---

## 🕹️ Batch Request Emulator

Compare the visual difference between sending requests individually versus using the Batch API. Notice how the Batch API completes multiple operations in roughly the same time as a single individual request.

import BatchRequestEmulator from '@site/src/components/BatchRequestEmulator';
import PaniniBatchExample from '@site/src/components/PaniniBatchExample';

<BatchRequestEmulator />

---

## 🏗️ In-Game Scenario: Panini Master (Perfect Order)

When a player builds the perfect Panini, the game needs to sync three separate API operations: **Achievement (Panini Master)**, **Global High Score**, and **Cloud DataStore Log**.

### Interactive Scenario
Display the order correctly on the left and build your Panini layer-by-layer on the right. Notice how at the end, the **Batch API** sends all three updates in a single efficient bundle.

<PaniniBatchExample />

### Implementation Pattern (C#)
To recreate the **Panini Master** sync behavior in Unity, use the `GameJolt.API.Batch` namespace to bundle your operations. Using `break_on_error: true` ensures that if one part of the panini sync fails (e.g., the score), the rest of the progress isn't incorrectly logged.

```csharp
using UnityEngine;
using GameJolt.API;
using GameJolt.API.Objects;

public class PaniniManager : MonoBehaviour {
    
    // Call this when the player finishes the 5-ingredient sandwich
    public void SyncPaniniCompletion(int finalScore, string ingredientLog) {
        Debug.Log("📦 Opening Batch Request...");

        // 1. Initialize the Batch
        // Note: The specific syntax below follows the official Game Jolt Unity SDK pattern
        // for bundling multiple disparate requests into one.
        
        GameJolt.API.Batch.Send(() => {
            // A. UNLOCK ACHIEVEMENT: "Panini Master"
            Trophies.Unlock(78910, (bool success) => {
                if (success) Debug.Log("🏆 Trophy queued!");
            });

            // B. POST SCORE: to the "Global Panini" Leaderboard
            // Table ID 12345
            Scores.Add(finalScore, finalScore + " Points", 12345, (bool success) => {
                if (success) Debug.Log("📜 Score queued!");
            });

            // C. CLOUD DATA: Log the specific recipe for player history
            DataStore.Set("last_panini_recipe", ingredientLog, false, (bool success) => {
                if (success) Debug.Log("☁️ DataStore queued!");
            });

        }, (BatchResponse response) => {
            // This callback runs only once after ALL bundled requests return!
            if (response.Success) {
                Debug.Log("✅ Batch Complete! 1 request sent instead of 3.");
            } else {
                Debug.LogError("❌ Batch failed or partially failed.");
            }
        }, parallel: false, break_on_error: true);
    }
}
```

:::tip Why this is better
In the **Interactive Scenario** above, notice how the "Syncing" log shows all three items processing under one "📡 Sending Batch Request" header. Without batching, your Unity console would show three separate, slower web-requests being sent sequentially.
:::

:::info Parallel vs Sequential
Use **Parallel** (true) when you just want speed and doesn't matter which one finishes first. Use **Sequential** (false) when the order matters or you are using `break_on_error`.
:::
