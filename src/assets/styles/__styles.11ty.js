const path = require('path')
const sass = require('sass')
const fs = require('fs')

class Stylesheets {
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
      permalink: ({ cssFile }) => `/assets/styles/${cssFile}.css`
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
    return sass.compile(filepath, config)
  }

  renderSourcemap(filename, content) {
    const filepath = path.join(__dirname, '__sourcemaps/', `${filename}.min.css.map`)
    fs.writeFileSync(filepath, JSON.stringify(content))
  }

  render({ cssFile }) {
    console.log("[CSS] Rendering style:", this.inputFiles[cssFile])
    const scss = path.join(__dirname, `/${this.inputFiles[cssFile]}`)
    const result = this.compile(scss, this.configure())

    this.renderSourcemap(cssFile, result.sourceMap)
    
    return `${result.css}\n/*# sourceMappingURL=${cssFile}.min.css.map */`
  }
}

module.exports = Stylesheets