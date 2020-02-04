// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var host = window.location.host
var serverIp = "https://localhost:3010";
var angularIp = "https://"+host;

export const environment = {
    angularIp : "https://"+ host +"/pages/auth/login-2",
    production: false,
    hmr: false,
    urlPort: serverIp,
    regUrl: angularIp,
    imageUrl: serverIp + "/img/project",
    profileImageUrl: serverIp + "/getProfileImage/",
    foundation: "ComgoMarketUI",
    createdBy: "kuldeep",
    defaultImage: "this.src=" + serverIp + "/img/project/DefaultImage/default.jpg'",
    forgetPasswordUrl: angularIp + "/pages/auth/forgot-password-3",
    viewWorkSpaceUrl: angularIp + "/pages/auth/your-workspace"
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
