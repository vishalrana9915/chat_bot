# using webpack with babel.
npx webpack --config webpack.config.js

The above command is used to trigger the webpack.

The --config we use so that we can specify any file, if there are multiple files.


@returns sample code for webpack.

-----------------------------------------------
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
----------------------------------------------------