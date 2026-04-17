# ▶️ Open

Opens a game session for a particular user and allows you to tell Game Jolt that a user is playing your game. You must ping the session to keep it active and you must close it when you're done with it.

## URL Endpoint
`/sessions/open/`

## Parameters

| Name | Required? | Type | Description |
| :--- | :--- | :--- | :--- |
| `game_id` | Yes | string | The ID of your game. |
| `username` | Yes | string | The user's username. |
| `user_token` | Yes | string | The user's token. |

## Returns

| Name | Type | Description |
| :--- | :--- | :--- |
| `success` | boolean | Whether the request succeeded or failed. **Example**: `true` |
| `message` | string | If the request was not successful, this contains the error message. **Example**: `Unknown fatal error occurred.` |

## Remarks
* You can only have one open session for a user at a time. If you try to open a new session while one is running, the system will close out the current one before opening the new one.

## Syntax
```text
/sessions/open/?game_id=xxxxx&username=myusername&user_token=mytoken
```

## Request Example
```http
GET https://api.gamejolt.com/api/game/v1_2/sessions/open/
    ?game_id=1
    &username=hjake
    &user_token=404432
    &signature=af8b72e5668e2175a024220b2401869e 
HTTP/1.1
Host: api.gamejolt.com
```

## Version history

| Version | Description |
| :--- | :--- |
| 1.0 | First implementation |
