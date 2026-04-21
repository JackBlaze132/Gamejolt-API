# 📋 Score Tables

Returns a list of all score tables for the game.

## URL Endpoint
`/scores/tables/`

## Parameters
| Name | Required? | Type | Description |
| :--- | :--- | :--- | :--- |
| `game_id` | Yes | string | The ID of your game. |

## Returns
Returns a list of tables. Each table contains:
*   `id`: The ID of the table.
*   `name`: The name of the table.
*   `description`: The description of the table.
*   `primary`: Whether the table is the primary table.

## Request Example
```http
GET https://api.gamejolt.com/api/game/v1_2/scores/tables/
    ?game_id=1
    &signature=af8b72e5668e2175a024220b2401869e 
HTTP/1.1
Host: api.gamejolt.com
```
