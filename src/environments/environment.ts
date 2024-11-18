// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    //https://stackoverflow.com/questions/34907682/how-to-display-app-version-in-angular2
    VERSION: require("../../package.json").version,
    //https://stackoverflow.com/questions/43136109/angular2-how-to-switch-baseurl-between-prodmode-and-test-mode
    defaultUrl: "http://localhost:9995",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
