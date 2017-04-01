const path = require('path');

const atImport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const csso = require('postcss-csso');
const url = require('postcss-url');

const NODE_ENV = process.env.NODE_ENV;
const isDev = NODE_ENV !== 'production';

module.exports = {
    plugins: (() => {
      const result = [
          atImport({
              path: [
                  path.join(__dirname, 'app/resources/blocks/'),
                  path.join(__dirname, 'app/resources/pages/'),
              ],
          }),
          url({
              basePath: path.join(__dirname, 'app/resources/'),
              url: 'inline',
          }),
          autoprefixer({
              browsers: [
                  'last 2 versions',
              ],
          }),
      ];

      if (!isDev) {
          result.push(csso({
              debug: 3,
              restructure: true,
          }));
      }

      return result;
  })(),
};
