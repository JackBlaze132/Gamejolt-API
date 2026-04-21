# 📥 Fetch Scores

Fetches scores from a score table. Returns one score or multiple scores, depending on the parameters passed in.

## URL Endpoint
`/scores/`

## Parameters
| Name | Required? | Type | Description |
| :--- | :--- | :--- | :--- |
| `game_id` | Yes | string | The ID of your game. |
| `table_id` | No | integer | Pass in a table ID to fetch scores for that table. If not passed, the primary table is used. |
| `limit` | No | integer | The number of scores to return. The maximum is 100. Default is 10. |
| `username` | No | string | Fetch scores for a specific user. Use this to find a user's personal best. |
| `user_token` | No | string | The user's token (required if fetching specific user scores). |
| `guest` | No | string | Fetch scores for a specific guest user. |
| `better_than` | No | integer | Fetch scores that are better than a specific score. |
| `worse_than` | No | integer | Fetch scores that are worse than a specific score. |

## Returns
Returns a list of scores. Each score contains:
*   `score`: The textual string representation of the score.
*   `sort`: The numerical value of the score (used for sorting).
*   `extra_data`: Any extra data associated with the score.
*   `user`: The username or guest name.
*   `user_id`: The ID of the user (if a logged-in user).
*   `guest`: The name of the guest (if a guest user).
*   `stored`: When the score was achieved.

## Request Example
```http
GET https://api.gamejolt.com/api/game/v1_2/scores/
    ?game_id=1
    &table_id=123
    &limit=10
    &signature=af8b72e5668e2175a024220b2401869e 
HTTP/1.1
Host: api.gamejolt.com
```
