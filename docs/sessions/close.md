# ⏹️ Close

Closes the active session.

## URL Endpoint
`/sessions/close/`

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

## Syntax
```text
/sessions/close/?game_id=xxxxx&username=myusername&user_token=mytoken
```

## Request Example
```http
GET https://api.gamejolt.com/api/game/v1_2/sessions/close/
    ?game_id=1
    &username=hjake
    &user_token=404432
    &signature=af8b72e5668e2175a024220b2401869e 
HTTP/1.1
Host: api.gamejolt.com
```

## Errors

| Affected parameter | Description | Error message |
| :--- | :--- | :--- |
| `none` | No open session exists, [open](./open.md) a new one! | `Could not find an open session. You must open a new one.` |

## Version history

| Version | Description |
| :--- | :--- |
| 1.0 | First implementation |
