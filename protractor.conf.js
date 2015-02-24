
exports.config = {

    //SeleniumServerJar: 'C:/Users/Денис/AppData/Roaming/npm/node_modules/protractor/selenium/selenium-server-standalone-2.44.0.jar',

    seleniumAddress: 'http://localhost:4444/wd/hub',

    restartBrowserBetweenTests: false,

    specs: ['specs/*'],

    onPrepare: function() {
        browser.driver.manage().window().maximize();
    },

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        isVerbose: true,
        includeStackTrace: true
    }
};
