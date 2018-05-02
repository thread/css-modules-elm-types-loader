const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'test.js'),
  output: {
    path: __dirname,
    filename: 'test-bundle.js',
  },
  module: {
    rules: [
      {
        test: /styles-no-elm-format\.css$/,
        loader: path.resolve(__dirname, '..', 'src', 'index.js'),
        options: {
          modules: true,
        },
      },
    ],
  },
};
