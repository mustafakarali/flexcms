(function() {
    'use strict';

    angular
        .module('app')
        .controller('MainController', MainController);

    MainController.$inject = ['$scope', '$rootScope', 'Page', '$routeSegment', 'CMS'];

    function MainController($scope, $rootScope, Page, $routeSegment, CMS) {

        CMS.init();
        $rootScope.isSidebarOpen = true;

        $scope.$routeSegment = $routeSegment;
        $scope.pages = Page.get({ id: 'null' }, function (response) {
            $scope.pages = response.data;
        });

        $scope.openPanel = function () {
            $rootScope.isSidebarOpen = true;
        };

        $scope.closePanel = function () {
            $rootScope.isSidebarOpen = false;
        };

    }
}());