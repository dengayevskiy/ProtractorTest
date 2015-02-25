exports.config = {

    SeleniumServerJar: '.node_modules/protractor/selenium/selenium-server-standalone-2.44.0.jar',

    specs: ['pages/*'],

    baseUrl: 'http://todomvc.com/examples/angularjs/#/',

    onPrepare: function () {
        browser.driver.manage().window().maximize();
    },

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        isVerbose: true,
        includeStackTrace: true
    },

    capabilities: {
        'browserName': 'chrome'
    }
};
