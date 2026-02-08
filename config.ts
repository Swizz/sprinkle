import lume from "lume/mod.ts"
import vento from "lume/plugins/vento.ts"
import inline from "lume/plugins/inline.ts"
import esbuild from "lume/plugins/esbuild.ts"
import minify from "lume/plugins/minify_html.ts"

const site = lume({
  dest: "./dist",
})

site.use(vento({
  extensions: [".html"],
  options: {},
}))

site.use(esbuild({
  denoConfig: "./deno.json",
}))

site.use(inline())

site.use(minify({
  options: {
    minify_js: true,
  }
}))

export default site
