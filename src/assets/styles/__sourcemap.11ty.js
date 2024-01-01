const path = require('path')
const fs = require('fs')
const Stylesheets = require('./__styles.11ty')

class StylesheetSourcemap {
  constructor() {
    this.inputFiles = new Stylesheets().inputFiles
  }

  data() {
    return {
      eleventyExcludeFromCollections: true,
      entryPoints: this.inputFiles,
      pagination: {
        data: 'entryPoints',
        alias: 'cssFile',
        size: 1
      },
      permalink: ({ cssFile }) => `/assets/styles/${cssFile}.min.css.map`
    }
  }

  configure() {
    return {
      sourceMap: true,
      style: "compressed",
      alertColor: true,
    }
  }

  async compile(filename) {
    const appPath = await require('../../../scripts/utilities').getAppPath()
    const filepath = path.join(appPath, 'cache', `${filename}.min.css.map`)
    const content = fs.readFileSync(filepath, { encoding: 'utf-8' })

    return content
  }

  async render({ cssFile }) {
    console.log("[CSS] Rendering sourcemap:", this.inputFiles[cssFile])
    const result = await this.compile(cssFile)

    return result
  }
}

module.exports = StylesheetSourcemap