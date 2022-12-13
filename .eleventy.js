module.exports = function (config) {
  return {
    dir: {
      input: 'src',
      output: 'public',
      includes: 'templates/components',
      layouts: 'templates/layouts',
      data: 'data'
    },
    templateFormats: ['njk', 'md', '11ty.js', 'html']
  }
}