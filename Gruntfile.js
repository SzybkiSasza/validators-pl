'use strict';

var assets = {
  gruntfile: 'Gruntfile.js',
  lib: 'lib/**/*.js',
  tests: 'test/**/*.js'
};

module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: assets.gruntfile
      },
      lib: {
        src: assets.lib
      },
      test: {
        src: assets.tests
      }
    },
    jscs: {
      gruntfile: {
        src: assets.gruntfile
      },
      lib: {
        src: assets.lib
      },
      test: {
        src: assets.tests
      },
      options: {
        config: '.jscsrc'
      }
    },
    mochaTest: {
      src: assets.tests,
      options: {
        reporter: 'spec'
      }
    },
    mocha_istanbul: { //jscs:ignore
      coverage: {
        src: assets.tests
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['jshint', 'jscs', 'mocha_istanbul:coverage']);
};
