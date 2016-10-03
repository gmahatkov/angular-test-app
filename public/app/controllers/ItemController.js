import angular from 'angular';

angular.module('angularTestApp').controller('ItemController', ['$scope', 'item', function ($scope, item) {
    $scope.item = item;
    console.log(item);
}]);
