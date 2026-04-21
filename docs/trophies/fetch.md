# 📂 Fetch Trophies

Returns one trophy or multiple trophies, depending on the parameters passed in.

## URL Endpoint
`/trophies/`

## Parameters
| Name | Required? | Type | Description |
| :--- | :--- | :--- | :--- |
| `game_id` | Yes | string | The ID of your game. |
| `username` | Yes | string | The user's username. |
| `user_token` | Yes | string | The user's token. |
| `trophy_id` | No | integer | Pass in a trophy ID to fetch a single trophy. |
| `achieved` | No | boolean | Pass in `true` to fetch only trophies the user has achieved. Pass in `false` to fetch only trophies the user has not achieved. |

## Returns
Returns a list of trophies. Each trophy contains:
*   `id`: The ID of the trophy.
*   `title`: The title of the trophy.
*   `description`: The description of the trophy.
*   `difficulty`: The difficulty of the trophy (Bronze, Silver, Gold, Platinum).
*   `image_url`: The URL of the trophy's image.
*   `achieved`: Whether the trophy has been achieved by the user.

## Request Example
```http
GET https://api.gamejolt.com/api/game/v1_2/trophies/
    ?game_id=1
    &username=hjake
    &user_token=404432
    &signature=af8b72e5668e2175a024220b2401869e 
HTTP/1.1
Host: api.gamejolt.com
```
