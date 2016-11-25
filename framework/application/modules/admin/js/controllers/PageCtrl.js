/**
 * @ngdoc controller
 * @name App:LanguageCtrl
 *
 * @description
 *
 *
 * @requires $scope
 * */
angular.module('app')
    .controller('PageCtrl', function($scope, $rootScope, Page, $routeSegment, WindowFactory, $routeParams, Content, $window){

        //Open the sidebar on this controller
        $rootScope.isSidebarOpen = true;

        //Base url
        $scope.section = "page/" + $routeParams.page_id + "/content";
        $scope.title = "";
        $scope.menu = [];
        $scope.dragable = false;
        $scope.selected = {};
        $scope.query = "";
        $scope.deleteSelection = [];

        $scope.onSortEnd = function () {
            Content.setOrder($rootScope.records, $routeParams.page_id);
        };

        $scope.onItemClick = function (id) {
            $window.location.assign('#/' + $scope.section + '/edit/' + id);
        };

        // toggle selection for a given item by id
        $scope.toggleDeleteSelection = function(id) {
            var idx = $scope.deleteSelection.indexOf(id);

            // is currently selected
            if (idx > -1) {
                $scope.deleteSelection.splice(idx, 1);
            }

            // is newly selected
            else {
                $scope.deleteSelection.push(id);
            }
        };

        WindowFactory.add();

        //Load the content
        Page.getOne($routeParams.page_id, $scope).then(function (response) {

            $rootScope.records = response.data.items;
            $scope.title = response.data.title;
            $scope.menu = response.data.menu;

        });

    })

;