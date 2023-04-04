module.exports = {
   devtool: 'source-map',
   entry: "./src/main.js",
   mode: "development",
   target: 'web',
   output: {
      filename: "main.pack.js",
      devtoolModuleFilenameTemplate: '[resource-path]',  // removes the webpack:/// prefix
      libraryTarget: 'window'
   },
   resolve: {
      extensions: ['.js']
   }
}