'use strict';

const path = require('path');

const baseDir = process.cwd();

const HOST = 'localhost';
const PORT = 8080;

const AUTOPREFIXER = {
    browsers: [
        'last 2 versions',
    ],
};

const CSSO = {
    debug: 3,
    restructure: true,
};

const POSTCSS_IMPORT = {
    path: [
        path.join(baseDir, 'app/resources/blocks/'),
        path.join(baseDir, 'app/resources/pages/'),
    ],
};

const POSTCSS_URL = {
    basePath: path.join(baseDir, 'app/resources/'),
    url: 'inline',
};

module.exports = {
    HOST,
    PORT,

    AUTOPREFIXER,
    CSSO,
    POSTCSS_IMPORT,
    POSTCSS_URL,
};
