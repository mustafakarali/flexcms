/**
 * @ngdoc controller
 * @name App:CropController
 *
 * @description
 *
 *
 * @requires $scope
 * */
angular.module('app')
    .controller('CropController', function ($scope, $mdDialog, $filter, config, file) {
        const vm = this;

        // We create a copy to work with, in case the user cancels the dialog
        vm.model = config;
        vm.file = file;
        vm.status = '';

        const configCopy = angular.copy(config);
        const fileCopy = angular.copy(file);

        // FIXME: until https://github.com/CrackerakiUA/ui-cropper/issues/22 is resolved
        const previewImage = document.getElementById('preview');
        vm.width = 0;
        vm.height = 0;

        // Get the width and height from the first image configuration (should be the biggest one)
        vm.width = vm.model.configs[0].width;
        vm.height = vm.model.configs[0].height;

        if (vm.model.areaCoords) {
            vm.initialSize = {
                w: vm.model.areaCoords.w,
                h: vm.model.areaCoords.h,
            };
            vm.initialCoords = {
                x: vm.model.areaCoords.x,
                y: vm.model.areaCoords.y,
            };
        }

        vm.closeDialog = () => {
            angular.copy(configCopy, vm.model);
            angular.copy(fileCopy, vm.file);
            $mdDialog.hide();
        };

        $scope.$watch('vm.model.cropObject', (coords) => {
            const ratio = coords.cropImageHeight / coords.cropImageWidth;

            // Check if the cropped image will be pixelated
            if (coords.cropImageWidth < vm.width || coords.cropImageHeight < vm.height) {
                vm.status = '<span class="crop-status md-warn-text"><i class="material-icons">warning</i> PIXELADO</span>';
            } else {
                vm.status = '<span class="crop-status md-success-text"><i class="material-icons">check</i> OK</span>';
            }

            // FIXME: until https://github.com/CrackerakiUA/ui-cropper/issues/22 is resolved
            // Image is higher, or square
            if (previewImage) {
                if (coords.cropImageHeight >= coords.cropImageWidth) {
                    vm.width = previewImage.width / ratio;
                    vm.height = previewImage.height;
                } else { // Image is wider
                    vm.height = previewImage.height * ratio;
                    vm.width = previewImage.width;
                }
            }
        });

        $scope.$watch('vm.file.name', (name) => {
            // Change the file name
            vm.file.file_name = $filter('slugify')(name);
        });

        // Generate the CSS color from the array
        vm.generateRGB = (colorArray) => {
            if (typeof colorArray === 'undefined' || colorArray.length < 3) {
                return '';
            }
            return `rgb(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]})`;
        };

        vm.save = () => {
            $mdDialog.hide();
        };
    });
