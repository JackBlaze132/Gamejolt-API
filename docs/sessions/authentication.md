---
sidebar_label: "🔑 Authentication"
---

# API Authentication

To use the Game Jolt Game API, you need to authenticate your game and the user currently playing it. This ensures that only your game can modify data and that achievements are awarded to the correct person.

## 🗝️ Game Credentials

Every game must provide two key identifiers, which can be found in your **Game Jolt Dashboard** under **Game API > Settings**.

### 1. Game ID
Your **Game ID** is a unique numeric identifier for your game. It is used in every single API call to tell Game Jolt which game is communicating.

### 2. Private Key
Your **Private Key** is a secret string that should **never be shared**. It is used to generate a "Request Signature" for every API call, verifying that the request is authentic.

:::warning Security Tip
**DO NOT** commit your Private Key directly to public source code. If using Unity, consider storing it in a separate, ignored configuration file or using environmental variables during the build process.
:::

![Dashboard Credentials Section](https://via.placeholder.com/800x400.png?text=Game+Jolt+Dashboard+Credentials+Screenshot)
*Image: Locate your Game ID and Private Key in the Game Jolt Dashboard.*

## 👤 User Credentials

When a player is logged in, you need their credentials to perform user-specific actions (like unlocking a trophy or checking a score).

### Username
The player's unique Game Jolt handle (e.g., `Gamer123`).

### User Token
This is **NOT** the user's password. It is a separate token found in the user's profile or provided by the Game Jolt Client that allows your game to act on their behalf.

---

## 🔐 How Request Signatures Work

Behind the scenes, the API uses a "signature" to prevent tampering. This is formed by:
1. Taking the full request URL.
2. Appending your **Private Key**.
3. Creating an **MD5** or **SHA-1** hash of the resulting string.

Most SDKs (like the Unity SDK) handle this for you automatically!

---

## 🔗 URL Construction

If you are building a custom library, you need to follow our strict URL construction rules:

1.  **Base URL**: All requests start with `https://api.gamejolt.com/api/game/v1/`.
2.  **Parameters**: Add your `game_id`, `username`, and `user_token`.
3.  **Signature**: Every request **must** be signed with your **Private Key** (see above).

:::info Next Step
Now that you know how to authenticate, let's look at how to manage [User Operations](./user-operations) like checking friends and profile data.
:::
