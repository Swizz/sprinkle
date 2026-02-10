import lume from "lume/mod.ts"
import sprinkle from "./sprinkle.ts"
import esbuild from "lume/plugins/esbuild.ts"
import inline from "lume/plugins/inline.ts"
// import minify from "lume/plugins/minify_html.ts"

const site = lume({
  dest: "./dist",
})

site.use(sprinkle())

site.use(esbuild({
  denoConfig: "./deno.json",
}))

site.use(inline())

// site.use(minify({
//   options: {
//     minify_js: true,
//   }
// }))

site.add("script.js")

export default site
