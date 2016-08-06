'use strict';

/**
 * @type {string} ENV - Mode of deployment. Available 'dev' and 'prod' values.
 * @example '$ ENV=prod gulp'
 */
const ENV = process.env.ENV || 'dev';
const isDev = ENV === 'dev';

const gulp = require('gulp');
