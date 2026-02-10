import { sprae } from "sprae/sprae.js"
import { parse } from "sprae/core.js"
import { stringToDocument, documentToString } from "lume/core/utils/dom.ts"
import { merge } from "lume/core/utils/object.ts"
import textLoader from "lume/core/loaders/text.ts"
import { log } from "lume/core/utils/log.ts"

import type { ProxyComponents } from "lume/core/components.ts";

export interface Options {
  extensions?: string[]
  includes?: string,
  options?: {
    prefix?: string
  }
}

export interface HelperOptions {
  type: "directive" | "modifier" | "filter"
}

export type DirectiveHelper = (el: Element, state: Record<string, unknown>, expr: string) => ((value: unknown) => void | (() => void)) | { [Symbol.dispose]: () => void } | void
export type ModifierHelper = (el: Element, state: Record<string, unknown>, expr: string) => (() => unknown) | void

export const defaults: Options = {
  extensions: [".html"],
  options: {
    prefix: "::",
  }
}

export class SprinkleEngine implements Lume.Engine {
  sprae: typeof sprae
  includes: string

  constructor(engine: typeof sprae, includes: string) {
    this.sprae = engine
    this.includes = includes
  }

  async render(content: string, data: Record<string, unknown>) {
    const document = stringToDocument(content)
    if (!document) return content

    await this.sprae(document.body, data)

    // Wait for any pending dom updates to finish
    await new Promise(resolve => {
      setTimeout(resolve, 0)
    })

    return documentToString(document)
  }

  addHelper(name: string, fn: DirectiveHelper | ModifierHelper, options: HelperOptions) {
    if (options.type == "directive") {
      // @ts-expect-error sprae.directive is not typed
      this.sprae.directive[name] = fn as DirectiveHelper
    }
    else if (options.type == "modifier" || options.type == "filter") {
      // @ts-expect-error sprae.modifier is not typed
      this.sprae.modifier[name] = fn as ModifierHelper
    }
  }

  deleteCache() {} // Sprae doesn't have a cache, so this is a no-op
}

/**
 * A plugin to use Sprae as a template engine in Lume.
 * @see https://github.com/swizz/sprinke
 */
export function sprinkle(userOptions?: Options) {
  return (site: Lume.Site) => {
    const options = merge(
      { ...defaults, includes: site.options.includes },
      userOptions
    )

    // @ts-expect-error sprae.use is not typed
    sprae.use(options.options)

    // Ignore includes folder
    if (options.includes) {
      site.ignore(options.includes)
    }

    // Load the pages and register the engine
    site.loadPages([".html"], {
      loader: textLoader,
      engine: new SprinkleEngine(sprae, options.includes),
    })

    site.helper("content", (el, state) => {
      // @ts-expect-error sprae.directive is not typed
      sprae.directive.html(el, state)(() => state.content)
    }, { type: "directive" })

    site.helper("is", (el, state, expr) => {
      const data = site.source.data.get("/")

      if(!data) {
        log.fatal(`Component "${expr}" not found`)
        return
      }

      const names = expr.split(".")
      let component = data as ProxyComponents

      while (names.length) {
        try {
          component = component[names.shift()!]
        } catch {
          log.fatal(`Component "${expr}" not found`)
          return
        }
      }

      // TODO: Find a better solution in sprae core
      const scope = ((state: unknown) => {
         const scope = parse(el.getAttribute(options.options.prefix + 'scope'))(state)
         el.removeAttribute(options.options.prefix + 'scope')
         return scope
      })(state)

      if (typeof component == "function") {
        component = component(Object.assign(state, { content: el.innerHTML }, typeof scope === 'function' ? scope(state) : scope))
      }

      // @ts-expect-error sprae.directive is not typed
      Promise.resolve(component).then(sprae.directive.html(el, state))
    }, { type: "directive" })
  }
}

export default sprinkle
