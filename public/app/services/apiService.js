import angular from 'angular';

angular.module('angularTestApp')
    .service('apiService', ['$resource', '$window', function ($resource, $window) {
        const ACCESS_TOKEN = $window.localStorage.getItem('access_token');
        return $resource('',
            {},
            {
                myRecent: {
                    method: 'jsonp',
                    url: 'https://api.instagram.com/v1/users/self/media/recent/',
                    params: {
                        callback: 'JSON_CALLBACK',
                        access_token:ACCESS_TOKEN
                    }
                },
                item: {
                    method: 'jsonp',
                    url: 'https://api.instagram.com/v1/media/:media_id',
                    params: {
                        callback: 'JSON_CALLBACK',
                        access_token:ACCESS_TOKEN
                    }
                }
            }
        );
}]);
