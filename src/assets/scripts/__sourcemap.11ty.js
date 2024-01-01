const path = require('path')
const fs = require('fs')
const Script = require('./__scripts.11ty')
class ScriptSourceMap {
  constructor() {
    this.inputFiles = new Script().inputFiles
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
      permalink: ({ bundleName }) => `/assets/scripts/${bundleName}.js.map`,
    }
  }
  
  compile(filename) {
    console.log('[JS] Compiling sourcemap: ', filename)
    const filepath = path.join(__dirname, '__sourcemaps', `${filename}.js.map`)
    const content = fs.readFileSync(filepath, { encoding: 'utf-8' })

    return content
  }
  
  render({ bundleName }) {
    return this.compile(bundleName)
  }
}

module.exports = ScriptSourceMap