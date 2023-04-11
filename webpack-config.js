module.exports = {
   devtool: 'source-map',
   entry: "./src/main.js",
   mode: "production",
   target: 'web',
   output: {
      filename: "main.min.pack.js",
      devtoolModuleFilenameTemplate: '[resource-path]',  // removes the webpack:/// prefix
      libraryTarget: 'window'
   },
   resolve: {
      extensions: ['.js']
   }
}