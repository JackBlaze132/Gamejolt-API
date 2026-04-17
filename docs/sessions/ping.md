# 🛜 Ping

Pings an open session to tell the system that it's still active. If the session hasn't been pinged within 120 seconds, the system will close the session and you will have to open another one. It's recommended that you ping about every 30 seconds or so to keep the system from clearing out your session.

You can also let the system know whether the player is in an active or idle state within your game.

## URL Endpoint
`/sessions/ping/`

## Parameters

| Name | Required? | Type | Description |
| :--- | :--- | :--- | :--- |
| `game_id` | Yes | string | The ID of your game. |
| `username` | Yes | string | The user's username. |
| `user_token` | Yes | string | The user's token. |
| `status` | No | string | Sets the status of the session. |

### Valid Values for `status`

| Value | Description |
| :--- | :--- |
| `active` | Sets the session to the `active` state. |
| `idle` | Sets the session to the `idle` state. |

## Returns

| Name | Type | Description |
| :--- | :--- | :--- |
| `success` | boolean | Whether the request succeeded or failed. **Example**: `true` |
| `message` | string | If the request was not successful, this contains the error message. **Example**: `Unknown fatal error occurred.` |

## Syntax
```text
/sessions/ping/?game_id=xxxxx&username=myusername&user_token=mytoken
/sessions/ping/?game_id=xxxxx&username=myusername&user_token=mytoken&status=active
```

## Request Example
```http
GET https://api.gamejolt.com/api/game/v1_2/sessions/ping/
    ?game_id=1
    &username=hjake
    &user_token=404432
    &status=active
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
