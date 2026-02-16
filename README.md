# [Sprinkle](https://github.com/swizz/sprinkle)([Lume](https://lume.land/) + [Spræ](https://dy.github.io/sprae)) [![deno.land/x/sprinkle](https://shield.deno.dev/x/sprinkle)](https://deno.land/x/sprinkle)

Full featured Spræ engine for Lume.

## Usage

```sh
deno task lume --config=https://deno.land/x/sprinkle/config.ts
```

| Included plugins |                                                            |
| ---------------- | ---------------------------------------------------------- |
| Sprinkle         | Full featured Spræ engine for Lume.                        |
| ESbuild          | Bundle JavaScript, TypeStript files using esbuild library. |
| Inline           | Inline CSS, JavaScript, SVG and images in the HTML.        |
| Lightning CSS    | Transform and minify your CSS files with Lightning CSS.    |
| Purge CSS        | Use PuregeCSS to remove unused CSS code.                   |
| Minify HTML      | Minify the HTML code of your pages.                        |

_see [config.ts](./config.ts) to read through the default configurations used._

### From configuration

```js
/** ./_config.ts **/
import site from "https://deno.land/x/sprinkle/config.ts"

site.add("main.js")

site.add("main.css")
```

### As plugin

```js
/** ./_config.ts **/

import site from "https://deno.land/x/sprinkle/sprinkle.ts"

site.use(sprinkle({
  options: {
    prefix: "::",
  },
}))
```

## Layout

```html
<!-- ./_layout.html --->

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body ::content></body>
</html>
```

## Components

```html
<!-- ./_components/article.html --->
<article ::content></article>

<footer>Article written by <span ::text="author"></span></footer>
```

```html
<!-- ./blog.html --->

<template ::scope="{ author: 'me' }" ::is="article">
  <p>My awesome blog content.</p>
</template>
```

---

More documentation available at [Lume documentation](./LUME.md).
