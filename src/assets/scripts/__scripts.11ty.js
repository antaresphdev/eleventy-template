const babel = require('@babel/core')
const path = require('path')
const fs = require('fs')

class Script {
  constructor() {
    this.inputFiles = {
      index: 'index.js'
    }
  }

  data() {
    return {
      eleventyExcludeFromCollections: true,
      entryPoints: this.inputFiles,
      pagination: {
        data: 'entryPoints',
        alias: 'bundleName',
        size: 1
      },
      permalink: ({ bundleName }) => `/assets/scripts/${bundleName}.js`,
    }
  }
  
  compile(bundleName) {
    console.log('[JS] Compiling: ', bundleName)
    const filepath = path.join(__dirname, this.inputFiles[bundleName])
    const transformedCode = babel.transformFileSync(filepath, {})

    this.renderSourceMap(bundleName, transformedCode.map)

    return `${transformedCode.code}\n//# sourceMappingURL=${bundleName}.js.map`
  }

  renderSourceMap(filename, content) {
    const filepath = path.join(__dirname, '__sourcemaps/', `${filename}.js.map`)
    fs.writeFileSync(filepath, JSON.stringify(content))
  }
  
  render({ bundleName }) {
    return this.compile(bundleName)
  }
}

module.exports = Script