// the basis of this file was taken from
// https://github.com/Jimdo/typings-for-css-modules-loader

const { exec } = require('child_process');
const cssLoader = require('css-loader');
const cssLocalsLoader = require('css-loader/locals');

const {
  generateElmModuleForStyles,
  cssFileNameToElmFileName,
} = require('./css-module-parser');

const writeToFileIfChanged = require('./persist');

function delegateToCssLoader(ctx, input, callback) {
  ctx.async = () => callback;
  cssLoader.call(ctx, ...input);
}

module.exports = function(...input) {
  if (this.cacheable) this.cacheable();

  // mock async step 1 - css loader is async, we need to intercept this so we get async ourselves
  const callback = this.async();

  const query = this.query;

  // mock async step 2 - offer css loader a "fake" callback
  this.async = () => (err, content) => {
    if (err) {
      return callback(err);
    }
    const filename = this.resourcePath;
    const cssModuleInterfaceFilename = cssFileNameToElmFileName(filename);

    const keyRegex = /"([^\\"]+)":/g;
    let match;
    const cssModuleKeys = [];

    while ((match = keyRegex.exec(content))) {
      if (cssModuleKeys.indexOf(match[1]) < 0) {
        cssModuleKeys.push(match[1]);
      }
    }

    let cssModuleDefinition = generateElmModuleForStyles(
      cssModuleKeys,
      filename
    );

    writeToFileIfChanged(cssModuleInterfaceFilename, cssModuleDefinition);

    if (query.runElmFormat) {
      exec(`yarn elm-format ${cssModuleInterfaceFilename} --yes`, () => {});
    } else {
      delegateToCssLoader(this, input, callback);
    }
  };

  cssLocalsLoader.call(this, ...input);
};
