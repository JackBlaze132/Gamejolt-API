---
id: url-structure
slug: /core/url-structure
title: 🔗 URL Structure
sidebar_position: 5
---

# 🔗 URL Structure

This page explains how to construct URLs for making requests to the Game Jolt API.

## Basic URL Construction

The base URL for the Game Jolt API is:

```
https://api.gamejolt.com/api/game/
```

Next, specify the API version. The current version is `v1_2`:

```
https://api.gamejolt.com/api/game/v1_2/
```

After the version, add the endpoint you want to access. For example, to access the data store:

```
https://api.gamejolt.com/api/game/v1_2/data-store/
```

## Adding Query Parameters

Variables required for each request are passed as query parameters (GET) or in the POST body. All variables except the `signature` must be URL encoded.

Example:

```
https://api.gamejolt.com/api/game/v1_2/data-store/?game_id=32&key=test&signature=912ec803b2ce49e4a541068d495ab570
```

## Signature Parameter

Every request must include a `signature` parameter to verify authenticity. To generate the signature:

1. Form the full URL (excluding the signature).
2. Append your game's private key to the end of the URL string.
3. Hash the resulting string using MD5 or SHA-1.
4. Add the resulting hash as the `signature` parameter.

Example for the trophies endpoint:

```
https://api.gamejolt.com/api/game/v1_2/trophies/?game_id=32&username=CROS&user_token=123456&achieved=true
```

Append the private key:

```
https://api.gamejolt.com/api/game/v1_2/trophies/?game_id=32&username=CROS&user_token=123456&achieved=truemy_awesome_private_key
```

Hash this string and use the result as the signature:

```
https://api.gamejolt.com/api/game/v1_2/trophies/?game_id=32&username=CROS&user_token=123456&achieved=true&signature=fc3e8e0ea54544b3551058f0cf524303
```

## Using POST Data

You can also send variables in the POST body. The signature is generated differently:

1. Take the GET part of the URL (without POST data).
2. Concatenate POST key/value pairs in ascending alphabetical order by key, with no spaces.
3. Append the private key.
4. Hash the resulting string.

Example POST data:

```
achieved=true
user_token=123456
```

Concatenate as:

```
achievedtrueuser_token123456
```

Append to the URL and private key:

```
https://api.gamejolt.com/api/game/v1_2/trophies/?game_id=32&username=CROSachievedtrueuser_token123456my_awesome_private_key
```

Hash and use as the signature in the request URL.

## Arrays in POST Data

For array fields, concatenate the key name with each value in order. For example:

```
requests: [ 'abc', 'def', 'ghi' ]
```

Becomes:

```
requestsabcrequestsdefrequestsghi
```

Append to the URL and private key, hash, and use as the signature.

---

For more details, see the [official documentation](https://gamejolt.com/game-api/doc/construction).