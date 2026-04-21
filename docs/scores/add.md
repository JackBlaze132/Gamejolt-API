# ✅ Add Score

Adds a score to the specified score table.

## URL Endpoint
`/scores/add/`

## Parameters
| Name | Required? | Type | Description |
| :--- | :--- | :--- | :--- |
| `game_id` | Yes | string | The ID of your game. |
| `score` | Yes | string | The textual representation of the score (e.g., "100 Points"). |
| `sort` | Yes | integer | The numerical value for sorting/filtering. |
| `username` | No | string | The username of the user (if a logged-in user). |
| `user_token` | No | string | The user's token (required if passing `username`). |
| `guest` | No | string | The guest's name (required if NOT passing `username`). |
| `table_id` | No | integer | The ID of the table to add the score to. |
| `extra_data` | No | string | Extra data associated with the score (e.g., stats or ghost data). |

## Returns
Returns `success: true` if the score was successfully added.

## Request Example
```http
GET https://api.gamejolt.com/api/game/v1_2/scores/add/
    ?game_id=1
    &score=100+Points
    &sort=100
    &username=hjake
    &user_token=404432
    &extra_data=some+ghost+data
    &signature=af8b72e5668e2175a024220b2401869e 
HTTP/1.1
Host: api.gamejolt.com
```
