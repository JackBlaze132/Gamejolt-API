# 📝Overview

Game Jolt supports multiple online score tables, or scoreboards, per game. You are able to, for example, have a score table for each level in your game, or a table for different scoring metrics.

## Features
*   **Multiple Tables**: Create different boards for levels, modes, or metrics.
*   **Flexible Formatting**: Sorting and display options to suit your game.
*   **Extra Data**: Include metadata like time, coins, or ghost data with each score.

## API Endpoints
*   [Fetch](./fetch.md) - Fetches scores with various attributes.
*   [Tables](./tables.md) - Fetches a list of score tables.
*   [Add](./add.md) - Adds a score to a table.
*   [Get Rank](./get-rank.md) - Gets the rank of a specific score.

## Remarks
*   Extra data you include is not shown anywhere on the site, but can be retrieved via the API.
*   Scores are always sorted from highest to lowest by default unless configured otherwise in the dashboard.

## Version history
| Version | Description |
| :--- | :--- |
| 1.2 | Implemented the `get-rank` request and added `better_than`/`worse_than` to `fetch`. |
| 1.0 | First implementation |
