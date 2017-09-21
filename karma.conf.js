const path = require('path');
module.exports = function(config) {
  config.set({
    basePath: '',
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'sinon', 'chai'],
    files: [
    'node_modules/babel-polyfill/dist/polyfill.js',
    'js/test/*.js'
    ],
    preprocessors: {
      'js/pages/app.js': ['webpack'],
      'js/test/**/*.js': ['webpack']
  },
  webpack: {
      module: {
        loaders: [
        {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: path.resolve(__dirname, 'node_modules'),
            query: {
              presets: ['react', 'es2015', 'stage-1']
          }
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
    },
    ]
},
externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
}
},
reporters: ['mocha', 'coverage'],

    mochaReporter: {
        output: 'autoWatch',
        colors: {
            success: 'yellow',
            info: 'bgGreen',
            warning: 'cyan',
            error: 'bgRed'
        }
    },

    coverageReporter: {
        reporters: [
            { type: 'lcov', dir: 'coverage/', subdir: '.' },
            { type: 'json', dir: 'coverage/', subdir: '.' },
            { type: 'text-summary' }
        ]
    },
webpackServer: {
  noInfo: true
},

port: 9876,
colors: true,
logLevel: config.LOG_INFO,
autoWatch: true,
singleRun: false,
});
};