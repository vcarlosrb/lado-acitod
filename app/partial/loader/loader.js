angular.module('tampico').controller('LoaderCtrl', function ($scope, $state) {

    $scope.doneLoad = false;
    $scope.percentege1 = 0;
    $scope.percentege2 = 0;
    $scope.showTotal = 0;
    $scope.loader = {
        init: function () {
            this.showImage();
        },
        showImage: function () {
            var self = this;
            angular.element(document).ready(function () {
                $scope.doneLoad = true;
                setTimeout(function(){
                    self.loadImages();
                },500);
            });
        },
        loadImages: function () {
            $.html5Loader({
                filesToLoad: '/assets/source-js/files.json',
                onUpdate: function (perc) {
                    $('.pbCircle .loader').css('height',perc+'%');
                    //$('.contPercentage .number span').html(perc);
                },
                stopExecution: true,
                onComplete: function () {
                    $('.pbCircle .loader').css('height','100%');
                    //$('.contPercentage .number span').html(100);
                    $state.go('app.home');
                }
            });
        }
    };
    $scope.loader.init();

});

