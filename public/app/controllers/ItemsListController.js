import angular from 'angular';

angular.module('angularTestApp')
    .controller('ItemsListController', ['$scope', 'data', function ($scope, data) {
        $scope.items = data.data;
    }]);