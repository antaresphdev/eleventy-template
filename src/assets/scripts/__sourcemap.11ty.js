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
  
  async compile(filename) {
    console.log('[JS] Compiling sourcemap: ', filename)
    const appPath = await require('../../../scripts/utilities').getAppPath()
    const filepath = path.join(appPath, 'cache', `${filename}.js.map`)
    const content = fs.readFileSync(filepath, { encoding: 'utf-8' })

    return content
  }
  
  async render({ bundleName }) {
    return await this.compile(bundleName)
  }
}

module.exports = ScriptSourceMap