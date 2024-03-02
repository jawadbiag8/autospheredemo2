// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apipath: `http://${window.location.hostname}:5000/`,
  // apipath: `http://192.187.98.12:8102/`,
  // apipath: `http://192.168.4.9:8102/`,
  // apipath: `http://192.168.0.106:8102/`,
  // apipath: `http://192.168.1.217:8102/`,
  sessionTimeout2: 900, // Timeout in seconds

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
