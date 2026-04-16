# Core Concepts: The Game Jolt Game API

The **Game Jolt Game API** (GJAPI) is a simple, REST-based API that lets you integrate your game with the Game Jolt ecosystem. Whether you're building in Unity, Game Maker, or raw JavaScript, the core principles remain the same.

## 🗝️ API Authentication (The Basics)

To interact with the API, you need two pieces of information from your [Game Dashboard](https://gamejolt.com/dashboard):

1.  **Game ID**: A unique numeric identifier for your game.
2.  **Private Key**: A secret string of characters used to verify that requests are coming from your game. **Never share this key or include it in client-side source code if possible.**

## 👤 User Operations

Most API features require a **User Identity**. When a user plays your game on Game Jolt, they are authenticated via:

*   **Username**: The user's Game Jolt username.
*   **User Token**: A special key generated for that user (different from their password).

In the Unity SDK, this is handled automatically if the user is logged into the Game Jolt Client.

## 📡 Essential Namespaces

The API is divided into several "Namespaces" based on functionality:

| Namespace | Purpose |
| :--- | :--- |
| **Users** | Get profile data and friend lists. |
| **Sessions** | Tell Game Jolt when a player is online (active). |
| **Trophies** | The "Achievements" system. Unlock awards for milestones. |
| **Scores** | Global leaderboards and score tables. |
| **Data-Store** | Cloud-based key-value storage for save games or global settings. |

---

## 🛠️ How it works (Simplified)

Requests are sent as standard HTTP/HTTPS calls. A typical request looks like this:

`https://api.gamejolt.com/api/game/v1/trophies/?game_id=YOUR_ID&signature=SIGNATURE`

Fortunately, the **Unity SDK** wraps all of this complexity into simple C# methods so you don't have to handle signatures or raw HTTP requests!

:::info What's Next?
Head over to the [Unity Achievements](./unity-achievements) guide to start implementing your first trophy!
:::
