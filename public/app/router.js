import angular from 'angular';


angular.module('angularTestApp')
    .config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.when('', '/');
        $stateProvider
            .state('items-list', {
                url: '/',
                controller: 'ItemsListController',
                templateUrl: 'app/views/items-list.html',
                resolve: {
                    data: ['apiService', function (apiService) {
                        return apiService.myRecent().$promise;
                    }]
                }
            })
            .state('item-detail', {
                url: '/item/:media_id',
                controller: 'ItemController',
                templateUrl: 'app/views/item.html',
                resolve: {
                    item: ['$stateParams', 'apiService', function ($stateParams, apiService) {
                        return apiService.item({media_id: $stateParams.media_id}).$promise;
                    }]
                }
            });
        $urlRouterProvider.otherwise('/404');
    }]);