/**
 * @ngdoc service
 * @name App:WindowFactory
 *
 * @description
 *
 *
 * */
angular.module('app')
    .factory('WindowFactory', function($routeSegment, $location, $window, Selection){

        var Service = {

            /**
             * Adds a window
             */
            add: function () {

                //Timeout here because we are getting a "pop" when the route changes
                setTimeout(function () {

                    $.each($routeSegment.chain, function (index) {
                        Service.stack(index, $("[app-view-segment='" + index + "']"), $routeSegment.chain.length);
                    });

                    if($routeSegment.chain.length > 1) {
                        $("[app-view-segment='" + ($routeSegment.chain.length - 1) + "']")
                            .css('opacity', 1)
                            .css('transform', 'translateX(-150px)');
                    }

                }, 10);

            },

            remove: function ($scope) {

                $.each($routeSegment.chain, function (index) {
                    Service.stack(index, $("[app-view-segment='" + index + "']"), $routeSegment.chain.length - 1);
                });

                $("[app-view-segment='" + ($routeSegment.chain.length - 1) + "']").css('opacity', 0);

                Selection.removeFromActiveList();

                //Change the route once we have hidden the window
                setTimeout(function () {

                    var close_url;

                    if($scope.close_url == undefined) {
                        close_url = '#/';
                    } else {
                        close_url = $scope.close_url;
                    }

                    $window.location.assign(close_url);
                }, 400);

            },

            /**
             * Creates the 3d "stack" effect for the windows
             * @param index
             * @param item
             * @param num_items
             */
            stack: function (index, item, num_items) {

                var amount = 30,
                    right = amount - ((amount / num_items) * (index + 1)),
                    opacity = 1 - ((right / 100) * 3),
                    z = right * 2;

                //3d effect
                item
                    .addClass('active')
                    .css('-webkit-transform', 'translateZ(-' + z + 'px) rotateY(' + z + 'deg)')
                    .css('-moz-transform', 'translateZ(-' + z + 'px) rotateY(' + z + 'deg)')
                    .css('-o-transform', 'translateZ(-' + z + 'px) rotateY(' + z + 'deg)')
                    .css('transform', 'translateZ(-' + z + 'px) rotateY(' + z + 'deg)')
                    .css('-webkit-filter', 'brightness(' + opacity + ')')
                    .css('-moz-filter', 'brightness(' + opacity + ')')
                    .css('-o-filter', 'brightness(' + opacity + ')')
                    .css('filter', 'brightness(' + opacity + ')')
                    .css('right', right + '%');

            }


        };

        return Service;
    });