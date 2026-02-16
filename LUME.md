---
title: Sprinkle
description: UFull featured Spræ engine for Lume.
mod: swizz/spinrkle/sprinkle.ts
enabled: true
tags:
  - template_engine
---

| Options    |            |                                  |                         |        |
| ---------- | ---------- | -------------------------------- | ----------------------- | ------ |
| extensions | `string[]` | File extension to load.          | `['.html']`             |        |
| options    | `object`   | The options for the Spræ engine. |                         |        |
|            | prefix     | `string`                         | The Spræ prefix to use. | `"::"` |

## Description

[Spræ](https://dy.github.io/Spræ) is a microhydration language created by Dy
(Dmitry Iv) and inspired by Alpine.js. This plugin allows you to use it to
create pages and layouts.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import sprinkle from "sprinkle/sprinkle.ts";

const site = lume();

site.use(sprinkle(/* Options */));

export default site;
```

## Creating layouts

Add a file with `.html` extension in the `_includes` directory. Use the _front
matter_ to set data to the template.

```html
--- title: Welcome to my page intro: This is my first post using Lume. I hope
you like it! ---

<html>
  <head>
    <title ::text="title"></title>
  </head>

  <body>
    <p ::text="intro"></p>
  </body>
</html>
```

## content directive

The Sprinkle plugin also registers the `content` directive, to render any page
content inside a layout template and output it as HTML. For example:

```html
<body ::content></body>
```

## Creating pages

Creating pages is the same as creating layouts; just place the `.html` file
outside the `_includes` directory.

## Components

[Lume's components](../docs/core/components.md) are accessible through the
directive `is`.

```html
<template ::is="button"></template>
```

### other directives

The `has` directive is an alias to `is`, it exists only to preseve semantic:

```html
<div ::has="button"></div>
```

For additional properties components can be scoped using the `scope` directive:

```html
<template ::scope="{ type: 'submit' }" ::is="button"></template>
```

Composition is supported using the `content` directive:

```html
<button ::type="type" ::content></button>
```

```html
<template ::scope="{ type: 'submit' }" ::is="button">
  <strong>Click here</strong>
</template>
```

## Use Spræ

You can read the [Spræ documentation](https://dy.github.io/Spræ).
