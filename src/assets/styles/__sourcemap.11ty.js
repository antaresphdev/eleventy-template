const path = require('path')
const sass = require('sass')

class StylesheetSourcemap {
  constructor() {
    this.inputFiles = {
      styles: 'styles.scss'
    }
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

  compile(filepath, config) {
    console.log("[CSS Configuration:", config)
    return sass.compile(filepath, config)
  }

  render({ cssFile }) {
    console.log("[CSS] Rendering style: ", this.inputFiles[cssFile])
    const scss = path.join(__dirname, `/${this.inputFiles[cssFile]}`)
    const css = this.compile(scss, this.configure())
    return JSON.stringify(css.sourceMap)
  }
}

module.exports = StylesheetSourcemap