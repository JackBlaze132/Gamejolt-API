---
id: data-formats
slug: /core/data-formats
title: "🗂️ Data Formats"
sidebar_position: 6
---

# 🗂️ Data Formats

The Game Jolt API can return data in multiple formats. You can specify the desired format by adding the `format` parameter to your request URL (e.g., `?format=json`). If not specified, the default is `json`.

Supported formats:
- **json**: JSON object
- **keypair**: Key-value pairs
- **dump**: Simple line-based output
- **xml**: XML document

## Example Usage

```
https://api.gamejolt.com/api/game/v1_2/?format=json
```

## Format Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="json" label="JSON">

```json
{
  "response": {
    "success": "true",
    "trophies": [
      {
        "id": "3",
        "title": "Cookie Magnet",
        "description": "Eat 10 points worth of cookies."
      },
      {
        "id": "4",
        "title": "I like this job!",
        "description": "Eat 20 points worth of cookies."
      }
    ]
  }
}
```

  </TabItem>
  <TabItem value="keypair" label="Keypair">

```
success:"true"
id:"3"
title:"Cookie Magnet"
description:"Eat 10 points worth of cookies."
difficulty:"Bronze"
image_url:"https://i.gjcdn.net/imgserver/game-trophy/75/1958_1.jpg"
achieved:"1 month ago"
id:"4"
title:"I like this job!"
description:"Eat 20 points worth of \"cookies\"."
difficulty:"Bronze"
image_url:"https://i.gjcdn.net/imgserver/game-trophy/75/1958_1.jpg"
achieved:"false"
```

  </TabItem>
  <TabItem value="dump" label="Dump">

```text
SUCCESS
First data item
Second data item
Third data item
...
```

  </TabItem>
  <TabItem value="xml" label="XML">

```xml
<?xml version="1.0" encoding="UTF-8"?>
<response>
  <success>
    <![CDATA[true]]>
  </success>
  <trophies>
    <trophy>
      <id>3</id>
      <title><![CDATA[Cookie Magnet]]></title>
      <description><![CDATA[Eat 10 points worth of cookies.]]></description>
    </trophy>
    <trophy>
      <id>4</id>
      <title><![CDATA[I like this job!]]></title>
      <description><![CDATA[Eat 20 points worth of cookies.]]></description>
    </trophy>
  </trophies>
</response>
```

  </TabItem>
</Tabs>

---

For more details, see the [official documentation](https://gamejolt.com/game-api/doc/formats) and the subpages for each format: [JSON](https://gamejolt.com/game-api/doc/formats/json), [Keypair](https://gamejolt.com/game-api/doc/formats/keypair), [Dump](https://gamejolt.com/game-api/doc/formats/dump), [XML](https://gamejolt.com/game-api/doc/formats/xml).