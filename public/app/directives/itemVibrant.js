import angular from 'angular';


angular.module('angularTestApp')
    .directive('vibrant', [function () {
        return {
            scope:{
              url:'='
            },
            templateUrl:"app/views/vibrant.html",
            link: function ($scope, element, attrs) {

            },
            restrict: 'E',
        }
    }]);
