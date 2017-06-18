angular.module('tampico').controller('HomeCtrl', function ($scope, $sce) {

    $scope.nro = 0;

    $scope.validiOS = {
        iOS: function(){
            $scope.valIOS = /iPad|iPhone|iPod/.test(navigator.platform);
        }
    };
    $scope.validiOS.iOS();

    $scope.dimensions = {
        setHeight: function () {
            var height = $(window).height();
            $('.baColumn .bacUnit').css('height', height + 'px');
            $(window).resize(function () {
                var height = $(window).height();
                $('.baColumn .bacUnit').css('height', height + 'px');
            });
        }
    };
    $scope.dimensions.setHeight();

    $scope.introVideo = {
        closeIntro: function () {
            var self = this;
            var width = $(window).width();
            if (width <= 800) {
                $('.contPanel').css('right', '-100%');
            } else {
                $('.contPanel').css('right', '-300px');
            }
            $(window).resize(function () {
                var width = $(window).width();
                if (width <= 800) {
                    $('.contPanel').css('right', '-100%');
                } else {
                    $('.contPanel').css('right', '-300px');
                }
            });
            $('.bvIntro').fadeOut(200);
            $('.btnPanel').fadeOut(200);
            //if (!$scope.iOS.validIOS()) {
            //    setTimeout(function () {
            //        self.skipIntro();
            //    }, 3000);
            //}
        },
        skipIntro: function () {
            $('.bvSteps').fadeOut(200);
            $scope.videos.playVideos(1);
        }
    };

    $scope.video1 = {
        config: {
            sources: [
                {
                    src: $sce.trustAsResourceUrl("/assets/videos/video1.m4v"),
                    //src: $sce.trustAsResourceUrl("http://tampico.mediabytelab.com/assets/videos/video1.mp4"),
                    type: "video/mp4"
                }
            ],
            plugins: {
                poster: "/assets/images/poster.jpg"
            }
        },
        playerReady: function (api) {
            $scope.video1.API = api;
            $scope.videos.playVideos(1);
        },
        seeked: function (currentTime, duration) {
            console.log(currentTime, '/', duration, "seeked video1")
        },
        seeking: function (currentTime, duration) {
            console.log(currentTime, '/', duration, "seeking video1")
        }
    };

    $scope.video2 = {
        config: {
            sources: [
                {
                    src: $sce.trustAsResourceUrl("/assets/videos/video2.m4v"),
                    //src: $sce.trustAsResourceUrl("http://tampico.mediabytelab.com/assets/videos/video2.mp4"),
                    type: "video/mp4"
                }
            ]
        },
        playerReady: function (api) {
            $scope.video2.API = api;
            $scope.videos.playVideos(1);
        }
    };

    $scope.videos = {
        video: 1,
        changeVideo: function () {
            var self = this;
            if (self.video == 1) {
                $('.bvfVideo1').fadeOut(150);
                $scope.video1.API.setVolume(0);
                $scope.video2.API.setVolume(1);
                self.video = 2;
            }
            else {
                $scope.video1.API.play();
                $('.bvfVideo1').fadeIn(150);
                $scope.video1.API.setVolume(1);
                $scope.video2.API.setVolume(2);
                self.video = 1;
                self.video = 1;
            }
        },
        playVideos: function (nro) {
            $scope.nro = $scope.nro + nro;
            if ($scope.nro == 3) {
                $scope.video1.API.play();
                $scope.video2.API.play();
                $scope.video1.API.setVolume(1);
                $scope.video2.API.setVolume(0);
            }
        },
        completeVideo: function () {
            $('.btnPanel').fadeIn(200);
        }
    };

});
