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

---

## 🏎️ In-Game Scoring Scenario: The Quick Reaction Test

Implementing scoreboards is not just about sending numbers; it's about creating engagement. Let's look at a "Reaction Test" scenario where every correct input counts toward a global ranking.

### The Objective
*   **Gameplay Loop**: A random letter appears on the screen. The player must press the matching key as fast as possible.
*   **Scoring Logic**: Each correct keypress grants **50 points**. The player has a strict **5-second time limit**.
*   **Result**: Once the timer hits zero, the game uploads the player's total score to the Game Jolt API and fetches the latest leaderboard to show the player's rank.

### Implementation Guide (C# + Unity)

To recreate this, your controller needs to track the timer and score, then use a `Scores.Add` call followed immediately by a `Scores.Get` to refresh the UI.

```csharp
using UnityEngine;
using GameJolt.API;
using System.Collections.Generic;

public class TypingGameController : MonoBehaviour {
    public int score = 0;
    public float timeLeft = 5f;
    private bool isGameActive = true;

    void Update() {
        if (!isGameActive) return;

        timeLeft -= Time.deltaTime;
        if (timeLeft <= 0) {
            EndGameAndUpload();
        }

        // Logic for checking key input (simplified)
        if (Input.anyKeyDown && Input.GetKeyDown(currentLetter)) {
            AddPoint();
        }
    }

    void EndGameAndUpload() {
        isGameActive = false;
        
        // 1. Upload the Score
        Scores.Add(score, $"{score} pts", 0, "", (bool success) => {
            if (success) {
                // 2. Fetch the updated Leaderboard
                FetchTopScores();
            }
        });
    }

    void FetchTopScores() {
        Scores.Get((Score[] scores) => {
            // Update your UI with the real leaderboard data here!
            foreach(var s in scores) {
                Debug.Log($"{s.Rank}. {s.PlayerName}: {s.Text}");
            }
        }, 0, 10); // Fetch top 10
    }
}
```

### Try the Typing Challenge
Test your speed below! Hover or focus on the game area and press the letters as they appear. After 5 seconds, see how your "simulated" rank stacks up against other testers.

import ScoreGameExample from '@site/src/components/ScoreGameExample';

<ScoreGameExample />

:::tip Implementation Tip
For real-time leaderboards, it's best to call `Scores.Get` **after** the `Scores.Add` callback returns `true`. This ensures the player's new score is actually included in the data you receive.
:::

:::info Next Step
Now that you have your leaderboards setup, check out [Users & Profiles](./user-operations) to learn how to fetch user avatars and friend stats for your UI!
:::
