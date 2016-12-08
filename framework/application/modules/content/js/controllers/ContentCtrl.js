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

    .controller('ContentEditCtrl', function($scope, $rootScope, Content, $routeSegment, WindowFactory, $routeParams, $filter, $mdConstant, Loading, Selection){

        //Close the sidebar on this controller
        $rootScope.isSidebarOpen = true;

        WindowFactory.add();
        var panel = Loading.show();

        $scope.close_url = "#/page/" + $routeParams.page_id;
        $scope.languages = {};
        $scope.editorInit = false;

        //Wait until the editor has finished initializing
        if($scope.editorInit) {
            Loading.hide(panel);
        }

        //Keyword creation keys
        $scope.keys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];

        Content.getOne($routeParams.id).then(function (response) {

            //Find the content by id in the records array
            var content = $filter('filter')($rootScope.records, {
                id: parseInt($routeParams.id, 10)
            }, true);

            $scope.content = content[0];

            Selection.addToActiveList($scope.content);

            //Set the selected item color
            $scope.content.selected = true;

            $scope.content.publication_start = new Date($scope.content.publication_start);
            $scope.content.publication_end = new Date($scope.content.publication_end);

            $scope.languages = response.data.data.translations;

            //Change the name in the item list
            $scope.$watch('languages["1"].translation.name', function(v){
                $scope.content.translation.name = v;
            });

            Loading.hide(panel);

        });

        /**
         * Executed after a successful save
         * @param response
         */
        var onSave = function (response) {
            $rootScope.records = response.data.data;
        };

        $scope.save = function () {
            Content.save($scope).then(onSave);
        };

        $scope.saveAndClose = function () {
            Content.save($scope).then(onSave);
            $scope.content.selected = false;
            WindowFactory.remove($scope);
        };

    })

    .controller('ContentCreateCtrl', function($scope, $rootScope, Content, $routeSegment, WindowFactory, $routeParams, Language, $mdConstant, Loading){

        //Close the sidebar on this controller
        $rootScope.isSidebarOpen = true;

        WindowFactory.add();
        var panel = Loading.show();

        $scope.close_url = "#/page/" + $routeParams.page_id;
        $scope.languages = {};
        $scope.content = {
            enabled: true,
            important: false,
            category_id: $routeParams.page_id
        };
        $scope.editorInit = false;

        //Wait until the editor has finished initializing
        if($scope.editorInit) {
            Loading.hide(panel);
        }

        Language.getAll().then(function (response) {

            // We need to send an object to the server so that the translations save correctly,
            // so we transform the array into an object here
            angular.forEach(response.data.data.items, function(value) {
                $scope.languages[value.id] = value;
                $scope.languages[value.id].translation = {};
            });

            $scope.tinymceOptions = {
                plugins: 'link image code',
                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
            };

            Loading.hide(panel);

        });

        /**
         * Executed after a successful save
         * @param response
         */
        var onSave = function (response) {
            $rootScope.records = response.data.data;
        };

        $scope.save = function () {
            Content.save($scope).then(onSave);
        };

        $scope.saveAndClose = function () {
            Content.save($scope).then(onSave);
            WindowFactory.remove($scope);
        };

    })

    .controller('ContentConfigCtrl', function($scope, $rootScope, Content, $routeSegment, WindowFactory, $routeParams, $mdConstant, Loading){

        //Close the sidebar on this controller
        $rootScope.isSidebarOpen = true;

        WindowFactory.add();
        var panel = Loading.show();

        $scope.close_url = "#/page/" + $routeParams.page_id;
        $scope.languages = [];
        $scope.config = {};
        $scope.page = {};
        $scope.roles = [];
        $scope.list_views = [];
        $scope.detail_views = [];
        $scope.editorInit = false;

        //Keyword creation keys
        $scope.keys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];

        Content.getConfig($routeParams.widget_id).then(function (response) {
            $scope.config = response.data.data.config;
            $scope.page = response.data.data.content;
            $scope.roles = response.data.data.roles;
            $scope.languages = response.data.data.translations;
            $scope.list_views = response.data.data.list_views;
            $scope.detail_views = response.data.data.detail_views;
            Loading.hide(panel);
        });

        /**
         * Executed after a successful save
         * @param response
         */
        var onSave = function (response) {
            $rootScope.records = response.data.data;
        };

        $scope.save = function () {
            Content.setConfig($routeParams.widget_id, $scope).then(onSave);
        };

        $scope.saveAndClose = function () {
            Content.setConfig($routeParams.widget_id, $scope).then(onSave);
            WindowFactory.remove($scope);
        };

    })

;