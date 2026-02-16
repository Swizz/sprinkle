import lume from "lume/mod.ts"
import sprinkle from "./sprinkle.ts"
import esbuild from "lume/plugins/esbuild.ts"
import inline from "lume/plugins/inline.ts"
import lightning from "lume/plugins/lightningcss.ts"
import purge from "lume/plugins/purgecss.ts"
import minify from "lume/plugins/minify_html.ts"

const site = lume({
  dest: "./dist",
})

site.use(sprinkle({
  options: {
    prefix: "::",
  },
}))

site.use(esbuild({
  denoConfig: "./deno.json",
}))

site.use(inline())

site.use(lightning())

site.use(purge({
  options: {
    variables: true,
  },
}))

site.use(minify({
  options: {
    minify_js: true,
  },
}))

site.data("layout", "./_layout.html")

site.add("script.js")

site.add("style.css")

export default site
