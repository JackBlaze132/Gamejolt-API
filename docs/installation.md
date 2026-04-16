# 🛠️ Installation & Libraries

To start using the Game Jolt API, you first need to install the library or plugin appropriate for your game engine or programming language.

## 📚 Supported Libraries & Plugins

Members of the Game Jolt community have developed libraries for almost every major game engine and platform.

| Platform / Language | Library Link |
| :--- | :--- |
| **Unity** | [Unity API Plugin](http://gamejolt.com/games/unity-api/15887) |
| **Game Maker** | [GM Legacy API](http://gamejolt.com/games/gamemaker-game-jolt-api/8710) |
| **Game Maker: Studio** | [GMS Achievement API](http://gamejolt.com/games/gamejolt-achievement-api-for-gamemaker-studio/11689) |
| **Construct 2** | [Construct 2 API Demo](http://gamejolt.com/games/construct-2-api-demo/22058) |
| **Construct Classic** | [Construct Plugin Forum](http://gamejolt.com/community/forums/topics/construct-plugin/242/) |
| **C / C++** | [C-Library](http://gamejolt.com/games/game-jolt-api-c-library/15490) |
| **ActionScript 3** | [AS3 API](http://gamejolt.com/games/actionscript-3-api/8922) |
| **Blitz** | [BlitzMax API](http://gamejolt.com/games/gamejoltapi-blitzmax/9840) |
| **C#** | [C# API Forum](http://gamejolt.com/community/forums/topics/c-api/1285/) |
| **Clickteam Fusion 2.5 / MMF2** | [Clickteam/MMF2 API](http://gamejolt.com/games/clickteam-fusion-2-5-mmf2-gamejoltapi/27301) |
| **Haxe** | [Haxe API Forum](http://gamejolt.com/community/forums/topics/haxe-gamejolt-api/2076/) |
| **HaxeFlixel** | [HaxeFlixel Integration](http://gamejolt.com/community/forums/topics/haxe-and-haxeflixel-api-integration-updated/2604/) |
| **ImpactJS** | [ImpactJS Plugin](http://gamejolt.com/community/forums/topics/impactjs-gamejolt-api-integration-plugin/2731/) |
| **Java** | [Java API Forum](http://gamejolt.com/community/forums/topics/java-api/239/) |
| **JavaScript (Wrapper)** | [JS API Forum](http://gamejolt.com/community/forums/topics/javascript-api/5651/) |
| **JavaScript (Library)** | [JS Library](http://gamejolt.com/games/game-jolt-api-js-library/22948) |
| **libGDX** | [libGDX API (Exp)](http://gamejolt.com/community/forums/topics/game-jolt-api-for-libgdx-experimental/4704/) |
| **Love2d** | [Love2d API Forum](http://gamejolt.com/community/forums/topics/gamejolt-api-for-a-simple-love2d-game/3496) |
| **Lua** | [Lua GJ API Forum](http://gamejolt.com/community/forums/topics/lua-gamejolt-api/5955/) |
| **.Net** | [JoltNet (.Net)](http://gamejolt.com/games/joltnet-net-gamejolt-api/23244) |
| **PHP** | [PHP API Forum](http://gamejolt.com/community/forums/topics/php-api/266/) |
| **Python** | [Python Module](http://gamejolt.com/community/forums/topics/python-module-for-gjapi/1414/) |
| **RPG Maker VX Ace** | [RPG Maker VX Ace API](http://gamejolt.com/games/gamejolt-achievement-api-for-rpg-maker-vx-ace/40546) |
| **RPG Maker XP** | [RPG Maker XP API](http://gamejolt.com/games/gamejolt-achievement-api-for-rpg-maker-xp/56053) |
| **Ruby** | [Ruby API Forum](http://gamejolt.com/community/forums/topics/gamejoltapi-for-ruby/9401) |
| **Visual Basic** | [VB API Forum](http://gamejolt.com/community/forums/topics/visual-basic-game-jolt-api/2874/) |

---

## ⚙️ Generic Installation Steps

Most libraries follow this general workflow:

### 1. Download
Visit the links above and download the latest release for your platform.

### 2. Initialization
In your code, you must initialize the API using your **Game ID** and **Private Key** (found in your Game Jolt Dashboard).

```csharp
// Example for Unity
using GameJolt.API;

void Start() {
    // Usually handled by the GameJoltAPI Prefab in Unity
    // But manual init looks like this:
    bool success = GameJoltAPI.Instance.Initialize(myGameID, myPrivateKey);
}
```

### 3. Verify Connection
Always call the `Sessions.Ping` or `Users.Fetch` method to ensure your credentials are correct before proceeding to trophies or scores.

:::info Missing your platform?
If you don't see your engine here, you can always build a custom wrapper using our [URL Construction](authentication.md) guide!
:::
