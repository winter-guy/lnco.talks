/**
 * This file can be replaced during build by using the `fileReplacements` array.
 * `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
 * The list of file replacements can be found in `angular.json`.
 * */

import config from '@lib/services/auth/config.json';

// eslint-disable-next-line prettier/prettier
const { domain, clientId, authorizationParams: { audience }, apiUri, errorPath } = config as {
    domain: string;
    clientId: string;
    authorizationParams: {
        audience: string;
    };
    apiUri: string;
    errorPath: string;
};

export const environment = {
    production: true,
    apiUri: apiUri, // need to disable as http intercepter get to be in place.
    auth: {
        domain,
        clientId,
        audience,
        redirectUri: window.location.origin,
        errorPath,
    },
    httpInterceptor: {
        allowedList: [`${apiUri}/*`],
    },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
