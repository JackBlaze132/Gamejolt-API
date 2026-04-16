# User Operations

User operations allow your game to interact with the Game Jolt profile of the person currently playing. This is essential for features like friends lists and personalized gameplay.

## 👤 Fetching User Profiles

You can get basic information about a user (like their avatar, profile description, and friends) using their **Username** or **User ID**.

### 🔍 Profile Data

This contains:
*   **User ID**: The unique numeric ID for each user.
*   **Username**: The handle chosen by the user.
*   **Avatar URL**: Link to their profile picture.
*   **User Type**: Whether the user is a standard member, moderator, or administrator.

![User Profile Dashboard](https://via.placeholder.com/800x400.png?text=Game+Jolt+User+Profile+Screenshot)
*Image: How user profiles and avatars are displayed on Game Jolt.*

### 🚀 Implementation (Unity SDK)

In the Unity SDK, fetching user data is straightforward:

```csharp
using GameJolt.API;

public void GetUserInfo(string username) {
    Users.Get(username, (User user) => {
        if (user != null) {
            Debug.Log("User: " + user.Name);
            Debug.Log("Status: " + user.Status);
        } else {
            Debug.Log("User not found.");
        }
    });
}
```

---

## 🤝 Friends List

You can fetch a list of friends for any logged-in user. This is great for showing leaderboards among friends or adding social features.

```csharp
using GameJolt.API;

public void GetFriends() {
    Friends.Get((User[] friends) => {
        if (friends != null) {
            foreach (var friend in friends) {
                Debug.Log("Found friend: " + friend.Name);
            }
        }
    });
}
```

:::tip Implementation Tip
You must define the **Friends** namespace in your project setup or SDK configuration before fetching the list.
:::

---

## 🛰️ Essential Namespaces Overview

As your game grows, you'll need more than just user profiles. Here's a breakdown of the key namespaces:

| Namespace | Symbol | Description |
| :--- | :--- | :--- |
| **Users** | 👤 | Fetch user info and authentication. |
| **Sessions** | 📡 | Track user session (active/ping). |
| **Trophies** | 🏆 | The Achievements system. |
| **Scores** | 📜 | Leaderboards and score management. |
| **Friends** | 🤝 | Listing and interacting with friends. |
| **Data-Store** | 📦 | Cloud-based data storage for save games. |
| **Batch** | ⚡ | Group multiple API requests into one call. |

![API Namespaces Overview](https://via.placeholder.com/800x400.png?text=Game+Jolt+API+Namespaces+Visualization)
*Image: Diagram of how namespaces communicate with the Game Jolt backend.*

:::info What's Next?
Learn how to store game progress in the [Cloud Data Storage](./data-storage) guide!
:::
