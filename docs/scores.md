# Leaderboards (Scores)

The **Game Jolt Score API** allows you to add multiple online score tables (scoreboards) to your game. This keeps players engaged as they compete for the top spots on global or level-specific rankings.

## 📦 What are Score Tables?

A **Table** is a collection of scores. You can have multiple tables per game (e.g., "Standard Mode", "Endless Hub", "Level 1 Speedrun").

### Key Components

*   **Score**: The actual string that will be displayed in the list (e.g., `"150,000 Points"`, `"01:23:45"`).
*   **Sort Value**: The numeric value used to actually sort the table (e.g., `150000`, `83450`).
*   **Table ID**: Each table in your dashboard has a unique ID used for organizing scores.

---

## 🚀 Unity Implementation

Scores are managed using the `Scores` class.

### Adding a Score

When adding a score, the user **does not** need to be logged in (you can provide a guest name), but if they are logged in, their profile will be linked automatically.

```csharp
using GameJolt.API;

public void SubmitScore(int scoreValue) {
    string scoreText = scoreValue.ToString("N0") + " Points";
    int tableId = 0; // Use 0 for your primary/default table

    Scores.Add(scoreValue, scoreText, tableId, "", (bool success) => {
        if (success) {
            Debug.Log("Score submitted successfully!");
        } else {
            Debug.LogError("Error submitting score.");
        }
    });
}
```

### Fetching Scores

You can fetch the top scores from a table to display your own in-game leaderboard.

```csharp
using GameJolt.API;

public void ShowTopScores() {
    int tableId = 0;
    int limit = 10;

    Scores.Get((Score[] scores) => {
        if (scores != null) {
            foreach (var s in scores) {
                Debug.Log(s.Rank + ". " + s.PlayerName + " - " + s.Text);
            }
        }
    }, tableId, limit);
}
```

---

## 🕹️ Interactive Scoreboard Emulator

Try entering a score below to see how it would be added and sorted on a Game Jolt leaderboard. This simulation mimics the API's behavior where users are ranked globally based on their numeric sort value.

import ScoreboardEmulator from '@site/src/components/ScoreboardEmulator';

<ScoreboardEmulator />

:::tip Implementation Tip
For better performance, use **Batch Calls** if you need to fetch multiple tables at once. It reduces the number of HTTP requests and speeds up your game's menu load time.
:::

:::info Next Step
Now that you have your leaderboards setup, check out [Users & Profiles](./user-operations) to learn how to fetch user avatars and friend stats for your UI!
:::
