# 🏅 Get Rank

Returns the numerical rank for a specific score.

## URL Endpoint
`/scores/get-rank/`

## Parameters
| Name | Required? | Type | Description |
| :--- | :--- | :--- | :--- |
| `game_id` | Yes | string | The ID of your game. |
| `sort` | Yes | integer | The numerical value of the score to check the rank for. |
| `table_id` | No | integer | The ID of the table to check. |

## Returns
Returns the rank of the score (e.g., `1` for first place).

## Request Example
```http
GET https://api.gamejolt.com/api/game/v1_2/scores/get-rank/
    ?game_id=1
    &sort=500
    &table_id=123
    &signature=af8b72e5668e2175a024220b2401869e 
HTTP/1.1
Host: api.gamejolt.com
```
