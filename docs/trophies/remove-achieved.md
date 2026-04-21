# ❌ Remove Achieved

Removes an achieved trophy for a particular user.

## URL Endpoint
`/trophies/remove-achieved/`

## Parameters
| Name | Required? | Type | Description |
| :--- | :--- | :--- | :--- |
| `game_id` | Yes | string | The ID of your game. |
| `username` | Yes | string | The user's username. |
| `user_token` | Yes | string | The user's token. |
| `trophy_id` | Yes | integer | The ID of the trophy to remove. |

## Returns
Returns `success: true` if the trophy was removed successfully.

## Request Example
```http
GET https://api.gamejolt.com/api/game/v1_2/trophies/remove-achieved/
    ?game_id=1
    &username=hjake
    &user_token=404432
    &trophy_id=123
    &signature=af8b72e5668e2175a024220b2401869e 
HTTP/1.1
Host: api.gamejolt.com
```
