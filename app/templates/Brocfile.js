var Merge = require('broccoli-merge-trees');
var Sass = require('broccoli-sass');
var Funnel = require('broccoli-funnel');
var Babel = require('broccoli-babel-transpiler');
var Concat = require('broccoli-sourcemap-concat');

var stylePaths = [
  'sass',
  'node_modules/normalize-css',
  'node_modules/font-awesome/scss',
  'node_modules/yoga-sass/assets',
];

var styles = new Sass(stylePaths, 'app.scss', 'app.css');

var vendorFiles = [
  'jquery.js',
  'underscore.js',
  'backbone.js',
  'require.js',
];

var vendorScripts = new Merge([
  'node_modules/jquery/dist',
  'node_modules/requirejs',
  'node_modules/backbone',
  'node_modules/underscore',
], {overwrite: true});

vendorScripts = new Funnel(vendorScripts, {
  files: vendorFiles,
});

vendorScripts = Concat(vendorScripts, {
  inputFiles: vendorFiles,
  outputFile: '/vendor.js',
});

var appScript = Babel('src', {
  browserPolyfill: true,
  stage: 0,
  moduleIds: true,
  modules: 'amd',
});

appScript = Concat(appScript, {
  inputFiles: [
    '**/*.js',
  ],
  outputFile: '/app.js',
});

module.exports = new Merge(['public', styles, appScript, vendorScripts]);
