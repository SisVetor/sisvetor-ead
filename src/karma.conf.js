// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    files: [
      { pattern: "../node_modules/jquery/dist/jquery.min.js", included: true, watched: false, served: true },
      { pattern: "../node_modules/bootstrap/dist/js/bootstrap.min.js", included: true, watched: false, served: true },
      { pattern: "../node_modules/select2/dist/js/select2.js", included: true, watched: false, served: true },
      { pattern: "../node_modules/survey-angular/survey.css", included: true, watched: false, served: true },
      { pattern: "../node_modules/select2/dist/css/select2.css", included: true, watched: false, served: true },
      { pattern: "../node_modules/bootstrap/dist/css/bootstrap.min.css", included: true, watched: false, served: true },
    ],
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
      require("karma-coverage"),
      require("@angular-devkit/build-angular/plugins/karma")
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageReporter: {
      dir: require("path").join(__dirname, "../coverage"),
      subdir: ".",
      reporters: [
        { type: "html" },
        { type: "text-summary" },
        { type: "lcovonly" }
      ]
    },
    reporters: ["progress", "kjhtml"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["HeadlessChrome"],
    customLaunchers: {
      HeadlessChrome: {
        base: "ChromeHeadless",
        flags: [
          "--no-sandbox",
          "--headless",
          "--disable-gpu",
          "--disable-translate",
          "--disable-extensions",
          "--remote-debugging-port=9222", // Without a remote debugging port, Google Chrome exits immediately.
          "--js-flags=--max-old-space-size=4096"
        ]
      }
    },
    singleRun: false,
    restartOnFileChange: true,
    captureTimeout: 250000,
    browserDisconnectTolerance: 2,
    browserDisconnectTimeout: 100000,
    browserNoActivityTimeout: 80000,
    autoWatchBatchDelay: 80000
  });
};
