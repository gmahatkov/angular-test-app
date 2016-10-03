import angular from 'angular';
import {CLIENT_ID} from '../properties';

angular.module('angularTestApp')
    .factory('ErrorInterceptor', ['$q', '$window', function ($q, $window) {
        return {
            'responseError': function (rejection) {
                switch (rejection.status) {
                    // case -1:
                    case 400:
                    case 401:
                    case 403:
                        var redirect_uri = 'http://angular-test-app.ex:8080';
                        $window.location.href = `https://api.instagram.com/oauth/authorize/?client_id=${CLIENT_ID}&redirect_uri=${redirect_uri}&response_type=token`;
                    break;
                    default:
                        console.error(rejection);
                }
                return $q.reject(rejection);
            }};
    }])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.interceptors.push('ErrorInterceptor');
    }]);
