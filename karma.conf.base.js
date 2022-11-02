module.exports = function generateKarmaConf(projectName) {
    return function (config) {
        config.set({
            basePath: '',
            frameworks: ['jasmine', '@angular-devkit/build-angular'],
            plugins: [
                require('karma-jasmine'),
                require('karma-coverage'),
                require('karma-chrome-launcher'),
                require('karma-jasmine-html-reporter'),
                require('karma-coverage-istanbul-reporter'),
                require('@angular-devkit/build-angular/plugins/karma'),
            ],
            client: {
                clearContext: false, // leave Jasmine Spec Runner output visible in browser
            },
            coverageIstanbulReporter: {
                dir: require('path').join(__dirname, `coverage/${projectName}`),
                reports: ['html', 'lcov', 'text-summary'],
                fixWebpackSourcePaths: true,
            },
            reporters: ['progress', 'kjhtml', 'coverage-istanbul'],
            port: 9876,
            colors: true,
            logLevel: config.LOG_INFO,
            autoWatch: false,
            browsers: ['ChromeHeadless'],
            customLaunchers: {
                ChromeHeadlessNoSandbox: {
                    base: 'ChromeHeadless',
                    flags: ['--no-sandbox'],
                },
            },
            singleRun: true,
            codeCoverage: true,
            restartOnFileChange: true,
        });
    };
};
