import angular from 'angular';
import 'angular-resource';
import 'angular-ui-router';
import {CLIENT_ID} from './properties';

angular.module('angularTestApp', ['ui.router','ngResource'])
    .run(['$location', '$window', function($location, $window){
        var access_token;
        if (/access_token/.test($window.location.href)) {
            access_token = $window.location.href.match(/access_token=([^$&]+)/)[1];
            if (access_token) {
                $window.localStorage.setItem('access_token', access_token);
                // $window.location.href = '/';
            }
        }
        //read access token from localStorage; if(no access_token) redirect to auth api
        if (!access_token && !$window.localStorage.getItem('access_token')) {
            var redirect_uri = 'http://angular-test-app.ex:8080';
            $window.location.href = `https://api.instagram.com/oauth/authorize/?client_id=${CLIENT_ID}&redirect_uri=${redirect_uri}&response_type=token`;
        }
        //read access token from location
    }]);

require('./interceptors/ErrorInterceptor');
require('./controllers/ItemsListController');
require('./controllers/ItemController');
require('./services/apiService');
require('./directives/itemVibrant');
require('./router');